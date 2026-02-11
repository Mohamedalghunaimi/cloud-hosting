/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseUrl } from "@/utils/constants";
import { CreateUserDto, loginDto } from "@/utils/dtos";
import axios from "axios";

export async function register({username,email,password}:CreateUserDto) {
    try {
        const response = await axios.post(`${baseUrl}/api/users/register`,{
            username,
            email,
            password
        });
        return response

    } catch (error:any) {
       const message = error.response?.data?.message || error.message; 
       throw new Error(error.message)
    }

}

export async function login({email,password}:loginDto) {
    try {
        const response = await axios.post(`${baseUrl}/api/users/login`,{
            email,
            password
        });
        return response

    } catch (error:any) {
      console.log(error)
       const message = error.response?.data?.message || error.message; 
       throw new Error(message)
    }
}


export async function Logout() {
    try {
        const response = await axios.get(`${baseUrl}/api/users/profile`);
        return response

    } catch (error:any) {
        console.log(error)
        const message = error.response?.data?.message || error.message; 
        throw new Error(message)
    }
}