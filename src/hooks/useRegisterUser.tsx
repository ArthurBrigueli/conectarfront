import axios from "axios"
import { useState } from "react"

interface UserRegisterData {
    name: string,
    email: string,
    password: string
}


interface ApiResponse{
    statusCode: number,
    message: string
}


const useRegisterUser = ()=>{

    const [error, setError] = useState<string | null>(null);


    const register = async(userData: UserRegisterData):Promise<ApiResponse | null >=>{

        setError(null)
        
        try{
            const response = await axios.post<ApiResponse>('http://localhost:3000/users',{
                name: userData.name,
                email: userData.email,
                password: userData.password
            })

            return response.data

        }catch(error: any){

            if(axios.isAxiosError(error)){
                const message = error.response?.data?.message || "Erro na requisição";
                setError(message);
            }else{
                setError("Erro do servidor")
            }
            

            return null
        }

    }
     


    return {register, error}


    



}


export default useRegisterUser