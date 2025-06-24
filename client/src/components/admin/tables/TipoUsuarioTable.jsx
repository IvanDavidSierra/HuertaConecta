import React, { useState } from 'react';
import Modal from '../../common/Modal';
import ConfirmDialog from '../../common/ConfirmDialog';
import TipoUserForm from '../forms/TipoUserForm';
import '../forms/UserForm.css';

const TipoUsuarioTable = ({ tiposUsuario, onCreate, onEdit, onDelete }) => {
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
      onDelete(confirmDelete.tipo.id);
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
          <tr>
            <td>1</td>
            <td>Administrador</td>
            <td>
              <button className="edit-btn" onClick={() => handleEdit({ id: 1, descripcion: 'Administrador' })}>Editar</button>
              <button className="delete-btn" onClick={() => handleDelete({ id: 1, descripcion: 'Administrador' })}>Eliminar</button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Propietario</td>
            <td>
              <button className="edit-btn" onClick={() => handleEdit({ id: 2, descripcion: 'Propietario' })}>Editar</button>
              <button className="delete-btn" onClick={() => handleDelete({ id: 2, descripcion: 'Propietario' })}>Eliminar</button>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Miembro</td>
            <td>
              <button className="edit-btn" onClick={() => handleEdit({ id: 3, descripcion: 'Miembro' })}>Editar</button>
              <button className="delete-btn" onClick={() => handleDelete({ id: 3, descripcion: 'Miembro' })}>Eliminar</button>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Usuario</td>
            <td>
              <button className="edit-btn" onClick={() => handleEdit({ id: 4, descripcion: 'Usuario' })}>Editar</button>
              <button className="delete-btn" onClick={() => handleDelete({ id: 4, descripcion: 'Usuario' })}>Eliminar</button>
            </td>
          </tr>
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
        itemName={confirmDelete.tipo ? confirmDelete.tipo.descripcion : ''}
      />
    </div>
  );
};

export default TipoUsuarioTable; 