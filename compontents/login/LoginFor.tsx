/* eslint-disable @typescript-eslint/no-explicit-any */
'use client' 
import { login } from '@/app/apiCalls/auth';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const LoginForm = () => {
  const [email, setEmail] =  useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading] = useState(false)
  const router = useRouter();
  

  const loginHandler = async(e: React.MouseEvent<HTMLButtonElement>) => { 
    setLoading(true)
    e.preventDefault();
    if(!email.trim()) {
      toast.error('Please enter email');
    } else if(!password.trim()) {
      toast.error('Please enter password');
    } else {
        const response:AxiosResponse = await login({email,password})
        if(response.status ===200) {
          toast.success(response.data.message)
          setLoading(false)
          
          router.replace("/");
          router.refresh();
        } else {
          setLoading(false)
        }
    }
  }




  return (
    <form className=' w-[30%] bg-white rounded-2xl flex flex-col gap-2.5 shadow-lg border border-gray-100 p-5'>
        <h1 className=' text-center text-2xl font-bold mb-4'>Login Form</h1>
        <input 
        type="email" 
        placeholder='email' 
        className=' border-2 border-gray-300 p-2 rounded-md w-full '
        value={email}
        onChange={(e) => setEmail(e.target.value)}

        />
        <input 
        type="password" 
        placeholder='password' 
        className=' border-2 border-gray-300 p-2 rounded-md w-full ' 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={loading} onClick={(e)=>loginHandler(e)} type='submit' className={ ` ${loading?"cursor-none":""} bg-blue-500 text-white p-3 rounded-lg w-full`}>
           {loading?"loading":"login"}
        </button>
    </form>
    
  )
}

export default LoginForm