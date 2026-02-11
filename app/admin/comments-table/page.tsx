/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import DeleteButton from '@/compontents/articles/DeleteButton';
import DeleteComment from '@/compontents/comment/DeleteComment';
import { baseUrl } from '@/utils/constants';
import { protectAdminPage } from '@/utils/protectAdminPages'
import { Comment } from '@/utils/types';
import axios from 'axios';
import { error } from 'console';
import { Meera_Inimai } from 'next/font/google';
import { cookies } from 'next/headers';
import React from 'react'
import toast from 'react-hot-toast';
const gettAllComments = async()=> {
  try {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();
  const response = await axios.get(`${baseUrl}/api/comment`,{
    headers:{
      Cookie:allCookies
    },
    withCredentials:true
  })
  if(response.status===200) {
    return response.data
  }
  } catch (error:any) {  
    console.log(error)
    throw new Error(error.message)

  }

}
  
const page = async() => {
  await protectAdminPage();

/*
  const response = await fetch(`${baseUrl}/api/comment`,{
    headers:{
      Cookie:allCookies
    },
    cache:"no-store"
    
  })
  if(!response.ok) {
    throw new Error("error in fetch comments")
  }
    */
  let comments:Comment[] =  await gettAllComments();
  console.log(comments);



  return comments.length? (
    <div className=' fix-height-2 w-full p-5'>
      <h1>comments</h1>
      <table className=' w-full'>
        <thead className=' font-bold capitalize text-2xl'>
          <tr>
            <td className=' p-2.5'>comment</td>
            <td className=' p-2.5'>created at</td>
            <td className=' p-2.5'>actions</td>
          </tr>
        </thead>
        <tbody>
          {
            comments.map((comment,index)=>(
              <tr key={index+1}>
                <td className=' p-2.5'>
                  {comment.content}
                </td>
                <td  className=' p-2.5'>{new Date(comment.createdAt).toDateString()}</td>
                <td  className=' p-2.5'>
                  <DeleteComment comment={comment} />
                </td>
              </tr>
            ))
          }
        </tbody>

      </table>

    </div>
  ):<div className='  fix-height-2 w-full p-5'>
    <h1>there is no coments</h1>
  </div>
}

export default page