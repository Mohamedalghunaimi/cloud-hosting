import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { verifyForPages } from "./utils/generateToken";

export async function middleware(request:NextRequest) {
    const token = request.cookies.get("token")?.value;
    if(!token) {
        if(request.nextUrl.pathname.startsWith("/api/users/profile/")) {
            return NextResponse.json({message:"unAuthorized"},{status:403});
        }
        
        const adminRoute = request.nextUrl.pathname.startsWith('/admin') 
        if(adminRoute) {
            return NextResponse.redirect(new URL("/",request.url))
        }
    } else {
        const checkPathToLoginOrRegister = request.nextUrl.pathname.startsWith('/login') 
        || request.nextUrl.pathname.startsWith('/register') ;
        if(checkPathToLoginOrRegister) {
            return NextResponse.redirect(new URL("/",request.url))
        }
        

    }




}

export const config = {
    matcher: [
        '/api/users/profile/:path*', 
        '/admin/:path*', 
        '/login', 
        '/register'
    ],}