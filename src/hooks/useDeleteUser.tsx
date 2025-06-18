import axios from "axios"
import {useAuth} from '../contexts/AuthUser'
import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const useDeleteUser = ()=>{

    const {token} = useAuth()
    const [loading, setLoading] = useState<boolean>(false)


    const deleteUser = async(idDelete: number|null)=>{
        setLoading(true)
        await axios.delete(`${API_URL}/users/user/delete/${idDelete}`, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        })

        setLoading(false)
    }


    return {deleteUser, loading}



}


export default useDeleteUser