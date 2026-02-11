/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { errorType, payload } from "./types";
import jwt from 'jsonwebtoken'
import { verify } from "crypto";
import { error } from "console";


export function generateToken(jwtPayload:payload):string {
    const jwtSecret = process.env.JWT_SECRET as string ;
    const token = jwt.sign(jwtPayload,jwtSecret,{
        expiresIn:"30d"
    }) as string
    return token
}

export async function setCookie(jwtPayload:payload) {
    const token = generateToken(jwtPayload);
    const cookieStore = await cookies();
    try {
        cookieStore.set("token",token,{
            httpOnly:true,
            sameSite:"strict",
            maxAge:1000*60*60*7,
            secure:process.env.NODE_ENV === "production",
            path:"/"
        })    
    } catch (error) {
        console.log(error)
    }

}

export async function getCookie() : Promise<string | null> {

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value ;
        return token || null ;

    } catch (error) {
        return null;
    }
}
export async function deleteCookie() {
    const cookieStore = await cookies();
    cookieStore.delete("token");
}


export async function verifyToken():Promise<errorType> {
    const token = await getCookie();
    if(!token) {
        return {
            success:false,
            message:"unauthorized",
            status:401
        }
    }
    try {
        const jwtSecret = process.env.JWT_SECRET as string;
        const jwtPayload = jwt.verify(token as string,jwtSecret) as payload;
        
        return {
            success:true,
            user:jwtPayload
        }
    } catch (error:any) {
        throw new Error(error.message)
    }

}

export async function verifyForPages(token:string):Promise<payload|null> {
  
    try {
        const jwtSecret = process.env.JWT_SECRET as string;
        const jwtPayload = jwt.verify(token,jwtSecret) as payload;
        
        return jwtPayload;
    } catch (error:any) {
        return null
    }

}

