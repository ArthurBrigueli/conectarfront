import React from 'react';
import styles from './ModalAlertConfirmed.module.css';

const ModalAlertConfirmed = ({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <h2 className={styles.title}>Tem certeza que deseja excluir?</h2>
        <p className={styles.description}>
          Essa ação não poderá ser desfeita.
        </p>
        <div className={styles.buttonGroup}>
          <button className={styles.cancelButton} onClick={onCancel}>Cancelar</button>
          <button className={styles.confirmButton} onClick={onConfirm}>Excluir</button>
        </div>
      </div>
    </div>
  );
};

export default ModalAlertConfirmed;
