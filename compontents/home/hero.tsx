import Image from 'next/image'
import React from 'react'
import { ImArrowUpRight } from 'react-icons/im'
import CloudImage from '../../public/cloud-hosting.png';

const Hero = () => {
  return (
   <div className=' fix-height-2 flex flex-col md:flex-row p-2.5 items-center justify-center gap-10 flex-wrap bg-gray-200'>
      <div className=' capitalize flex flex-col gap-2.5 w-[80%] sm:w-[70%] md:w-[50%] bg-white p-5 rounded-2xl lg:bg-transparent lg:p-0'>
        <h1  className=' font-bold text-4xl text-slate-700'>cloud hosting</h1>
        <p className='  text-slate-600 font-semibold'>Experience seamless cloud hosting with our reliable and scalable infrastructure.</p>
        <ul className=' flex flex-col gap-2.5'>
          <li className=' flex items-center gap-2.5'>
            <ImArrowUpRight/>
            Easy to use control panel

          </li>
          <li  className=' flex items-center gap-2.5'>
            <ImArrowUpRight/>
            secure hosting
          </li>
          <li  className=' flex items-center gap-2.5'>
            <ImArrowUpRight/>
            24/7 customer support
          </li>
        </ul>

      </div>

      <Image src={CloudImage} alt="404" width={500} height={500} className=' rounded-2xl' />
  

    </div>  )
}

export default Hero