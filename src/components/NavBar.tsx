import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthUser";

const NavBar = () => {
  const { isAuthenticated, logout, user, role } = useAuth();
  console.log(role)

  return (
    <nav style={styles.nav}>
      <div style={styles.leftSide}>
        <Link to="/" style={styles.link}>
          Home
        </Link>
        {!isAuthenticated && (
          <Link to="/login" style={styles.loginLink}>
            Login
          </Link>
        )}
      </div>

      {isAuthenticated && (
        <div style={styles.rightSide}>
          <span style={styles.userText}>
            Olá, <strong>{user?.name}</strong>
          </span>
        </div>
      )}
    </nav>
  );
};


const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#f8f9fa",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  },
  leftSide: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "bold",
    fontSize: "1.1rem",
  },
  loginLink: {
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "500",
    fontSize: "1rem",
  },
  rightSide: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },
  userText: {
    color: "#333",
    fontSize: "1rem",
  }
};

export default NavBar;
