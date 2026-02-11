import { getArticlesBySearch } from '@/app/apiCalls/Atricle';
import PostItem from '@/compontents/articles/PostItem';
import { Article } from '@/utils/types';
import React from 'react'
interface props {
    searchParams :Promise<{searchText:string}>
}
const page = async ({searchParams}:props) => {
    const {searchText} = await searchParams ;
    const articles :Article[] = await getArticlesBySearch(searchText) ;

  return (
    <div className=' fix-height container mx-auto flex flex-col gap-2.5 py-5 '>
        <p>course title startwith :{searchText}</p>
        {
            articles.length>0?
            <div className=' flex gap-2.5 '>
            {
                articles.map((article,index)=>(
                    <PostItem key={index} article={article} />

                ))
            }

            </div>:
            <div>
                no articles start with this title

            </div>
        }

    </div>
  )
}

export default page