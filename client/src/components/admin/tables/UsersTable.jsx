import React, { useState } from 'react';
import Modal from '../../common/Modal';
import ConfirmDialog from '../../common/ConfirmDialog';
import UserForm from '../forms/UserForm';
import '../forms/UserForm.css';

const UsersTable = ({ users, onCreate, onEdit, onDelete }) => {
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
      onDelete(confirmDelete.user.id);
    }
    handleCloseConfirm();
  };

  const handleSubmit = (formData) => {
    if (editUser) {
      onEdit({ ...editUser, ...formData });
    } else {
      onCreate(formData);
    }
    handleClose();
  };

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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Juan</td>
            <td>Pérez</td>
            <td>juan@correo.com</td>
            <td>Administrador</td>
            <td>
              <button className="edit-btn" onClick={() => handleEdit({ id: 1, name: 'Juan', lastName: 'Pérez', email: 'juan@correo.com', type: 'Administrador' })}>Editar</button>
              <button className="delete-btn" onClick={() => handleDelete({ id: 1, name: 'Juan', lastName: 'Pérez' })}>Eliminar</button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>María</td>
            <td>García</td>
            <td>maria@correo.com</td>
            <td>Usuario</td>
            <td>
              <button className="edit-btn" onClick={() => handleEdit({ id: 2, name: 'María', lastName: 'García', email: 'maria@correo.com', type: 'Usuario' })}>Editar</button>
              <button className="delete-btn" onClick={() => handleDelete({ id: 2, name: 'María', lastName: 'García' })}>Eliminar</button>
            </td>
          </tr>
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
        itemName={confirmDelete.user ? `${confirmDelete.user.name} ${confirmDelete.user.lastName}` : ''}
      />
    </div>
  );
};

export default UsersTable; 