import axios from "axios"
import type { EditUser } from "../interfaces/EditUser"
import {useAuth} from '../contexts/AuthUser'

const useEditUser = ()=>{

    const {token} = useAuth()


    

    const editUserAdmin = async(userEdit: EditUser) => {
        const response = await axios.post('http://localhost:3000/users/user/edit', userEdit, {
            headers: {
            "Authorization": `Bearer ${token}`
            }
        });
    } 



    return {editUserAdmin}



}


export default useEditUser