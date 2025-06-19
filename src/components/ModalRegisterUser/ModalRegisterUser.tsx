import React, { useEffect, useState } from 'react';
import type { RegisterUser } from '../../interfaces/RegisterUser';
import AlertError from '../AlertError/AlertError';
import type { User } from '../../interfaces/User';
import type { EditUser } from '../../interfaces/EditUser';
import type { EditUserRegular } from '../../interfaces/EditUserRegular';
import styles from './ModalRegisterUser.module.css';

interface ModalRegisterUserProps {
  onClose: () => void;
  handleRegister?: (user: RegisterUser) => void;
  userEdit?: User | null;
  handleEditUser?: (user: EditUser) => void;
  handleEditUserProfile: (user: EditUserRegular) => void;
  mode: 'create' | 'editProfile' | 'editUser' | null;
  loadingRegisterUser?: boolean
  loadingEditUser: boolean
  error: string |null
  errorRegister?: string | null
}

const ModalRegisterUser: React.FC<ModalRegisterUserProps> = ({
  onClose,
  error:errorapi,
  handleRegister,
  userEdit,
  handleEditUser,
  mode,
  handleEditUserProfile,
  loadingRegisterUser,
  loadingEditUser,
  errorRegister
}) => {
  const [id, setId] = useState<number | undefined>(undefined);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = () => {
    setError(null);
    if (password !== confirmPassword) {
      setError('As senhas não são iguais!');
      return;
    }

    if(handleRegister){
      handleRegister({ name, email, password, role });
    }
    
  };

  const onSubmitEdit = () => {
    if(handleEditUser){
      handleEditUser({ id, name, email, password, role });
    } 
    
  };

  const onSubmitEditUser = async() => {
    handleEditUserProfile({ id, name, email, password });
  };

  useEffect(() => {
    if (userEdit) {
      setId(userEdit.id);
      setName(userEdit.name);
      setEmail(userEdit.email);
      setRole(userEdit.role as 'user' | 'admin');
    }
  }, []);

  const handleSubmit = () => {
    if (mode === 'create') {
      onSubmit();
    } else if (mode === 'editProfile') {
      onSubmitEditUser();
    } else if (mode === 'editUser') {
      onSubmitEdit();
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>{userEdit ? 'Editar perfil' : 'Cadastro de usuário'}</h2>
        <div className={styles.inputs}>
          <input
            className={styles.input}
            placeholder="Digite o nome completo"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            className={styles.input}
            placeholder="Digite o email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            className={styles.input}
            type="password"
            placeholder={userEdit ? 'Editar a senha (Opcional)' : 'Digite a senha'}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className={styles.input}
            type="password"
            placeholder={userEdit ? 'Digite novamente a senha caso tenha alterado' : 'Digite novamente a senha'}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {mode !== 'editProfile' && (
            <select
              className={styles.input}
              style={{ cursor: 'pointer' }}
              value={role}
              onChange={(e) => setRole(e.target.value as 'user' | 'admin')}
            >
              <option value="user">Usuário</option>
              <option value="admin">Administrador</option>
            </select>
          )}
        </div>

        {error && <AlertError msg={error} />}
        {errorapi && <AlertError msg={errorapi}/>}
        {errorRegister && <AlertError msg={errorRegister}/>}

        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={handleSubmit} disabled={loadingEditUser||loadingRegisterUser}>
            {loadingRegisterUser || loadingEditUser ? (
              "Carregando..."
            ):(
              userEdit ? 'Editar' : 'Cadastrar'
            )}
            
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalRegisterUser;
