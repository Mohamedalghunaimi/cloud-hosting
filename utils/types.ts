export type Article = {
    id: number;
    title: string;
    body: string;
    userId:string;
    createdAt:string,
    comments:Array<Comment>

}
export type Comment = {
    createdAt:string,
    content:string,
    id:string,
    user:User

}
export type User = {
    username:string,
    id:string
}

export type payload = {
    id:string,
    username:string,
    isAdmin:boolean

}

export type errorType = {
    success:boolean,
    message?:string,
    status? :number,
    user?:payload
}