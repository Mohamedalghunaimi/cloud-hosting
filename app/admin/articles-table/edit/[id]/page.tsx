import { getSingleArtice } from '@/app/apiCalls/Atricle';
import EditArtice from '@/compontents/admin/EditArtice'
import { protectAdminPage } from '@/utils/protectAdminPages';
import { Article } from '@/utils/types';
import React from 'react'
interface props {
    params:Promise<{id:string}>
}

const page = async({params}:props) => {
    await protectAdminPage();
    const {id} = await params;
    const article:Article = await getSingleArtice(id) ;
    


    return (
    <div className=' fix-height-2 w-full p-5 flex justify-center items-center '>
        <EditArtice  article={article}/>
    </div>
    )
}

export default page
