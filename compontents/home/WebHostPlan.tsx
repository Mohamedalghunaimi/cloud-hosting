import React from 'react'
import { SiTicktick } from "react-icons/si";

const WebHostPlan = () => {
  return (
    <div className=' capitalize  p-5 flex  flex-col gap-3  bg-slate-300 rounded-lg lg:w-[25%]'>
        <h1 className=' font-bold text-4xl text-purple-700 text-center'>premium</h1>
        <h2 className=' text-3xl font-bold text-center'>$29.99/month</h2>
        <span className='  w-fit  m-auto rounded-4xl text-white capitalize bg-blue-500 p-2.5'>10% off</span>
        <h3 className=' text-2xl font-bold text-blue-700'>Top Features</h3>
        <ul  className=' pl-2.5 flex flex-col gap-2.5'>
            <li className=' text-green-600 flex items-center gap-2'><SiTicktick className=' text-green-600' />Unlimited bandwidth</li>
            <li className=' text-green-600 flex items-center gap-2'><SiTicktick className=' text-green-600' />24/7 customer support</li>
            <li className=' text-green-600 flex items-center gap-2'><SiTicktick className=' text-green-600' />99.9% uptime guarantee</li> 
            <li className=' text-green-600 flex items-center gap-2'><SiTicktick className=' text-green-600' />Free SSL certificate</li>
            <li className=' text-green-600 flex items-center gap-2'><SiTicktick className=' text-green-600' />Daily backups</li>
        </ul>
        <button className=' bg-blue-500 text-white p-3 rounded-lg w-full'>Get Started</button>        
    </div>
  )
}

export default WebHostPlan