/* eslint-disable react-hooks/rules-of-hooks */


import Hero from '@/compontents/home/hero'
import WebHostPlan from '@/compontents/home/WebHostPlan'
import React from 'react'

const page = async() => {



  return (
 <>
  <div className=' bg-gray-200'>
      <Hero />
      <h1 className=' text-center capitalize  text-3xl font-bold mt-25'>choose your hosting plan</h1>
      <div className=' flex justify-center gap-5 flex-wrap p-5'>
        <WebHostPlan />
        <WebHostPlan />
        <WebHostPlan />
      </div>
  </div>

 </>
  )
}

export default page
