import Link from 'next/link'
import React from 'react'

const notFound = () => {
  return (
    <div className=' flex flex-col gap-5 justify-center items-center fix-height'> 
        <h1 className=' text-4xl font-semibold capitalize text-red-500'>404 not found</h1>
        <p className=" capitalize text-xl">the page you are looking for does not exist</p>
        <Link href={"/"} className='ml-4 text-blue-500 underline'>Go back to home</Link>
    </div>
  )
}

export default notFound