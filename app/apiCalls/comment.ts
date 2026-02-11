/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseUrl } from "@/utils/constants";
import { createCommentDto, CreateUserDto } from "@/utils/dtos";
import axios from "axios";
import toast from "react-hot-toast";

export async function createComment({postId,content}:createCommentDto) {
    try {
        const response = await axios.post(`${baseUrl}/api/comment`,{postId,content})
        return response;
    } catch (error:any) {
        const message = error.response.data.message || error.message ;
        toast.error(message)
    }
}