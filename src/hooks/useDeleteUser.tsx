import axios from "axios"
import {useAuth} from '../contexts/AuthUser'
const API_URL = import.meta.env.VITE_API_URL;

const useDeleteUser = ()=>{

    const {token} = useAuth()


    const deleteUser = async(idDelete: number|null)=>{
        await axios.delete(`${API_URL}/users/user/delete/${idDelete}`, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        })
    }


    return {deleteUser}



}


export default useDeleteUser