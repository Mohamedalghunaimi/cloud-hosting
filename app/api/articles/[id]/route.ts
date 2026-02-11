import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { internalServerErrorResponse } from "@/utils/response";
import { updateArticleDto } from "@/utils/dtos";
import { verifyToken } from "@/utils/generateToken";
import { updateArticleSchema } from "@/utils/validationSchema";

interface GetSingleArticle {
    params: Promise<{id:string}>
}


export async function GET(request:NextRequest,{params}:GetSingleArticle) {

    try {
        const {id} = await params; 
        const singleArticle = await prisma.post.findUnique({
            where:{id},
            include:{
                comments:{
                    orderBy:{
                        createdAt:"desc"
                    },
                    include:{
                        user:{
                            select:{
                                username:true,
                                id:true
                            }
                        }
                    }
                }
            }
        })   
        if(!singleArticle) {
            return NextResponse.json({message:"post is not found"},{status:404});
        }
        return NextResponse.json(singleArticle,{status:200});
    } catch (error) {
        console.log(error)
        internalServerErrorResponse();
        
    }
    
}
export async function PUT(request:NextRequest,{params}:GetSingleArticle) {
    const verifyFlage = await verifyToken();
    if(!verifyFlage.success) {
        return NextResponse.json({message:verifyFlage.message},{status:verifyFlage.status})
    }

    try {
        const {id} = await params; 
        const singleArticle = await prisma.post.findUnique({
            where:{id}
        })   
        if(!singleArticle) {
            return NextResponse.json({message:"post is not found"},{status:404});
        }
        if(!(verifyFlage.user?.isAdmin) ) {
            return NextResponse.json({message:"forbbiden"},{status:403});

        }
        const result = (await request.json()) as updateArticleDto;
        const validation = updateArticleSchema.safeParse(result);
        if(!validation.success) {
            return NextResponse.json({message:"invalid inputs"},{status:400});
        }

        await prisma.post.update({
            where:{id},
            data:{
                ...result

            }
        })
        return NextResponse.json({message:"article is updated successfully"},{status:200});

    } catch (error) {
        console.error(error)
        return internalServerErrorResponse();
    }

}


export async function DELETE(request:NextRequest,{params}:GetSingleArticle) {
    const verifyFlage = await verifyToken();
    if(!verifyFlage.success) {
        return NextResponse.json({message:verifyFlage.message},{status:verifyFlage.status})
    }
    try {
        const {id} = await params; 
        const singleArticle = await prisma.post.findUnique({
            where:{id}
        })   
        if(!singleArticle) {
            return NextResponse.json({message:"post is not found"},{status:404});
        }
        if(verifyFlage.user?.id!==singleArticle.userId || !(verifyFlage.user?.isAdmin) ) {
            return NextResponse.json({message:"forbbiden"},{status:403});

        }
        await prisma.post.delete({
            where:{id}
        })
        return NextResponse.json({message:"post is deleted successfully"},{status:200})
    } catch (error) {
        console.error(error);
        internalServerErrorResponse();
    }
}