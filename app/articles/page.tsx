/* eslint-disable @typescript-eslint/no-explicit-any */
import PostItem from '@/compontents/articles/PostItem';
import { Article } from '@/utils/types';
import axios from 'axios';
import Link from 'next/dist/client/link';
import React from 'react'
import { getAllArticles, getArticlesCount } from '../apiCalls/Atricle';
import Search from '@/compontents/articles/search';
import Pagitation from '@/compontents/articles/Pagitation';
import { ArticlePerNumber } from '@/utils/constants';

interface props {
    searchParams :Promise<{pageNumber:string}>
}
const ArticlesPage = async({searchParams}:props) => {
    const {pageNumber} = await searchParams;
    const articles:Article[] = await getAllArticles(pageNumber);
    const articlesCount = await getArticlesCount();
    const numberofPages = Math.ceil(articlesCount / ArticlePerNumber) ;


  return (
    <section  className=' p-5 container mx-auto fix-height flex flex-col items-center gap-5'>
        <Search />
        <div className='  items-start flex justify-center flex-wrap gap-2.5 flex-1'>
        {
            articles.map((article) => (
                <PostItem key={article.id} article={article} />
            ))      
        }
        </div>
        <Pagitation route='/articles' numberofPages={numberofPages} pageNumber={+pageNumber} />


        
    </section>
  )
}

export default ArticlesPage
/*
 async function getPosts()   {
    try {
        const resposnse = await axios.get('https://jsonplaceholder.typicode.com/posts',{
            
        });
        if(resposnse.status !== 200) {
            throw new Error('Failed to fetch posts');
        }
        const data = resposnse.data;
        articles = data.slice();
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw new Error('Failed to fetch posts');
    }   
}*/