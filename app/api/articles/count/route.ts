import prisma from "@/utils/db";
import { internalServerErrorResponse } from "@/utils/response";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    try {
        const count = await prisma.post.count();
        return NextResponse.json(count,{status:200})
    } catch (error) {
        console.error(error);
        return internalServerErrorResponse()
    }
}