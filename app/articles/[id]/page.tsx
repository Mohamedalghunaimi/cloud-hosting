/* eslint-disable @typescript-eslint/no-explicit-any */

import { Article, payload } from '@/utils/types';
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";

import React from 'react'
import CommentInput from '@/compontents/articles/CommentInput';
import CommentItem from "@/compontents/articles/Commenttem"
import { cookies } from 'next/headers';
import { verifyForPages } from '@/utils/generateToken';
import { getSingleArtice } from '@/app/apiCalls/Atricle';
interface Props {
    params: Promise<{id: string}>;
    searchParams: Promise<any>;
}

const SinglePageItem = async ({params, searchParams}:Props) => {
    const {id} = await params;

    const article:Article = await getSingleArtice(id);
    const token = (await cookies()).get("token")?.value;
    const user = await verifyForPages(token as string)
  return (
    <>

    <div className='fix-height-2 mb-2.5 bg-slate-100 flex justify-center  items-center'>
        <div className=' w-[80%] lg:w-[50%] gap-2.5 flex-col flex'>
        <div className=' bg-white p-5 rounded-xl flex flex-col gap-2.5  '>
            <h1>{article.title}</h1>
            <p>{(new Date(article.createdAt).toDateString())}</p>
            <p>{article.body}</p>
        </div>
        {token?<CommentInput postId={id} />:"please login and write a comment"}
        <h1>comments</h1>
        {
            article.comments.map((comment,index)=>(
                <CommentItem key={index} comment={comment} user={user} />
            ))
        }
        </div>

    </div>
    </>
  )
}

export default SinglePageItem