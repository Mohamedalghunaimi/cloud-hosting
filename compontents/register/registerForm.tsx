/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { register } from '@/app/apiCalls/auth';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const RegisterForm = () => {
  const [email, setEmail] =  useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [loading,setLoading] = useState(false)
  const router = useRouter();

  const registerHandler = async (e: React.MouseEvent<HTMLButtonElement>) => { 
    setLoading(true)
    e.preventDefault();
    if(!username.trim()) {
      toast.error('Please enter username');
    } else if(!email.trim()) {
      toast.error('Please enter email');
    } else if(!password.trim()) {
      toast.error('Please enter password');
    } else {
      const response :AxiosResponse = await register({email,username,password}) ;
      if(response.status ===201) {
        toast.success(response.data?.message)
        setLoading(false)
          router.refresh()
          router.replace("/");
      } else {
        setLoading(false)
      }
    }
  }
  return (
    <form className=' w-[30%] bg-white rounded-2xl flex flex-col gap-2.5 shadow-lg border border-gray-100 p-5'>
        <h1 className=' text-center text-2xl font-bold mb-4 capitalize'>create new account</h1>
        <input 
        type="text" 
        placeholder='usename' 
        className=' border-2 border-gray-300 p-2 rounded-md w-full ' 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        />
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
        <button disabled={loading} onClick={(e)=>registerHandler(e)} type='submit' className={` ${loading?"cursor-no-drop":""} bg-blue-500 text-white p-3 rounded-lg w-full font-bold mt-2.5 cursor-pointer`}>Register </button>
    </form>  
    )
}

export default RegisterForm