import prisma from "@/utils/db";
import { createCommentDto } from "@/utils/dtos";
import { verifyToken,  } from "@/utils/generateToken";
import { internalServerErrorResponse } from "@/utils/response";
import { commentSchema, updateCommentSchema } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";
interface props {
    params:Promise<{id:string}>
}

export async function POST(request:NextRequest) {
    const body = (await request.json()) as createCommentDto ;
    const {content,postId} = body ;
    const validation = commentSchema.safeParse(body);
    if(!validation.success) {
        return NextResponse.json({message:"invalid inputs"},{status:400})
    }
    const verifyFlage = await verifyToken();
    if(!verifyFlage.success) {
        return NextResponse.json({message:verifyFlage.message},{status:verifyFlage.status});
    }

    try {
        const post = await prisma.post.findUnique(
            {where:{id:postId}}
        );
        if(!post) {
            return NextResponse.json({message:"post is not exist"},{status:404})
        }
        const newComment = await prisma.comment.create({
            data:{
                userId:verifyFlage.user?.id as string,
                content,
                postId
            },
            include :{
                user:{
                    select:{
                        username:true,
                        isAdmin:true,
                        id:true
                    }
                },
                post:true
                
            }
        })
        return NextResponse.json(newComment,{status:201})
    } catch (error) {
        console.error(error)
        return internalServerErrorResponse();
    }
}
// to admin only
export async function GET() {
    const verifyFlage = await verifyToken();
    if(!verifyFlage.success) {
        return NextResponse.json({message:verifyFlage.message},{status:verifyFlage.status});
    }
    try {
        if(!verifyFlage.user?.isAdmin) {
            return NextResponse.json({message:"forbidden "},{status:403});
        }
        const comments = await prisma.comment.findMany({
            include:{
                user:{
                    select:{
                        username:true,
                        id:true
                    }
                },
                post:true
            }
        })
        return NextResponse.json(comments,{status:200});
    } catch (error) {
        console.error(error)
        return internalServerErrorResponse()
    }
}


