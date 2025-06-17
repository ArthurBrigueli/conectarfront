import React from "react";
import styles from './Profile.module.css';
import type { User } from "../../interfaces/User";

interface Props {
  user: User;
  handleModalEditMember: (user: User, mode: "editProfile" | "editUser" | "create") => void;
  logout: () => void;
}

const Profile: React.FC<Props> = ({ user, handleModalEditMember, logout }) => {
  return (
    <div className={styles.profileWrapper}>
      <div className={styles.profileAvatar}>
        <p className={styles.profileLetter}>{user?.name[0]}</p>
      </div>
      <div>
        <p className={styles.profileName}>
          {user?.name} - {user?.role.toUpperCase()}
        </p>
        <p className={styles.profileEmail}>
          Último acesso: {user?.lastLogin?.toLocaleString()}
        </p>
        <p className={styles.profileEmail}>{user?.email}</p>
        <div className={styles.buttonGroup}>
          <button
            className={styles.editButton}
            onClick={() => handleModalEditMember(user, "editProfile")}
          >
            Editar perfil
          </button>
          <button className={styles.logoutButton} onClick={logout}>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
