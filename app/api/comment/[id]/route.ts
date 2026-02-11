import prisma from "@/utils/db";
import { verifyToken } from "@/utils/generateToken";
import { internalServerErrorResponse } from "@/utils/response";
import { updateCommentSchema } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";
interface props {
    params:Promise<{id:string}>
}
export async function PUT(request:NextRequest,{params}:props) {
    const {id} = await params;
    const body = await request.json();
    const {content} = body ;
    const validation = updateCommentSchema.safeParse(body);
    if(!validation.success) {
        return NextResponse.json({message:"invalid inputs"},{status:400});

    }
    const verifyFlage = await verifyToken();
    if(!verifyFlage.success) {
        return NextResponse.json({message:verifyFlage.message},{status:verifyFlage.status});
    }
    try {
        const comment = await prisma.comment.findUnique({
            where:{
                id
            }
        });
        if(!comment) {
            return NextResponse.json({message:"comment not exist"},{status:404});
        }
        if(comment.userId!==verifyFlage.user?.id) {
            return NextResponse.json({message:"forbidden "},{status:403});

        }
        await prisma.comment.update({
            where:{id:comment.id},
            data:{content},
            include:{
                user:{
                    select:{
                        username:true,
                        id:true,
                        isAdmin:true
                    }
                }
            }
        })
        return NextResponse.json({message:"comment is updated successfully"},{status:200});
    } catch (error) {
        console.error(error)
        return internalServerErrorResponse()
    }
    

}

export async function DELETE(request:NextRequest,{params}:props) {
    const {id} = await params;

    try {
    const verifyFlage = await verifyToken();
    if(!verifyFlage.success) {
        return NextResponse.json({message:verifyFlage.message},{status:verifyFlage.status});
    }
    const comment = await prisma.comment.findUnique({ where:{id}});
    if(!comment) {
        return NextResponse.json({message:"comment not exist"},{status:404});
    }
    if(comment.userId!==verifyFlage.user?.id && !(verifyFlage.user?.isAdmin)) {
        return NextResponse.json({message:"forbidden "},{status:403});
    }
    await prisma.comment.delete({where:{id}});

    return NextResponse.json({message:"comment is deleted successfully"},{status:200});

        
    } catch (error) {

        console.error(error)
        return internalServerErrorResponse()
    }
}