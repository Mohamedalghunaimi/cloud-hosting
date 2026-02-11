import AddArticles from '@/compontents/admin/AddArticles'
import { verifyForPages } from '@/utils/generateToken';
import { protectAdminPage } from '@/utils/protectAdminPages';

import React from 'react'

const AdminPage = async() => {
  await protectAdminPage()

  
  return (
    <div className=' fix-height-2 flex justify-center items-center'>
      <AddArticles />
        
      
    </div>
  )
}

export default AdminPage
