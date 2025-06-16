import type React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLoginUser from "../hooks/useLoginUser";

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

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.brand}>Conécta</div>
        <h1 style={styles.title}>Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleLogin} style={styles.button}>
          Entrar
        </button>

        {error && <p style={styles.error}>{error}</p>}

        <Link to="/register" style={styles.link}>
          Criar conta!
        </Link>
      </div>
    </div>
  );
};


const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f2f5",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center" as const,
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1.5rem",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    margin: "0.5rem 0",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    marginTop: "1rem",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  link: {
    marginTop: "1rem",
    display: "block",
    color: "#007bff",
    textDecoration: "none",
    fontSize: "0.9rem",
  },
  error: {
    marginTop: "0.5rem",
    color: "#dc3545",
    fontSize: "0.95rem",
  },
  brand: {
    fontWeight: "bold",
    color: "#28a745",
    marginBottom: "0.5rem",
    fontSize: "1.2rem",
  },
};

export default Login;
