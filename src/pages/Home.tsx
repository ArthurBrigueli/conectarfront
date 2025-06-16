import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthUser';
import axios from 'axios';
import Separator from '../components/Separator';
import { IoCloseOutline, IoBrushOutline } from 'react-icons/io5';
import ModalRegisterUser from '../components/ModalRegisterUser';
import type { RegisterUser } from '../interfaces/RegisterUser';
import useRegisterUser from '../hooks/useRegisterUser'
import type { EditUser } from '../interfaces/EditUser';
import type { User } from '../interfaces/User';
import useEditUser from '../hooks/useEditUser';
import ModalAlertConfirmed from '../components/ModalAlertConfirmed';
import useDeleteUser from '../hooks/useDeleteUser';



const Home = () => {
    const { user, token, logout } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [selectUser, setSelectUser] = useState<User | null>(null)
    const {registerAdmin} = useRegisterUser()
    const {editUserAdmin} = useEditUser()
    const [modalDeletetUser, setModalDeleteUser] = useState<boolean>(false)
    const [idDelete, setIdDelete] = useState<number|null>(null)
    const {deleteUser} = useDeleteUser()
    const [modeRegisterUser, setmodeRegisterUser] = useState<"create"|"editProfile"|"editUser" | null>(null)

    useEffect(() => {
        const getUsers = async () => {
        const response = await axios.get('http://localhost:3000/users', {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        setUsers(response.data);
        };

        getUsers();
    }, []);


    const handleModalRegisterMember = ()=>{
        setOpenModal(!openModal)
    }

    const handleModalEditMember = (user:User|null, mode:"create"|"editProfile"|"editUser")=>{
      setOpenModal(!openModal)
      setSelectUser(user)
      setmodeRegisterUser(mode)
    }


    const registerUser = async(user: RegisterUser)=>{

        const response = await registerAdmin(user)


        if (response && response.user) {
          setUsers((prev) => [...prev, response.user]);
        }
    
        setOpenModal(false)
    }

    const editUser = async(userEdit: EditUser)=>{
      console.log(userEdit)
      console.log(user)
      await editUserAdmin(userEdit)
      setUsers((prev) => prev.map(u => u.id === userEdit.id ? userEdit : u));
      setOpenModal(false)
    }
    
    const onClose = ()=>{
      setOpenModal(false)
      setSelectUser(null)
    }

    const onCloseDelete = ()=>{
      setModalDeleteUser(false)
    }


    const handleDeleteUser = (id: number|null)=>{
      setIdDelete(id)
      setModalDeleteUser(!modalDeletetUser)
    }

    const confirmedDeleteUser = async()=>{
      
      await deleteUser(idDelete)



      setModalDeleteUser(false)
      setUsers((prev) => prev.filter((user) => user.id !== idDelete));
      setIdDelete(null)

    }



    return (
        <div style={styles.container}>
        <div style={styles.profileWrapper}>
            <div style={styles.profileAvatar}>
            <p style={styles.profileLetter}>{user?.name[0]}</p>
            </div>

            <div>
            <p style={styles.profileName}>
                {user?.name} - {user?.role.toUpperCase()}
            </p>

            <p style={styles.profileEmail}>Ultimo acesso: {user?.lastLogin?.toLocaleString()}</p>

            <p style={styles.profileEmail}>{user?.email}</p>

            <div style={styles.buttonGroup}>
                <button style={styles.editButton} onClick={()=>{handleModalEditMember(user!, "editProfile")}}>Editar perfil</button>
                <button style={styles.logoutButton} onClick={logout}>
                  Sair
                </button>
            </div>
            </div>
        </div>

        {user?.role === 'admin' && (
            <div style={styles.adminPanel}>
            <div style={styles.registerButtonWrapper}>
                <button style={styles.registerButton} onClick={()=>{handleModalEditMember(null,"create")}}>Cadastrar usuário</button>
            </div>

            <Separator height={2} />

            <div style={styles.userListWrapper}>
                <h1>Usuários</h1>
                <div style={styles.userGrid}>
                  {users.map((item, index) => (
                      <div key={index} style={styles.userCard}>
                        <div style={styles.userAvatar}>
                            <p style={styles.userInitial}>{item.name[0].toUpperCase()}</p>
                        </div>

                        <p>{item.name}</p>
                        <p>{item.role}</p>
                        <p>{item.email}</p>
                        <p>{item.lastLogin?.toLocaleString()}</p>
                        

                        <div style={styles.cardButtons}>
                            <button style={styles.deleteButton} onClick={()=>{handleDeleteUser(item.id ?? null)}}>
                              <IoCloseOutline size={20} color="black" />
                            </button>
                            <button style={styles.editUserButton} onClick={()=>{handleModalEditMember(item, "editUser")}}>
                              <IoBrushOutline size={20} color="black" />
                            </button>
                        </div>
                      </div>
                  ))}
                </div>
            </div>
            </div>
        )}

        {openModal && (
            <ModalRegisterUser onClose={onClose} handleRegister={registerUser} userEdit={selectUser} handleEditUser={editUser} mode={modeRegisterUser}/>
        )}


        {modalDeletetUser && (
          <ModalAlertConfirmed onCancel={onCloseDelete} onConfirm={confirmedDeleteUser}/>
        )}

        



        </div>
    );
};

const styles = {
  container: {
    padding: 30,
    gap: 40,
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundColor: '#F3F4F6',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  profileWrapper: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    gap: 20,
    flexWrap: 'wrap' as const,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  },
  profileAvatar: {
    background: '#4D47C3',
    borderRadius: 100,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  profileLetter: {
    fontSize: 36,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#3A3A66',
  },
  profileEmail: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 12,
  },
  buttonGroup: {
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap' as const,
  },
  editButton: {
    width: 140,
    background: '#4D47C3',
    color: '#FFFFFF',
    padding: 10,
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  logoutButton: {
    width: 140,
    background: '#E5E7EB',
    color: '#1F2937',
    padding: 10,
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  adminPanel: {
    gap: 30,
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 12,
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
  },
  registerButtonWrapper: {
    display: 'flex',
    justifyContent: 'end',
  },
  registerButton: {
    background: '#4D47C3',
    color: '#FFFFFF',
    padding: 14,
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: 14,
  },
  userListWrapper: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 16,
  },
  userGrid: {
    display: 'flex',
    gap: 20,
    paddingLeft: 20,
    flexWrap: 'wrap' as const,
  },
  userCard: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    border: '1px solid #E5E7EB',
    width: 280,
    padding: 20,
    borderRadius: 10,
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
  },
  userAvatar: {
    border: '2px solid #4D47C3',
    borderRadius: '100%',
    width: 60,
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  userInitial: {
    fontSize: 24,
    color: '#4D47C3',
    fontWeight: 'bold',
  },
  cardButtons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    gap: 10,
    marginTop: 12,
  },
  deleteButton: {
    flex: 1,
    background: '#F87171',
    color: '#FFFFFF',
    border: 'none',
    padding: 8,
    borderRadius: 6,
    cursor: 'pointer',
  },
  editUserButton: {
    flex: 1,
    background: '#4B5563',
    color: '#FFFFFF',
    border: 'none',
    padding: 8,
    borderRadius: 6,
    cursor: 'pointer',
  },
};


export default Home;
