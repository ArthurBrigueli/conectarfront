import axios from "axios"
import { useState } from "react"
import type { ApiResponse } from "../interfaces/apiResponse";
import {useAuth} from '../contexts/AuthUser'
import type { User } from "../interfaces/User";

const API_URL = import.meta.env.VITE_API_URL;

interface UserRegisterData {
    name: string,
    email: string,
    password: string
}

interface UserRegisterDataAdmin{
    name: string,
    email: string,
    password: string,
    role: string
}

interface ResponseIn {
  status: number;
  user: User;
}


const useRegisterUser = () => {
    const [error, setError] = useState<string | null>(null);
    const {token} = useAuth()


    const registerAdmin = async(userData: UserRegisterDataAdmin): Promise<ResponseIn | null> =>{
        try {
            const response = await axios.post<ResponseIn>(`${API_URL}/users/admin/register`, userData,{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            console.log(response.data.user)


            return { status: response.status, user: response.data.user}; 
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || "Erro na requisição";
                setError(message);
            } else {
                setError("Erro do servidor");
            }

            return null;
        }
    }

    const register = async (userData: UserRegisterData): Promise<ResponseIn | null> => {
        setError(null);

        try {
            const response = await axios.post<ResponseIn>(`${API_URL}/users/register`, {
                name: userData.name,
                email: userData.email,
                password: userData.password
            });

            return { status: response.status, user: response.data.user }; 
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || "Erro na requisição";
                setError(message);
            } else {
                setError("Erro do servidor");
            }

            return null;
        }
    }

    return { register, error, registerAdmin };
}

export default useRegisterUser;
