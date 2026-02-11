import React from 'react'
import Sidebar from './Sidebar'
interface RootLayoutProps {
    children: React.ReactNode
}
const RootLayout = ({children}:RootLayoutProps) => {
  return (
    <div className=' flex'>
      <div className=''>
        <Sidebar />
      </div>
      <div className=' flex-1'>
        {children}
      </div>
    </div>
  )
}

export default RootLayout