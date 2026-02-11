/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { baseUrl } from '@/utils/constants';
import axios from 'axios';
import React, {  useState } from 'react'
import toast from 'react-hot-toast';

const AddArticles = () => {
  const [title,setTitle] = useState("");
  const [body,setBody] = useState("")
  const [titleRequired,setTitleRequired] = useState(false);
  const [bodyRequired,setBodyRequired] = useState(false);

  const createAtricle = async(e:React.SubmitEvent) => {
    
    e.preventDefault();
    if(!body.trim()&& !title.trim()) {
      setBodyRequired(true);
      setTitleRequired(true);
      return toast.error("missing details")
    } else if(!body.trim()) {
      setBodyRequired(true);
      setTitleRequired(false)
      return toast.error("description is required")

    } else if(!title.trim()) {
      setTitleRequired(true)
      setBodyRequired(false)

      return toast.error("title is required")  
    }
    try {
      const response = await axios.post(`${baseUrl}/api/articles`,{title,body});
      if(response.status ===201) {
        setTitle("");
        setBody("")
        return toast.success(response.data?.message);
      }
    } catch (error:any) {
      const message = error.response.data.message || error.message ;
      return toast.error(message);
      
    }
    
  }
  return (
    <form onSubmit={createAtricle} className=' flex flex-col gap-4 bg-purple-200 p-5 w-[80%] rounded'>
        <h1 className=' capitalize text-2xl text-slate-700 font-semibold'>add new articles</h1>
        <div>
          <input value={title} onChange={(e)=>setTitle(e.target.value)} type='text' placeholder='Enter your title' required className={ `${titleRequired?"border-2 border-red-600":""}  bg-white p-2.5 rounded-lg outline-none w-full`}/>
          {titleRequired && <p  className=' text-red-600 capitalize text-sm'>title is required</p>}
        </div>
        <div>
          <textarea value={body} onChange={(e)=>setBody(e.target.value)} placeholder='Enter your description' required className={`${bodyRequired? "border-2 border-red-600":""} bg-white resize-none h-75 p-2.5 rounded-lg outline-none w-full`} />
          {bodyRequired && <p className=' text-red-600 capitalize text-sm'>description is required</p>}

        </div>
        <button type='submit' className=' bg-blue-700 capitalize font-semibold py-2.5 rounded-xl hover:bg-blue-900 cursor-pointer text-white'>
            add
        </button>
        
    </form>
  )
}

export default AddArticles