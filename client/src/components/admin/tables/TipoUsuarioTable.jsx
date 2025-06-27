import React, { useState } from 'react';
import Modal from '../../common/Modal';
import ConfirmDialog from '../../common/ConfirmDialog';
import TipoUserForm from '../forms/TipoUserForm';
import Loader from '../../common/Loader';
import '../forms/UserForm.css';

const TipoUsuarioTable = ({ tiposUsuario = [], onCreate, onEdit, onDelete, loading = false }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editTipo, setEditTipo] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, tipo: null });

  const handleNew = () => {
    setEditTipo(null);
    setModalOpen(true);
  };

  const handleEdit = (tipo) => {
    setEditTipo(tipo);
    setModalOpen(true);
  };

  const handleDelete = (tipo) => {
    setConfirmDelete({ open: true, tipo });
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditTipo(null);
  };

  const handleCloseConfirm = () => {
    setConfirmDelete({ open: false, tipo: null });
  };

  const handleConfirmDelete = () => {
    if (confirmDelete.tipo && onDelete) {
      onDelete(confirmDelete.tipo.id_tipo_usuario);
    }
    handleCloseConfirm();
  };

  const handleSubmit = (formData) => {
    if (editTipo) {
      onEdit({ ...editTipo, ...formData });
    } else {
      onCreate(formData);
    }
    handleClose();
  };

  if (loading) {
    return (
      <div className="admin-table-wrapper">
        <div className="admin-table-header">
          <h3>Tipos de Usuario</h3>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="admin-table-wrapper">
      <div className="admin-table-header">
        <h3>Tipos de Usuario</h3>
        <button className="new-btn" onClick={handleNew}>+ Nuevo</button>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tiposUsuario.length === 0 ? (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center', padding: '2rem' }}>
                No hay tipos de usuario registrados
              </td>
            </tr>
          ) : (
            tiposUsuario.map((tipo) => (
              <tr key={tipo.id_tipo_usuario}>
                <td>{tipo.id_tipo_usuario}</td>
                <td>{tipo.descripcion_tipo_usuario}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(tipo)}>Editar</button>
                  <button className="delete-btn" onClick={() => handleDelete(tipo)}>Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      
      <Modal open={modalOpen} onClose={handleClose}>
        <TipoUserForm
          initialData={editTipo}
          onSubmit={handleSubmit}
          onCancel={handleClose}
          isEdit={!!editTipo}
        />
      </Modal>

      <ConfirmDialog
        open={confirmDelete.open}
        onClose={handleCloseConfirm}
        onConfirm={handleConfirmDelete}
        title="Eliminar Tipo de Usuario"
        message="¿Estás seguro de que quieres eliminar este tipo de usuario?"
        itemName={confirmDelete.tipo ? confirmDelete.tipo.descripcion_tipo_usuario : ''}
      />
    </div>
  );
};

export default TipoUsuarioTable; 