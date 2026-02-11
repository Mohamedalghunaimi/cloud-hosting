'use client'
import { createComment } from '@/app/apiCalls/comment'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
const CommentInput = ({postId}:{postId:string}) => {
    const [comment,setComment] = useState('')
    const router = useRouter()
    const createCommentToPost = async()=> {
            if(!comment.trim()) {
                return toast.error('comment is empty')

            }
            const resposne = await createComment({postId,content:comment})
            if(resposne?.status===201) {
                toast.success('comment iscreated')
                setComment("")
                router.refresh()
            }
        

    }
    
    return (
    <div className=' flex gap-2.5 flex-wrap '>
        <input 
        type='text' 
        placeholder='Add a comment' 
        className=' p-2.5 border border-gray-300 outline-none bg-white rounded-lg flex-1'
        value={comment}
        onChange={(e)=>setComment(e.target.value)}
        onKeyDown={(e)=> {
            if(e.key==='Enter') {
                createCommentToPost()
            }

        }}
        />
        <button onClick={()=> {
            createCommentToPost()
        }}  type='submit' className=' text-white bg-green-500 p-2.5 capitalize font-semibold cursor-pointer rounded-lg'>
            comment
        </button>
    </div>
    )
}

export default CommentInput
