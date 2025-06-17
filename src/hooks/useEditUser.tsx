import axios from "axios"
import type { EditUser } from "../interfaces/EditUser"
import {useAuth} from '../contexts/AuthUser'
import type { EditUserRegular } from "../interfaces/EditUserRegular"
const API_URL = import.meta.env.VITE_API_URL;

const useEditUser = ()=>{

    const {token} = useAuth()


    

    const editUserAdmin = async(userEdit: EditUser) => {
        await axios.post(`${API_URL}/users/user/edit`, userEdit, {
            headers: {
            "Authorization": `Bearer ${token}`
            }
        });
    } 


    const editUserRegular = async(user: EditUserRegular)=>{
        await axios.post(`${API_URL}/users/user/profile/edit`, user,{
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }



    return {editUserAdmin, editUserRegular}



}


export default useEditUser