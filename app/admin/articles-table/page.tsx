import { getAllArticles, getArticlesCount } from '@/app/apiCalls/Atricle';
import DeleteButton from '@/compontents/articles/DeleteButton';
import Pagitation from '@/compontents/articles/Pagitation';
import { ArticlePerNumber } from '@/utils/constants';
import { verifyForPages } from '@/utils/generateToken';
import { protectAdminPage } from '@/utils/protectAdminPages';
import { Article } from '@/utils/types';
import { cookies } from 'next/headers'
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

interface props {
  searchParams : Promise<{pageNumber:string}>
}

const page = async({searchParams}:props) => {
  const {pageNumber} = await searchParams ;
  
  await protectAdminPage()
  const articles : Article[]  = await getAllArticles(pageNumber);
  const count = await getArticlesCount();
  const numberOfPages = Math.ceil(count / ArticlePerNumber) ; 
  return (
    <div className=' fix-height-2 p-5'>
      <h1>Articles</h1>
      <table className=' w-full '>
        <thead>
          <tr>
            <td className=' py-2.5'>title</td>
            <td  className=' py-2.5'>created at</td>
            <td  className=' py-2.5'>actions</td>
            <td  className=' py-2.5'></td>
          </tr>
        </thead>
        <tbody>
          {
            articles.map((article,index)=>(
              <tr key={index}>
                <td className=' py-2.5'>{article.title}</td>
                <td  className=' py-2.5'>{(new Date(article.createdAt)).toDateString()}</td>
                <td  className=' py-2.5 flex items-center gap-1.5'>
                  <Link href={`/admin/articles-table/edit/${article.id}`}  className=' p-2.5 bg-green-600 rounded-lg text-white'>
                  Edit
                  </Link>
                  <DeleteButton articleId={(article.id).toString()}/>

                </td>
                <td  className=' py-2.5'>
                  <Link className=' bg-blue-500 text-white p-2.5 rounded-lg capitalize' href={`/articles/${article.id}`}>
                  read more
                  </Link>
                </td>

              </tr>
            ))
          }


        </tbody>
      </table>
      <Pagitation pageNumber={+pageNumber} numberofPages={numberOfPages} route="/admin/articles-table" />


    </div>
  )
}

export default page