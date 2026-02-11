    import { z } from "zod";

export const createArticleSchema = z.object({
    title:z.string().min(4,"at least must be 4"),
    body:z.string().min(4,"at least must be 4")
})

export const createUserSchema = z.object({
    username:z.string().min(4).max(200),
    password:z.string().min(10),
    email:z.string().min(4).max(200).email()
})

export const loginSchema = z.object({
    password:z.string().min(10),
    email:z.string().min(4).max(200).email()
})
export const updateArticleSchema = z.object({
    title:z.string().min(4,"at least must be 4").optional(),
    body:z.string().min(15,"at least must be 4").optional()
})

export const updateSchema = z.object({
    username:z.string().min(4).max(200).optional(),
    password:z.string().min(20).optional(),
    email:z.string().min(4).max(200).email().optional()
})


export const commentSchema = z.object({
    postId:z.string(),
    content:z.string().min(2)
})
export const updateCommentSchema = z.object({

    content:z.string().min(2).optional()
})