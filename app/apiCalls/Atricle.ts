import { ArticlePerNumber, baseUrl } from "@/utils/constants";
import { Article } from "@/utils/types";

export async function getAllArticles(page:string){
    try {
    const response = await fetch(`${baseUrl}/api/articles?articles=${ArticlePerNumber}&page=${page}`);
    if(!response.ok) {
        throw new Error("failed to fetch data")
    }   
    const articles :  Article[]  = await response.json();
    return articles
    } catch (error) {
        console.log(error)
        throw new Error("failed to fetch data")
    }
}

export async function getArticlesBySearch(searchText:string) {
    try {
        const response = await fetch(`${baseUrl}/api/articles/search?searchText=${searchText}`)
    if(!response.ok) {
        throw new Error("failed to fetch data")
    } 
    const articles :  Article[]  = await response.json();
    return articles;

    } catch (error) {
        console.error(error);
        throw new Error("failed to fetch data")

    }

}

export async function getArticlesCount() {
    try {
        const response = await fetch(`${baseUrl}/api/articles/count`)  ;
        if(!response.ok) {
            throw new Error("failed to fetch data")
        }
        const count = await response.json() as number;
        return count
        
        
    } catch (error) {
        console.error(error);
        throw new Error("failed to fetch data")

    }
}

export async function getSingleArtice(id:string) : Promise<Article> {
    const response = await fetch(`http://localhost:3000/api/articles/${id}`, {
        cache: 'no-store',
    }); 
    if(!response.ok) {
        throw new Error('Failed to fetch post');
    }    
    const article= await response.json() as Article;
    return article
    
}