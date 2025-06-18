import React from 'react';
import styles from './Filtros.module.css';

interface Props {
  selectedRole: string;
  setSelectedRole: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  order: 'asc' | 'desc';
  setOrder: (value: 'asc' | 'desc') => void;
  status: string
  setStatus: (value:string)=>void
}

const Filtros: React.FC<Props> = ({
  selectedRole,
  setSelectedRole,
  sortBy,
  setSortBy,
  order,
  setOrder,
  status,
  setStatus
}) => {
  return (
    <>
      <div className={styles.container}>
        <label>Filtrar por papel:</label>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className={styles.select}
        >
          <option value="">Todos</option>
          <option value="admin">Admin</option>
          <option value="user">Usuário</option>
        </select>
      </div>

      <div className={styles.containerMarginTop}>
        <label>Ordenar por:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={styles.select}
        >
          <option value="name">Nome</option>
          <option value="createdAt">Data de criação</option>
        </select>

        <select
          value={order}
          onChange={(e) => setOrder(e.target.value as 'asc' | 'desc')}
          className={styles.select}
        >
          <option value="asc">Crescente</option>
          <option value="desc">Decrescente</option>
        </select>

        
      </div>


      <div className={styles.containerMarginTop}>
        <label>Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={styles.select}
        >
          <option value="">Todos</option>
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
        </select>

        
      </div>
    </>
  );
};

export default Filtros;
