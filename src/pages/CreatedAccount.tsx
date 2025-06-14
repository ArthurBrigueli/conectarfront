import React, { useState } from "react"
import { Link } from "react-router-dom"

const CreateAccount: React.FC = ()=>{

    const [name, setName] = useState<String>('');
    const [email, setEmail] = useState<String>('');
    const [password, setPassword] = useState<String>('');


    const handleRegister = ()=>{
        
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
                <Link to="/login" style={{ marginRight: "1rem" }}>Já tenho uma conta</Link>
            </div>



            
        </div>
    )   
}


export default CreateAccount