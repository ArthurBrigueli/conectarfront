
import { useAuth } from '../contexts/AuthUser';

import ModalRegisterUser from '../components/ModalRegisterUser/ModalRegisterUser';

import type { User } from '../interfaces/User';

import useEditUser from '../hooks/useEditUser';

import type { EditUserRegular } from '../interfaces/EditUserRegular';

import Profile from '../components/Profile/Profile';
import styles from './Home.module.css';
import { useState } from 'react';

const Home = () => {

  const { user, logout, editUser } = useAuth();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectUser, setSelectUser] = useState<User | null>(null);
  const { editUserRegular, loading:loadingEditUser, error } = useEditUser();

  const [modeRegisterUser, setmodeRegisterUser] = useState<"create" | "editProfile" | "editUser" | null>(null);
  



  const handleModalEditMember = (user: User | null, mode: "create" | "editProfile" | "editUser") => {
    setOpenModal(true);
    setSelectUser(user);
    setmodeRegisterUser(mode);
  };


  const onClose = () => {
    setOpenModal(false);
    setSelectUser(null);
  };


  const handleEditUserProfile = async(user: EditUserRegular) => {     
    const success = await editUserRegular(user);      
    if(success){       
      editUser(user);  
      setOpenModal(false);     
    }             
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileWrapper}>
        <Profile user={user!} handleModalEditMember={handleModalEditMember} logout={logout}/>
      </div>

      {openModal && (
        <ModalRegisterUser
          onClose={onClose}
          userEdit={selectUser}
          mode={modeRegisterUser}
          handleEditUserProfile={handleEditUserProfile}
          loadingEditUser={loadingEditUser}
          error={error}
        />
      )}

    </div>
  );
};

export default Home;
