import { NextRequest, NextResponse } from "next/server";
import { createArticleSchema } from "../../../utils/validationSchema";
import { createArticleDto } from "@/utils/dtos";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/generateToken";
import { internalServerErrorResponse } from "@/utils/response";




// get all articles for all users
export async function GET(request:NextRequest) {
    const page = request.nextUrl.searchParams.get("page")  || "1";
    const articlesPerPage = request.nextUrl.searchParams.get("articles") || "5";
    const skip = (+page -1) * +articlesPerPage;
    const articles = await prisma.post.findMany({
        skip,
        take:+articlesPerPage, 
        include:{
            comments:{
                include :{
                    user:{
                        select:{
                            username:true,
                            id:true
                        }
                    }
                },

            }
        },
        orderBy:{
            createdAt:"asc"

        }
   
    });
    return NextResponse.json(articles,{status:200})



}
// for only admin
export async function POST(request:NextRequest) {
    const verifyFlage = await verifyToken()
    if(!verifyFlage.success) {
        return NextResponse.json({message:verifyFlage.message},{status:verifyFlage.status})
    }
    const body = await request.json() as createArticleDto ;
    const validation = createArticleSchema.safeParse(body);
    if(!validation.success) {
        return NextResponse.json({message:"invalid inputs"},{status:400})
    }
    if(!verifyFlage.user?.isAdmin) {
        return NextResponse.json({message:"forbdedin"},{status:403})
    }

    try {
        const newPost = await prisma.post.create({
            data:{
                userId:verifyFlage.user?.id,
                ...body
            },
            include:{
                user:{
                    select:{
                        username:true,
                        id:true
                    }
                },
            }
        })
        return NextResponse.json({message:"title is created"},{status:201});
    } catch (error) {
        console.error(error)
        return internalServerErrorResponse()
    }
}