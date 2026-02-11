/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { baseUrl } from '@/utils/constants';
import { Article } from '@/utils/types';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
interface props {
    article:Article 
}

const EditArtice = ({article}:props) => {
    const router = useRouter();
    const [title,setTitle] = useState(article.title);
    const [body,setBody] = useState(article.body)
    const updateArticle = async(e:React.SubmitEvent) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${baseUrl}/api/articles/${article.id}`,{title,body})
            if(response.status===200) {
                router.refresh();
                return toast.success(response.data?.message);

            }
        } catch (error:any) {
            const message = error.response.data.message || error.message ;
            return toast.error(message)
        }

    }


  return (
    <form onSubmit={updateArticle} className=' flex flex-col gap-4 bg-purple-200 p-5 w-[80%] rounded'>
        <h1 className=' capitalize text-2xl text-slate-700 font-semibold'>Edit article</h1>
        <div>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} type='text' placeholder='Enter your title' className={ `  bg-white p-2.5 rounded-lg outline-none w-full`}/>
        </div>
        <div>
            <textarea value={body} onChange={(e)=>setBody(e.target.value)} placeholder='Enter your description'  className={`  bg-white resize-none h-75 p-2.5 rounded-lg outline-none w-full`} />

        </div>
        <button type='submit' className=' bg-green-700 capitalize font-semibold py-2.5 rounded-xl hover:bg-blue-900 cursor-pointer text-white'>
            Edit
        </button>
        
    </form>
  )
}

export default EditArtice
