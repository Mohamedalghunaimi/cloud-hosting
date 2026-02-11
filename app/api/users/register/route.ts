
import prisma from "@/utils/db";
import { CreateUserDto } from "@/utils/dtos";
import { createUserSchema } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { payload } from "@/utils/types";
import {  setCookie } from "@/utils/generateToken";

export async function POST(request:NextRequest) {
    const body = (await request.json()) as CreateUserDto;
    const {email,password,username} = body
    if(!email ||!password|| !username) {
        return NextResponse.json({message:"missing details"},{status:400});
    }
    try {
        
        const validation = createUserSchema.safeParse(body);
        console.log(validation)
        if(!validation.success) {
            return NextResponse.json({message:"invalid unputs"},{status:400})
        }
        const existUser = await prisma.user.findUnique({where:{email}});
        if(existUser) {
            return NextResponse.json({message:"user is already exists"},{status:400})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = await prisma.user.create({
            data:{
                email,
                username,
                password:hashedPassword
            },
            select:{
                password:false,
                id:true,
                username:true,
                isAdmin:true
                
            }
        })
        const jwtPayload :payload = {
            id:newUser.id,
            username:newUser.username,
            isAdmin:newUser.isAdmin
        }

        await setCookie(jwtPayload)


        return NextResponse.json({
            
            message:"please go to login ",
        },{status:201})

    } catch (error) {
        console.log(error)
    }

}