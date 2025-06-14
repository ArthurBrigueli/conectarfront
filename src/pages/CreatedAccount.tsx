import React, { useState } from "react"
import { Link } from "react-router-dom"
import useRegisterUser from "../hooks/useRegisterUser";

const CreateAccount: React.FC = ()=>{

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');


    const {register, error} = useRegisterUser()


    const handleRegister = async()=>{
        const response = register({name, email, password})
    }





    return(
        <div>
            <div>
                <h1>Criar conta</h1>
                <input placeholder="Nome completo" onChange={(e)=> setName(e.target.value)}/>
                <input placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
                <input placeholder="Senha" onChange={(e)=>{setPassword(e.target.value)}} type="password"/>
                <button onClick={handleRegister}>
                    Criar conta
                </button>
                {error && (
                    <p style={{color: 'red'}}>{error}</p>
                )}
                <Link to="/login" style={{ marginRight: "1rem" }}>Já tenho uma conta</Link>
            </div>



            
        </div>
    )   
}


export default CreateAccount