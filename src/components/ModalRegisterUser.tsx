import React, { useEffect, useState } from 'react';
import type { RegisterUser } from '../interfaces/RegisterUser';
import AlertError from './AlertError';
import type { User } from '../interfaces/User';
import type { EditUser } from '../interfaces/EditUser';

interface ModalRegisterUserProps {
  onClose: () => void;
  handleRegister: (user: RegisterUser) => void;
  userEdit?: User | null
  handleEditUser: (user:EditUser) => void
}

const ModalRegisterUser: React.FC<ModalRegisterUserProps> = ({ onClose, handleRegister, userEdit, handleEditUser }) => {
  const [id, setId] = useState<number | undefined>(undefined)
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

    handleRegister({name, email, password, role });
  };


  const onSubmitEdit = ()=>{
      handleEditUser({id, name, email, password, role})
  }


  useEffect(()=>{
    if(userEdit){
      setId(userEdit.id)
      setName(userEdit.name)
      setEmail(userEdit.email)
      setRole(userEdit.role as 'user' | 'admin');
    }
  }, [])



  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.container} onClick={e => e.stopPropagation()}>
        <h2 style={{ alignSelf: 'center' }}>{userEdit ? "Editar usuario":"Cadastro de usuario"}</h2>
        <div style={styles.inputs}>
          <input
            style={styles.input}
            placeholder="Digite o nome completo"
            onChange={e => setName(e.target.value)}
            value={name}
          />
          <input
            style={styles.input}
            placeholder="Digite o email"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Digite a senha"
            onChange={e => setPassword(e.target.value)}
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Digite novamente a senha"
            onChange={e => setConfirmPassword(e.target.value)}
          />

          <select
            style={{ ...styles.input, cursor: 'pointer' }}
            value={role}
            onChange={e => setRole(e.target.value as 'user' | 'admin')}
          >
            <option value="user">Usuário</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        {error && <AlertError msg={error} />}

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <button style={styles.button} onClick={userEdit?onSubmitEdit:onSubmit}>
            {userEdit ? "Editar":"Cadastrar"}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    background: 'rgba(0, 0, 0, 0.5)',
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  container: {
    background: '#fff',
    width: '90%',
    maxWidth: 500,
    padding: 30,
    borderRadius: 12,
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    gap: 25,
  },
  inputs: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  input: {
    padding: '12px 16px',
    borderRadius: 8,
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '12px 30px',
    fontWeight: 'bold',
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default ModalRegisterUser;
