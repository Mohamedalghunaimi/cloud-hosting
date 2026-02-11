import Link from 'next/link'
import React from 'react'
import { GrTechnology } from "react-icons/gr";
import styles from './header.module.css';
import Navbar from './Navbar';
import { cookies } from 'next/headers';
import LogoutButton from './LogoutButton';
import { verifyForPages } from '@/utils/generateToken';

const Header = async() => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value ;
  
  const user =  await verifyForPages(token as string)


  return (
    <header className={`${styles.header}  py-5     bg-gray-200`}>
        <div className=' flex items-center justify-between container mx-auto'>
        <Navbar />  
        <div className=' flex items-center gap-2.5'>
          {token?<>
          <p>{user?.username}</p>
          <LogoutButton />
          </>:<>
          
            <Link href="/login" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Login</Link>
            <Link href="/register" className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Sign Up</Link>
          </>}


        </div>
        </div>
    </header>
  )
}

export default Header
