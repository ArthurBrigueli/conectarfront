import axios from "axios"
import {useAuth} from '../contexts/AuthUser'

const useDeleteUser = ()=>{

    const {token} = useAuth()


    const deleteUser = async(idDelete: number|null)=>{
        await axios.delete(`http://localhost:3000/users/user/delete/${idDelete}`, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        })
    }


    return {deleteUser}



}


export default useDeleteUser