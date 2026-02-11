import { Article } from '@/utils/types'
import Link from 'next/link'

interface PostItemProps {
    article:Article 
}
const PostItem = ({article}:PostItemProps) => {
  return (
    <div key={article.id} className='  cursor-pointer rounded-2xl  border flex-col gap-2.5 flex   border-gray-200 p-5 shadow-xl' >
        <h2 className='text-xl font-bold'>{article.title}</h2>      
        <p>{article.body}</p>
        <Link href={`/articles/${article.id}`} className=' rounded-xl font-semibold capitalize bg-blue-600 text-white text-center  py-2.5 '>Read more</Link>
    </div>
  )
}

export default PostItem