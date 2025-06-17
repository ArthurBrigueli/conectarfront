import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthUser";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const { isAuthenticated, logout, user, role } = useAuth();

  return (
    <nav className={styles.nav}>
      <div className={styles.leftSide}>
        <Link to="/" className={styles.link}>
          Home
        </Link>
        {!isAuthenticated && (
          <Link to="/login" className={styles.loginLink}>
            Login
          </Link>
        )}
      </div>

      {isAuthenticated && (
        <div className={styles.rightSide}>
          <span className={styles.userText}>
            Olá, <strong>{user?.name}</strong>
          </span>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
