import React from 'react';

const ModalAlertConfirmed = ({ onCancel, onConfirm }: { onCancel: ()=>void; onConfirm: () => void }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <h2 style={styles.title}>Tem certeza que deseja excluir?</h2>
        <p style={styles.description}>
          Essa ação não poderá ser desfeita.
        </p>
        <div style={styles.buttonGroup}>
          <button style={styles.cancelButton} onClick={onCancel}>Cancelar</button>
          <button style={styles.confirmButton} onClick={onConfirm}>Excluir</button>
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
    gap: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 0,
  },

  description: {
    fontSize: 16,
    color: '#555',
    margin: 0,
  },

  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 12,
  },

  cancelButton: {
    padding: '10px 20px',
    background: '#ccc',
    border: 'none',
    borderRadius: 8,
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },

  confirmButton: {
    padding: '10px 20px',
    background: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
};

export default ModalAlertConfirmed;
