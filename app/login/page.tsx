import LoginForm from '@/compontents/login/LoginFor'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import React from 'react'

const LoginPage = async() => {
  const token =  (await cookies()).get('token')?.value;
  if(token) {
    redirect("/")
  }
  return (
    <div className='flex justify-center items-center fix-height-2'>
      <LoginForm />

      
    </div>
  )
}

export default LoginPage
