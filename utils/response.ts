import { NextResponse } from "next/server"


export const internalServerErrorResponse = ():NextResponse => {
    return NextResponse.json({message:"internal server error"},{status:500})
}

