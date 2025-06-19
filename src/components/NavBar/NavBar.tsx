import { NavLink } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthUser";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <nav className={styles.nav}>
      <div className={styles.leftSide}>
        <NavLink
          to="/"
          className={({ isActive }) => `${styles.link} ${isActive ? styles.activeLink : ''}`}
        >
          Perfil
        </NavLink>

        {user?.role === 'admin' && (
          <NavLink
            to="/usuarios"
            className={({ isActive }) => `${styles.link} ${isActive ? styles.activeLink : ''}`}
          >
            Usuarios
          </NavLink>
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
