import type React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLoginUser from "../hooks/useLoginUser";
import styles from './Login.module.css'

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const { loginUser, error } = useLoginUser();

  const handleLogin = async () => {
    const response = await loginUser({ email, password });
    if (response?.statusCode === 201) {
      navigate("/");
    }
  };



  const handleLoginGoogle = ()=>{
    window.location.href = 'http://localhost:3000/auth/google';
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.brand}>Conécta</div>
        <h1 className={styles.title}>Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />

        <button onClick={handleLogin} className={styles.button}>
          Entrar
        </button>

        
        <div className={styles.loginContainer}>
          <p className={styles.loginText}>Ou fazer login com</p>
          <button className={styles.googleButton} onClick={handleLoginGoogle}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png"
              alt="Google logo"
              className={styles.googleLogo}
            />
          </button>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <Link to="/register" className={styles.link}>
          Criar conta!
        </Link>
      </div>
    </div>
  );
};


export default Login;
