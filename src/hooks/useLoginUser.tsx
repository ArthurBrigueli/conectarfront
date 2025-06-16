import axios from 'axios';
import type { ApiResponse } from '../interfaces/apiResponse';
import { useState } from 'react';
import {useAuth} from '../contexts/AuthUser'

interface userLogin{
    email:string,
    password:string
}

const useLoginUser = ()=>{


    const [error, setError] = useState<string | null>(null)
    const {login} = useAuth()
    

    const loginUser = async(userData: userLogin): Promise<ApiResponse | null>=>{
        try{
            const response = await axios.post("http://localhost:3000/auth/login", {
                email: userData.email,
                password: userData.password
            })

            if(response.status == 201){
                login(response.data.access_token, response.data.user)
                return {
                    statusCode: 201,
                    message: "Login realizado com sucesso"
                };
            }else{
                return {
                    statusCode: response.status,
                    message: "Algo deu errado no login"
                };
            }
            
        }catch(error: any){
            if(axios.isAxiosError(error)){
                const message = error.response?.data?.message || "Erro na requisição";
                setError(message);
            }else{
                setError("Erro do servidor")
                
            }
        }

        return null
    }


    return {loginUser, error}


}


export default useLoginUser