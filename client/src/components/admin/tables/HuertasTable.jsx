import React, { useState } from 'react';
import Modal from '../../common/Modal';
import ConfirmDialog from '../../common/ConfirmDialog';
import HuertaForm from '../forms/HuertaForm';
import '../forms/UserForm.css';

const HuertasTable = ({ huertas, onCreate, onEdit, onDelete }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editHuerta, setEditHuerta] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, huerta: null });

  const handleNew = () => {
    setEditHuerta(null);
    setModalOpen(true);
  };

  const handleEdit = (huerta) => {
    setEditHuerta(huerta);
    setModalOpen(true);
  };

  const handleDelete = (huerta) => {
    setConfirmDelete({ open: true, huerta });
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditHuerta(null);
  };

  const handleCloseConfirm = () => {
    setConfirmDelete({ open: false, huerta: null });
  };

  const handleConfirmDelete = () => {
    if (confirmDelete.huerta && onDelete) {
      onDelete(confirmDelete.huerta.id);
    }
    handleCloseConfirm();
  };

  const handleSubmit = (formData) => {
    if (editHuerta) {
      onEdit({ ...editHuerta, ...formData });
    } else {
      onCreate(formData);
    }
    handleClose();
  };

  return (
    <div className="admin-table-wrapper">
      <div className="admin-table-header">
        <h3>Huertas</h3>
        <button className="new-btn" onClick={handleNew}>+ Nuevo</button>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Huerta El Paraíso</td>
            <td>Calle 123, Ciudad</td>
            <td>Huerta orgánica con variedad de cultivos</td>
            <td>
              <button className="edit-btn" onClick={() => handleEdit({ 
                id: 1, 
                nombre: 'Huerta El Paraíso', 
                direccion: 'Calle 123, Ciudad', 
                descripcion: 'Huerta orgánica con variedad de cultivos' 
              })}>Editar</button>
              <button className="delete-btn" onClick={() => handleDelete({ 
                id: 1, 
                nombre: 'Huerta El Paraíso' 
              })}>Eliminar</button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Huerta Verde</td>
            <td>Avenida 456, Pueblo</td>
            <td>Especializada en hortalizas</td>
            <td>
              <button className="edit-btn" onClick={() => handleEdit({ 
                id: 2, 
                nombre: 'Huerta Verde', 
                direccion: 'Avenida 456, Pueblo', 
                descripcion: 'Especializada en hortalizas' 
              })}>Editar</button>
              <button className="delete-btn" onClick={() => handleDelete({ 
                id: 2, 
                nombre: 'Huerta Verde' 
              })}>Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <Modal open={modalOpen} onClose={handleClose}>
        <HuertaForm
          initialData={editHuerta}
          onSubmit={handleSubmit}
          onCancel={handleClose}
          isEdit={!!editHuerta}
        />
      </Modal>

      <ConfirmDialog
        open={confirmDelete.open}
        onClose={handleCloseConfirm}
        onConfirm={handleConfirmDelete}
        title="Eliminar Huerta"
        message="¿Estás seguro de que quieres eliminar esta huerta?"
        itemName={confirmDelete.huerta ? confirmDelete.huerta.nombre : ''}
      />
    </div>
  );
};

export default HuertasTable; 