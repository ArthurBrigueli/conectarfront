import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthUser';
import axios from 'axios';
import Separator from '../components/Separator';
import ModalRegisterUser from '../components/ModalRegisterUser/ModalRegisterUser';
import type { RegisterUser } from '../interfaces/RegisterUser';
import type { EditUser } from '../interfaces/EditUser';
import type { User } from '../interfaces/User';
import useRegisterUser from '../hooks/useRegisterUser';
import useEditUser from '../hooks/useEditUser';
import ModalAlertConfirmed from '../components/ModalAlertConfirmed/ModalAlertConfirmed';
import useDeleteUser from '../hooks/useDeleteUser';
import type { EditUserRegular } from '../interfaces/EditUserRegular';
import UserCard from '../components/UserCard/UserCard';
import Filtros from '../components/Filtros/Filtros';
import Profile from '../components/Profile/Profile';
import styles from './Home.module.css';

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {

  const { user, token, logout } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectUser, setSelectUser] = useState<User | null>(null);
  const { registerAdmin } = useRegisterUser();
  const { editUserAdmin, editUserRegular } = useEditUser();
  const [modalDeletetUser, setModalDeleteUser] = useState<boolean>(false);
  const [idDelete, setIdDelete] = useState<number | null>(null);
  const { deleteUser } = useDeleteUser();
  const [modeRegisterUser, setmodeRegisterUser] = useState<"create" | "editProfile" | "editUser" | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [status, setStatus] = useState<string>('');
  

  useEffect(() => {
    const getUsers = async () => {
      const queryParams = new URLSearchParams();
      if (selectedRole) queryParams.append('role', selectedRole);
      if (sortBy) queryParams.append('sortBy', sortBy);
      if (order) queryParams.append('order', order);
      if(status) queryParams.append('status', status)

      const response = await axios.get(`${API_URL}/users?${queryParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data);
    };

    getUsers();
  }, [selectedRole, sortBy, order, status]);


  const handleModalEditMember = (user: User | null, mode: "create" | "editProfile" | "editUser") => {
    setOpenModal(true);
    setSelectUser(user);
    setmodeRegisterUser(mode);
  };

  const registerUser = async (user: RegisterUser) => {
    const response = await registerAdmin(user);
    if (response && response.user) {
      setUsers((prev) => [...prev, response.user]);
    }
    setOpenModal(false);
  };

  const editUser = async (userEdit: EditUser) => {
    await editUserAdmin(userEdit);
    setUsers((prev) => prev.map(u => u.id === userEdit.id ? userEdit : u));
    setOpenModal(false);
  };

  const onClose = () => {
    setOpenModal(false);
    setSelectUser(null);
  };

  const onCloseDelete = () => {
    setModalDeleteUser(false);
  };

  const handleDeleteUser = (id: number | null) => {
    setIdDelete(id);
    setModalDeleteUser(true);
  };

  const confirmedDeleteUser = async () => {
    await deleteUser(idDelete);
    setModalDeleteUser(false);
    setUsers((prev) => prev.filter((user) => user.id !== idDelete));
    setIdDelete(null);
  };

  const handleEditUserProfile = async(user: EditUserRegular)=>{
    await editUserRegular(user)
    setOpenModal(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileWrapper}>
        <Profile user={user!} handleModalEditMember={handleModalEditMember} logout={logout}/>
      </div>

      {user?.role === 'admin' && (
        <div className={styles.adminPanel}>
          
          <div className={styles.registerButtonWrapper}>
            <Filtros sortBy={sortBy} setSortBy={setSortBy} setSelectedRole={setSelectedRole} setOrder={setOrder} selectedRole={selectedRole} order={order} status={status} setStatus={setStatus}/>
            <button className={styles.registerButton} onClick={() => handleModalEditMember(null, "create")}>Cadastrar usuário</button>
          </div>

          <Separator height={2} />

          <div className={styles.userListWrapper}>
            <h1>Usuários</h1>
            <div className={styles.userGrid}>
              {users.filter(u => u.id !== user.id).length === 0 ? (
                <p>Nenhum usuário encontrado.</p>
              ) : (
                users
                  .filter(u => u.id !== user.id)
                  .map((item, index) => (
                    <UserCard
                      key={index}
                      item={item}
                      index={index}
                      handleDeleteUser={handleDeleteUser}
                      handleModalEditMember={handleModalEditMember}
                    />
                  ))
              )}

            </div>
          </div>
        </div>
        

      )}

      {openModal && (
        <ModalRegisterUser
          onClose={onClose}
          handleRegister={registerUser}
          userEdit={selectUser}
          handleEditUser={editUser}
          mode={modeRegisterUser}
          handleEditUserProfile={handleEditUserProfile}
        />
      )}

      {modalDeletetUser && (
        <ModalAlertConfirmed onCancel={onCloseDelete} onConfirm={confirmedDeleteUser} />
      )}
    </div>
  );
};

export default Home;
