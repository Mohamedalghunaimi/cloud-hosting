/* eslint-disable prefer-const */
"use client"
import Link from 'next/link'
import React from 'react'
interface props {
  numberofPages : number,
  pageNumber:number,
  route:string
}

const Pagitation = ({numberofPages,pageNumber,route}:props) => {
  let pages:number[] = [] ;
  for(let i=1;i<=numberofPages;i++) {
    pages.push(i);
  }

    return (
    <div  className=' flex justify-center items-center mt-5'>
      {
        pageNumber>1 &&
      <Link  className=' cursor-pointer border border-gray-300 px-5 py-2.5' href={`/articles?page=${pageNumber-1}`}>
      prev
      </Link>
      }

      {
        pages.map((page,index)=> (
          <Link href={`${route}?pageNumber=${page}`} key={index} className=' cursor-pointer border border-gray-300 px-5 py-2.5'>
            {page}

          </Link>
        ))
      }
      {
        pageNumber<numberofPages &&
      <Link  className=' cursor-pointer border border-gray-300 px-5 py-2.5' href={`/articles?page=${pageNumber+1}`}>
      next
      </Link>
      }

      
      
    </div>
  )
}

export default Pagitation
