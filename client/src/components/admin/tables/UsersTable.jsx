import React, { useState } from 'react';
import Modal from '../../common/Modal';
import ConfirmDialog from '../../common/ConfirmDialog';
import UserForm from '../forms/UserForm';
import Loader from '../../common/Loader';
import '../forms/UserForm.css';

const UsersTable = ({ usuarios = [], onCreate, onEdit, onDelete, loading = false }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, user: null });

  const handleNew = () => {
    setEditUser(null);
    setModalOpen(true);
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setModalOpen(true);
  };

  const handleDelete = (user) => {
    setConfirmDelete({ open: true, user });
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditUser(null);
  };

  const handleCloseConfirm = () => {
    setConfirmDelete({ open: false, user: null });
  };

  const handleConfirmDelete = () => {
    if (confirmDelete.user && onDelete) {
      onDelete(confirmDelete.user.id_usuario);
    }
    handleCloseConfirm();
  };

  const handleSubmit = (formData) => {
    if (editUser) {
      onEdit({ ...formData, id_usuario: editUser.id_usuario });
    } else {
      onCreate(formData);
    }
    handleClose();
  };

  if (loading) {
    return (
      <div className="admin-table-wrapper">
        <div className="admin-table-header">
          <h3>Usuarios</h3>
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
        <h3>Usuarios</h3>
        <button className="new-btn" onClick={handleNew}>+ Nuevo</button>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Tipo</th>
            <th>Fecha Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>
                No hay usuarios registrados
              </td>
            </tr>
          ) : (
            usuarios.map((user) => (
              <tr key={user.id_usuario}>
                <td>{user.id_usuario}</td>
                <td>{user.nombre}</td>
                <td>{user.apellido}</td>
                <td>{user.correo}</td>
                <td>{user.id_tipo_usuario?.descripcion_tipo_usuario || 'Sin tipo'}</td>
                <td>{new Date(user.fecha_creacion).toLocaleDateString('es-ES')}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(user)}>Editar</button>
                  <button className="delete-btn" onClick={() => handleDelete(user)}>Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      
      <Modal open={modalOpen} onClose={handleClose}>
        <UserForm
          initialData={editUser}
          onSubmit={handleSubmit}
          onCancel={handleClose}
          isEdit={!!editUser}
        />
      </Modal>

      <ConfirmDialog
        open={confirmDelete.open}
        onClose={handleCloseConfirm}
        onConfirm={handleConfirmDelete}
        title="Eliminar Usuario"
        message="¿Estás seguro de que quieres eliminar este usuario?"
        itemName={confirmDelete.user ? `${confirmDelete.user.nombre} ${confirmDelete.user.apellido}` : ''}
      />
    </div>
  );
};

export default UsersTable; 