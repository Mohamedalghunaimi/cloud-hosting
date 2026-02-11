import { deleteCookie } from "@/utils/generateToken";
import { internalServerErrorResponse } from "@/utils/response";
import { NextRequest, NextResponse } from "next/server";




export async function GET(request:NextRequest) {
    try {
        await deleteCookie();
        return NextResponse.json({
            message:"logout sucessfully ! "
        }, { status:200})
    } catch (error) {
        console.log(error)
        return internalServerErrorResponse()
    }
}