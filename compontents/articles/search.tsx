"use client"
import { validateHeaderValue } from 'http'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Search = () => {
    const router = useRouter()
    const [searchText,setSearchText] = useState<string>("")
  return (
    <div className=' w-full'>
        <input type='search' onKeyDown={(e)=> {
            if(e.key==='Enter') {
                if(searchText.trim()) {
                    router.push(`/articles/search?searchText=${searchText}`)
                }
            }
        }} value={searchText} onChange={(e)=> setSearchText(e.target.value)}  placeholder='Search for articles' className=' w-full border border-gray-200 rounded-lg p-2.5' />
    </div>
  )
}

export default Search