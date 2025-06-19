import React from "react";
import { IoBrushOutline, IoCloseOutline } from "react-icons/io5";
import styles from "./UserCard.module.css";
import type { User } from "../../interfaces/User";
import IsActiveStatus from "../IsActive/IsActiveStatus";

interface Props {
  item: User;
  index: number;
  handleDeleteUser: (id: number) => void;
  handleModalEditMember: (user: User, mode: "editUser" | "editProfile" | "create") => void;
}

const UserCard: React.FC<Props> = ({ item, index, handleDeleteUser, handleModalEditMember }) => {
  return (
    <div key={index} className={styles.userCard}>
      <div className={styles.userAvatar}>
        <p className={styles.userInitial}>{item.name[0].toUpperCase()}</p>
        <div className={styles.activeStatusDiv}>
          <IsActiveStatus isActive={item.isActive!}/>
        </div>
      </div>
      <p>{item.name}</p>
      <p>{item.role}</p>
      <p>{item.email}</p>
      <p>{item.lastLogin?.toLocaleString()}</p>
      <div className={styles.cardButtons}>
        <button className={styles.deleteButton} onClick={() => handleDeleteUser(item.id!)}>
          <IoCloseOutline size={20} color="black" />
        </button>
        <button className={styles.editUserButton} onClick={() => handleModalEditMember(item, "editUser")}>
          <IoBrushOutline size={20} color="black" />
        </button>
      </div>
    </div>
  );
};

export default UserCard;
