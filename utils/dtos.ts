export interface createArticleDto {
    title:string,
    body:string,
}

export interface updateArticleDto {
    title?:string,
    body?:string
}

export interface CreateUserDto {
    username:string,
    email:string,
    password:string
    
}

export interface loginDto {
    email:string,
    password:string
}

export interface UpdateProfile {
    password?:string,
    username?:string,
    email?:string
}

export interface createCommentDto {
    content:string,
    postId:string
}