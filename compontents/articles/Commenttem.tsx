/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from 'react'
import { GrUpdate } from 'react-icons/gr'
import { MdDelete } from 'react-icons/md'
import UpdateComment from "@/compontents/articles/UpdateComment"
import { Comment, payload } from '@/utils/types'
import axios from 'axios'
import { baseUrl } from '@/utils/constants'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const CommentItem = ({comment,user}:{comment:Comment,user:payload | null}) => {
    console.log({user,user2:comment.user})
    const [showUodate,setShowUpdate] = useState(false);
    const router = useRouter();
    const deleteComment = async() => {
        try {
            const acceptToDelete = confirm('are you okay to delete comment')
            if(acceptToDelete) {
                const response = await axios.delete(`${baseUrl}/api/comment/${comment.id}`);
                if(response.status===200) {
                    router.refresh();
                    return toast.success(response.data?.message);
                }
            }
        } catch (error:any) {
            const message = error.response.data.message || error.message ;
            return toast.error(message)
        }

    }
    return (
    <>
        {showUodate && <UpdateComment setShowUpdate={setShowUpdate} comment={comment} />}
        <div  className=' border border-gray-300  flex justify-between p-2.5 '>
            <div>
                <h1>{comment.user.username}</h1>
                <h2>{comment.content}</h2>
            </div>
            <div className=' flex items-center flex-col justify-center'>
                <h1>{(new Date(comment.createdAt)).toDateString()}</h1>
                { (user!==null && user.id===comment.user.id) ?
                <div className=' flex gap-2.5 items-center'>
                    <GrUpdate className=' cursor-pointer' onClick={()=>setShowUpdate(true)} />
                    <MdDelete onClick={()=>deleteComment()}  className=' text-red-500 text-2xl cursor-pointer'/>
                </div>:<></>}
            </div>
        </div>
    </>
    )
}

export default CommentItem