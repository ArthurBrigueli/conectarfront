import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useRegisterUser from "../hooks/useRegisterUser";
import styles from './CreatedAccount.module.css'


const CreateAccount: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const { register, error, loading } = useRegisterUser();

  const handleRegister = async () => {
    const response = await register({ name, email, password });
    console.log(response?.status)
    if (response?.status == 201) {
      navigate("/login");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.brand}>Conéctar</div>
        <h1 className={styles.title}>Criar conta</h1>

        <input
          placeholder="Nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />

        <button onClick={handleRegister} className={styles.button} disabled={loading}>
          {loading ? (
            "Carregando..."
          ):(
            "Criar conta"
          )}
        </button>

        {error && <p className={styles.error}>{error}</p>}

        <Link to="/login" className={styles.link}>
          Já tenho uma conta
        </Link>
      </div>
    </div>
  );
};



export default CreateAccount;
