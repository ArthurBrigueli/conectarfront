import axios from "axios"
import type { EditUser } from "../interfaces/EditUser"
import {useAuth} from '../contexts/AuthUser'
import type { EditUserRegular } from "../interfaces/EditUserRegular"
import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const useEditUser = ()=>{

    const {token} = useAuth()
    const [loading, setLoading] = useState<boolean>(false)


    

    const editUserAdmin = async(userEdit: EditUser) => {
        setLoading(true)
        await axios.post(`${API_URL}/users/user/edit`, userEdit, {
            headers: {
            "Authorization": `Bearer ${token}`
            }
        });
        setLoading(false)
    } 


    const editUserRegular = async(user: EditUserRegular)=>{
        setLoading(true)
        await axios.post(`${API_URL}/users/user/profile/edit`, user,{
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        setLoading(false)
    }



    return {editUserAdmin, editUserRegular, loading}



}


export default useEditUser