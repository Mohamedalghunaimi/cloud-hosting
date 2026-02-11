import Link from 'next/link';
import React from 'react'
import { FaDashcube } from "react-icons/fa";
import { MdOutlineArticle } from "react-icons/md";
import { FaRegComments } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className=' h-full w-full text-white p-5 lg:p-10 bg-purple-500'>
      <Link href={"/admin"} className=' flex items-center gap-1.25 mb-5'>
        <FaDashcube  className=' text-3xl lg:text-sm' />
        <span className=' font-semibold text-xl lg:block hidden'>Dashboard</span>
      </Link>
      <ul className=' flex flex-col gap-2'>
        <li className=' border-b flex items-center gap-2.5 w-fit capitalize font-semibold'>
          <Link className='flex items-center gap-2.5' href={"/admin/articles-table?pageNumber=1"}>
            <MdOutlineArticle className=' text-3xl lg:text-sm' />
            <span className=' lg:block hidden'>articles</span>
          </Link>

        </li>
        <li className=' border-b  w-fit capitalize font-semibold'>
          <Link className='flex items-center gap-2.5' href={"/admin/comments-table"}>
            <FaRegComments className=' text-3xl lg:text-sm'/>
            <span className=' lg:block hidden'>comments</span>
          </Link>
        </li>
      </ul>
      
    </div>
  )
}

export default Sidebar
