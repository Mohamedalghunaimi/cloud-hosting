/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { baseUrl } from '@/utils/constants';
import { Comment } from '@/utils/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { ImCancelCircle } from "react-icons/im";
import { Interface } from 'readline';
interface props {
    setShowUpdate:React.Dispatch<React.SetStateAction<boolean>>,
    comment:Comment,

}

const UpdateComment = ({setShowUpdate,comment}:props) => {
    const [newComment,setNewComment] = useState(comment.content);
    const router = useRouter();
    const updateComment = async(e:React.SubmitEvent) => {
        e.preventDefault()
        try {
            if(!newComment.trim()) {
                return toast.error("comment is empty")
            }
            const response = await axios.put(`${baseUrl}/api/comment/${comment.id}`,{
                content:newComment
            })
            if(response.status===200) {
                toast.success(response.data?.message)
                setShowUpdate(false)
                router.refresh();
            }
        } catch (error:any) {
            const message = error.response.data.message || error.message ;
            return toast.error(message) 
            
        }
    }


  return (
    <div className=' fixed top-0 left-0 w-full h-full semi-black  flex justify-center items-center'>
        <form onSubmit={updateComment} className=' w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] p-6 rounded-lg bg-white flex flex-col gap-5'>
            <div className=' text-right w-full flex justify-end'>
                <ImCancelCircle onClick={()=>setShowUpdate(false)} className=' text-2xl text-red-700 cursor-pointer'   />
            </div>
            <input value={newComment} onChange={(e)=>setNewComment(e.target.value)} type={"text"} placeholder='Enter the new comment text' className=' p-2.5 rounded-xl  border border-gray-300' />
            <button  type='submit' className=' text-white bg-green-600 py-2.5 rounded-xl cursor-pointer'>
                Edit
            </button>
        </form>
    </div>
  )
}

export default UpdateComment