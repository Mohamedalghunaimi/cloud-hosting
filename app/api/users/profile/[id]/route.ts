import prisma from "@/utils/db";
import { internalServerErrorResponse } from "@/utils/response";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { errorType, payload } from "@/utils/types";
import { cookies } from "next/headers";
import { getCookie, verifyToken } from "@/utils/generateToken";
import { UpdateProfile } from "@/utils/dtos";
import { updateSchema } from "@/utils/validationSchema";
import bcrypt from "bcryptjs"
import { verify } from "crypto";
import { boolean } from "zod";
interface props {
    params:Promise<{id:string}>
}
const userSelection = {
    email:true,
    username:true,
    createdAt:true,
    id:true
}

export async function DELETE(request:NextRequest,{params}:props) {


    try {
        const {id} = await params ;
        const verifyFlage = (await verifyToken()) as errorType  ;
        if(!verifyFlage.success) {
            return NextResponse.json({message:verifyFlage.message},{status:verifyFlage.status})

        }
        const user = await prisma.user.findUnique({where:{id}});
        if(!user) {
            return NextResponse.json({message:"user is not exist"},{status:404});
        }
        await prisma.user.delete({where:{id}});
        return NextResponse.json({message:"profile is deleted successfully"},{status:200});
    } catch (error) {
        console.error(error);
        return internalServerErrorResponse()
    }

}


export async function GET(request:NextRequest,{params}:props) {

    try {
        const {id} = await params ;
        const verifyFlage = (await verifyToken()) as errorType  ;
        if(!verifyFlage.success) {
            return NextResponse.json({message:verifyFlage.message},{status:verifyFlage.status})
        }
        const user = await prisma.user.findUnique({
            where:{id},
            select:userSelection
        });
        if(!user) {
            return NextResponse.json({message:"user is not exist"},{status:404});
        }
        return NextResponse.json(user,{status:200})
        
    } catch (error) {
        console.error(error);
        return internalServerErrorResponse()
    }

}

export async function PUT(request:NextRequest,{params}:props) {

    try {
        const {id} = await params ;
        const verifyFlage = (await verifyToken()) as errorType  ;
        if(!verifyFlage.success) {
            return NextResponse.json({message:verifyFlage.message},{status:verifyFlage.status})
        }
        const user = await prisma.user.findUnique({where:{id}});
        if(!user) {
            return NextResponse.json({message:"user is not exist"},{status:404});
        }
        const body = await request.json() as UpdateProfile
        const validation = updateSchema.safeParse(body);
        if(!validation.success) {
            return NextResponse.json({message:"invalid inputs"},{status:400});
        }
        if(body.password) {
            const slat = await bcrypt.genSalt(10);
            body.password = await bcrypt.hash(body.password,slat);
        }
        const updatedUser = await prisma.user.update(
            {
                where:{id},
                data:{
                    ...body,
                },
                select:userSelection
            }
        )
        return NextResponse.json(updatedUser,{status:200});
    } catch (error) {
        console.error(error);
        return internalServerErrorResponse()
    }

}



    /*
    const token = request.headers.get("token") as string  ;
    if(!token) {
        return NextResponse.json({message:"token must be provided"},{status:401});
    }
        
    
   const cookieStore = await cookies() ;
   const tokenWithValue = cookieStore.get("token") ;
    if(!tokenWithValue) {
        return NextResponse.json({message:"token must be provided"},{status:401});
    }
    const token = tokenWithValue.value as string ;*/