/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { baseUrl } from '@/utils/constants'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

const DeleteButton = ({articleId}:{articleId:string}) => {
    const router = useRouter();

    const deleteArticle = async() => {
        const checkBeforeDelete = confirm("are you sure");
        if(!checkBeforeDelete) {
            return ;
        }
        try {
            const response = await axios.delete(`${baseUrl}/api/articles/${articleId}`)
            if(response.status===200) {
                router.refresh();
                return toast.success(response.data.message)
            }
        } catch (error:any) {
            const message = error.response.data.message || error.message ;
            return toast.error(message);
        }

    }
  return (
    <button onClick={()=>deleteArticle()} className=' p-2.5 bg-red-600 rounded-lg text-white'>
        delete
    </button>
  )
}

export default DeleteButton
