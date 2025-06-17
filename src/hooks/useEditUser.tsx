import axios from "axios"
import type { EditUser } from "../interfaces/EditUser"
import {useAuth} from '../contexts/AuthUser'
import type { EditUserRegular } from "../interfaces/EditUserRegular"

const useEditUser = ()=>{

    const {token} = useAuth()


    

    const editUserAdmin = async(userEdit: EditUser) => {
        await axios.post('http://localhost:3000/users/user/edit', userEdit, {
            headers: {
            "Authorization": `Bearer ${token}`
            }
        });
    } 


    const editUserRegular = async(user: EditUserRegular)=>{
        await axios.post('http://localhost:3000/users/user/profile/edit', user,{
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }



    return {editUserAdmin, editUserRegular}



}


export default useEditUser