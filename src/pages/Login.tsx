import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"

const Login: React.FC = ()=>{


    const [email, setEmail] = useState<String>("");
    const [password, setPassword] = useState<String>("");



    const handleLogin = ()=>{
        
    }


    return(
        <div>
            <div>
                <h1>Login</h1>
                <input placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
                <input placeholder="Senha" onChange={(e)=>{setPassword(e.target.value)}} type="password"/>
                <button onClick={handleLogin}>
                    Login
                </button>
                
                <Link to="/register">Criar conta!</Link>
                
            </div>
        </div>
    )
}

export default Login