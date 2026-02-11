/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"
import { baseUrl } from '@/utils/constants'
import { Comment } from '@/utils/types'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

const DeleteComment = ({comment}:{comment:Comment}) => {
    const router = useRouter();
    const deleteComment = async() => {
        const acceptToDelete = confirm("Are you sure");
        if(!acceptToDelete) {
            return ;

        }
        try {
            const response = await axios.delete(`${baseUrl}/api/comment/${comment.id}`)
            if(response.status) {
                router.refresh();
                return toast.success(response.data.message);
            }
        } catch (error:any) {
            const message = error.respone.data.message || error.message ;
            return toast.error(message)
        }

    }
    
  return (
    <button onClick={()=>deleteComment()} className=' p-2.5 bg-red-600 capitalize text-white rounded-lg cursor-pointer' >
        delete 
    </button>
  )
}

export default DeleteComment
