import prisma from "@/utils/db";
import { loginDto } from "@/utils/dtos";
import { internalServerErrorResponse } from "@/utils/response";
import { loginSchema } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { payload } from "@/utils/types";
import {  setCookie } from "@/utils/generateToken";

export async function POST(request:NextRequest) {
    try {
        const body = (await request.json()) as loginDto;
        const {email, password} = body ;
        const validation = loginSchema.safeParse(body);
        if(!validation.success) {
            return NextResponse.json({message:'invalid inputs'},{status:400})
        }
        const user = await prisma.user.findUnique({where:{email}});
        if(!user) {
            return NextResponse.json({message:'invalid inputs'},{status:400})
        }
        const passwordIsMatch = await  bcrypt.compare(password,user.password)
        if(!passwordIsMatch) {
            return NextResponse.json({message:'invalid inputs'},{status:400})
        }
        const jwtPayload:payload = {
            id:user.id,
            isAdmin:user.isAdmin,
            username:user.username
        }
        await setCookie(jwtPayload)





        return NextResponse.json({message:'auth'},{status:200})


    } catch (error) {
        console.error(error)
        internalServerErrorResponse()
    }

}