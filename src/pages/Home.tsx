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

    const handleModalEditMember = (user:User)=>{
      setOpenModal(!openModal)
      setSelectUser(user)
      
    }


    const registerUser = async(user: RegisterUser)=>{

        const response = await registerAdmin(user)


        if (response && response.user) {
          setUsers((prev) => [...prev, response.user]);
        }
    
        setOpenModal(false)
    }

    const editUser = async(user: EditUser)=>{
      await editUserAdmin(user)
      setUsers((prev) => prev.map(u => u.id === user.id ? user : u));
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
            <p style={styles.profileEmail}>{user?.email}</p>

            <div style={styles.buttonGroup}>
                <button style={styles.editButton}>Editar perfil</button>
                <button style={styles.logoutButton} onClick={logout}>
                Sair
                </button>
            </div>
            </div>
        </div>

        {user?.role === 'admin' && (
            <div style={styles.adminPanel}>
            <div style={styles.registerButtonWrapper}>
                <button style={styles.registerButton} onClick={handleModalRegisterMember}>Cadastrar usuário</button>
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

                      <div style={styles.cardButtons}>
                          <button style={styles.deleteButton} onClick={()=>{handleDeleteUser(item.id ?? null)}}>
                            <IoCloseOutline size={20} color="black" />
                          </button>
                          <button style={styles.editUserButton} onClick={()=>{handleModalEditMember(item)}}>
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
            <ModalRegisterUser onClose={onClose} handleRegister={registerUser} userEdit={selectUser} handleEditUser={editUser}/>
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
    gap: 100,
    display: 'flex',
    flexDirection: 'column' as const,
  },
  profileWrapper: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    gap: 20,
    flexWrap: 'wrap' as const,
  },
  profileAvatar: {
    background: 'white',
    borderRadius: 100,
    border: '2px black solid',
    width: '150px',
    height: '150px',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  profileLetter: {
    fontSize: 40,
    color: 'black',
  },
  profileName: {
    fontSize: 30,
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonGroup: {
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap' as const,
  },
  editButton: {
    width: '140px',
    background: '#dc3545',
    border: 'none',
    color: 'white',
    padding: 10,
    cursor: 'pointer',
    borderRadius: 10,
  },
  logoutButton: {
    width: '140px',
    background: '#D9D9D9',
    border: 'none',
    color: 'black',
    padding: 10,
    cursor: 'pointer',
    borderRadius: 10,
  },
  adminPanel: {
    gap: 20,
    display: 'flex',
    flexDirection: 'column' as const,
  },
  registerButtonWrapper: {
    display: 'flex',
    justifyContent: 'end',
  },
  registerButton: {
    background: '#66E688',
    border: 'none',
    padding: 15,
    cursor: 'pointer',
    borderRadius: 5,
    fontWeight: 'bold' as const,
  },
  userListWrapper: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 10,
  },
  userGrid: {
    display: 'flex',
    gap: 20,
    paddingLeft: 50,
    flexWrap: 'wrap' as const,
  },
  userCard: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    border: '1px solid black',
    width: '250px',
    minWidth: '300px',
    maxWidth: '30%',
    padding: 20,
    borderRadius: 10,
    boxSizing: 'border-box' as const,
  },
  userAvatar: {
    border: '1px solid black',
    borderRadius: '100%',
    width: 60,
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  userInitial: {
    fontSize: 25,
  },
  cardButtons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  deleteButton: {
    flex: 1,
    background: '#F9C9C9',
    border: 'none',
    padding: 10,
    borderRadius: 5,
    cursor: 'pointer',
  },
  editUserButton: {
    flex: 1,
    background: 'gray',
    border: 'none',
    padding: 10,
    borderRadius: 5,
    cursor: 'pointer',
  },
};

export default Home;
