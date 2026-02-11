import { verifyForPages } from '@/utils/generateToken';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react'
import { GrTechnology } from 'react-icons/gr'

const Navbar = async() => {
    const token = (await cookies()).get("token")?.value as string;
    const user = await verifyForPages(token);
    const isAdmin = user?.isAdmin || false ;

  return (
<nav className='  flex flex-1 items-center gap-6.25 py-2.5'>
            <Link href={"/"} className='  flex items-center gap-1 text-xl font-bold text-slate-700 cursor-pointer'>
                CLOUD
                <span><GrTechnology  className="text-blue-500" /></span>
                HOSTING
            </Link>
            <ul className=' flex items-center gap-2.5'>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/about">About</Link>
                </li>
                {isAdmin &&
                <li>
                    <Link href="/admin">Admin </Link>
                </li>
                }
                <li>
                    <Link href="/articles?pageNumber=1">Articles</Link>
                </li>
            </ul>

        </nav>  
    )
}

export default Navbar