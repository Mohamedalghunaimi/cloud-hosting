import prisma from "@/utils/db";
import { internalServerErrorResponse } from "@/utils/response";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest) {
    const searchText = request.nextUrl.searchParams.get('searchText')
    try {
    let articles;
    if(!searchText) {
        articles = await prisma.post.findMany({
            take:5
        });
    } else {
        articles =await prisma.post.findMany({
            where:{
                title:{
                    mode:"insensitive",
                    startsWith:searchText
                }
            }
        });
    }

    return NextResponse.json(articles,{status:200})
    } catch (error) {
        console.log(error)
        return internalServerErrorResponse();
    }




}