import axios from "axios"
import type { EditUser } from "../interfaces/EditUser"
import {useAuth} from '../contexts/AuthUser'
import type { EditUserRegular } from "../interfaces/EditUserRegular"
import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const useEditUser = ()=>{

    const {token} = useAuth()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string|null>(null)


    

    const editUserAdmin = async(userEdit: EditUser) => {
        setLoading(true)
        try{
            await axios.post(`${API_URL}/users/user/edit`, userEdit, {
                headers: {
                "Authorization": `Bearer ${token}`
                }
            });
            return true
        }catch(error: any){
            if(axios.isAxiosError(error)){
                setError(error.response?.data?.message || "Erro na requisição")
            }else{
                setError('Erro no servidor')
            }
            return false
        }finally{
            setLoading(false)
        }
    } 


    const editUserRegular = async(user: EditUserRegular)=>{
        setLoading(true)
        try{
            await axios.post(`${API_URL}/users/user/profile/edit`, user,{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            setError(null)
            return true
        }catch(error: any){
            if(axios.isAxiosError(error)){
                setError(error.response?.data?.message || "Erro na requisição")
            }else{
                setError('Erro no servidor')
            }

            return false
        }finally{
            setLoading(false)
        }
        
    }



    return {editUserAdmin, editUserRegular, loading, error}



}


export default useEditUser