'use client'

import Link from "next/link"
interface ErrorPageProps {
    error: Error;
    reset: () => void;
}

const ErrorPage = ({error,reset}:ErrorPageProps) => {
  return (
    <div className='flex flex-col gap-1.5 items-center justify-center p-5 fix-height'>

        <h1 className=' text-4xl font-semibold capitalize text-red-500'>some thing went wrong</h1>
        <p className=" capitalize text-xl">error message : {error.message}</p>
        <Link href={"/"} className='ml-4 text-blue-500 underline'>Go back to home</Link>
        <button onClick={()=>reset()} className='mt-4 bg-blue-500 font-semibold duration-300 hover:bg-blue-700 text-white px-4 py-2 rounded-xl cursor-pointer'>Try again</button>
    </div>
  )
}

export default ErrorPage