import RegisterForm from '@/compontents/register/registerForm'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'

const RegisterPage = async() => {
  const token =  (await cookies()).get('token')?.value;
  if(token) {
    redirect("/")
  }
  return (
    <div className=' fix-height-2 flex justify-center items-center'>
      <RegisterForm />  
      

    </div>
  )
}

export default RegisterPage