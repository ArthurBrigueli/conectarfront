import axios from "axios"
import { useState } from "react"
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
    const [errorRegister, setErrorRegister] = useState<string | null>(null);
    const {token} = useAuth()
    const [loading, setLoading] = useState<boolean>(false)


    const registerAdmin = async(userData: UserRegisterDataAdmin): Promise<ResponseIn | null> =>{
        setLoading(true)
        try {
            const response = await axios.post<ResponseIn>(`${API_URL}/users/admin/register`, userData,{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            setLoading(false)


            return { status: response.status, user: response.data.user}; 
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || "Erro na requisição";
                setErrorRegister(message);
            } else {
                setErrorRegister("Erro do servidor");
            }

            setLoading(false)

            return null;
        }
    }

    const register = async (userData: UserRegisterData): Promise<ResponseIn | null> => {
        setErrorRegister(null);
        setLoading(true)

        try {
            const response = await axios.post<ResponseIn>(`${API_URL}/users/register`, {
                name: userData.name,
                email: userData.email,
                password: userData.password
            });

            setLoading(false)

            return { status: response.status, user: response.data.user }; 
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || "Erro na requisição";
                setErrorRegister(message);
            } else {
                setErrorRegister("Erro do servidor");
            }

            setLoading(false)

            return null;
        }
    }

    return { register, errorRegister, registerAdmin, loading };
}

export default useRegisterUser;
