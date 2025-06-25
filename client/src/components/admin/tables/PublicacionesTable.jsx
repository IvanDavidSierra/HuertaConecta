import React, { useState } from 'react';
import Modal from '../../common/Modal';
import ConfirmDialog from '../../common/ConfirmDialog';
import PublicacionForm from '../forms/PublicacionForm';
import '../forms/UserForm.css';

const PublicacionesTable = ({ publicaciones, onCreate, onEdit, onDelete }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editPublicacion, setEditPublicacion] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, publicacion: null });

  const handleNew = () => {
    setEditPublicacion(null);
    setModalOpen(true);
  };

  const handleEdit = (publicacion) => {
    setEditPublicacion(publicacion);
    setModalOpen(true);
  };

  const handleDelete = (publicacion) => {
    setConfirmDelete({ open: true, publicacion });
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditPublicacion(null);
  };

  const handleCloseConfirm = () => {
    setConfirmDelete({ open: false, publicacion: null });
  };

  const handleConfirmDelete = () => {
    if (confirmDelete.publicacion && onDelete) {
      onDelete(confirmDelete.publicacion.id);
    }
    handleCloseConfirm();
  };

  const handleSubmit = (formData) => {
    if (editPublicacion) {
      onEdit({ ...editPublicacion, ...formData });
    } else {
      onCreate(formData);
    }
    handleClose();
  };

  return (
    <div className="admin-table-wrapper">
      <div className="admin-table-header">
        <h3>Publicaciones</h3>
        <button className="new-btn" onClick={handleNew}>+ Nuevo</button>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Contenido</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Cultivo de Tomates</td>
            <td>Guía completa para el cultivo</td>
            <td>Los tomates son una excelente opción...</td>
            <td>
              <button className="edit-btn" onClick={() => handleEdit({ 
                id: 1, 
                titulo: 'Cultivo de Tomates', 
                descripcion: 'Guía completa para el cultivo', 
                contenido: 'Los tomates son una excelente opción...' 
              })}>Editar</button>
              <button className="delete-btn" onClick={() => handleDelete({ 
                id: 1, 
                titulo: 'Cultivo de Tomates' 
              })}>Eliminar</button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Huerta Orgánica</td>
            <td>Beneficios de la agricultura orgánica</td>
            <td>La agricultura orgánica ofrece múltiples beneficios...</td>
            <td>
              <button className="edit-btn" onClick={() => handleEdit({ 
                id: 2, 
                titulo: 'Huerta Orgánica', 
                descripcion: 'Beneficios de la agricultura orgánica', 
                contenido: 'La agricultura orgánica ofrece múltiples beneficios...' 
              })}>Editar</button>
              <button className="delete-btn" onClick={() => handleDelete({ 
                id: 2, 
                titulo: 'Huerta Orgánica' 
              })}>Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <Modal open={modalOpen} onClose={handleClose}>
        <PublicacionForm
          initialData={editPublicacion}
          onSubmit={handleSubmit}
          onCancel={handleClose}
          isEdit={!!editPublicacion}
        />
      </Modal>

      <ConfirmDialog
        open={confirmDelete.open}
        onClose={handleCloseConfirm}
        onConfirm={handleConfirmDelete}
        title="Eliminar Publicación"
        message="¿Estás seguro de que quieres eliminar esta publicación?"
        itemName={confirmDelete.publicacion ? confirmDelete.publicacion.titulo : ''}
      />
    </div>
  );
};

export default PublicacionesTable; 