import axios from 'axios';
import type { ApiResponse } from '../interfaces/apiResponse';
import { useState } from 'react';
import {useAuth} from '../contexts/AuthUser'

const API_URL = import.meta.env.VITE_API_URL;

interface userLogin{
    email:string,
    password:string
}

const useLoginUser = ()=>{


    const [error, setError] = useState<string | null>(null)
    const {login} = useAuth()
    const [loading, setLoading] = useState<boolean>(false)
    

    const loginUser = async(userData: userLogin): Promise<ApiResponse | null>=>{
        setLoading(true)
        try{
            const response = await axios.post(`${API_URL}/auth/login`, {
                email: userData.email,
                password: userData.password
            })

            if(response.status == 201){
                login(response.data.access_token, response.data.user)
                setLoading(false)
                return {
                    statusCode: 201,
                    message: "Login realizado com sucesso"
                };
            }else{
                setLoading(false)
                return {
                    statusCode: response.status,
                    message: "Algo deu errado no login"
                };
            }
            
        }catch(error: any){
            setLoading(true)
            if(axios.isAxiosError(error)){
                const message = error.response?.data?.message || "Erro na requisição";
                setError(message);
            }else{
                setError("Erro do servidor")
                
            }
            setLoading(false)
        }

        return null
    }


    return {loginUser, error, loading}


}


export default useLoginUser