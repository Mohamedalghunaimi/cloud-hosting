"use client"
import { Logout } from '@/app/apiCalls/auth'
import { useRouter } from 'next/navigation'
import React, { useReducer } from 'react'

const LogoutButton = () => {
    const router = useRouter()
    const logout = async() => {
        const resposne = await Logout();
        if(resposne.status===200) {
            router.refresh()
        }
    }

  return (
    <button onClick={()=>logout()} className=' capitalize text-lg cursor-pointer text-white bg-red-500 rounded-lg py-2.5 px-3.75'>
        logout
    </button>
  )
}

export default LogoutButton
