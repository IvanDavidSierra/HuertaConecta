import React, { useState } from 'react';
import Modal from '../../common/Modal';
import ConfirmDialog from '../../common/ConfirmDialog';
import HuertaForm from '../forms/HuertaForm';
import Loader from '../../common/Loader';
import '../forms/UserForm.css';

const HuertasTable = ({ huertas = [], onCreate, onEdit, onDelete, loading = false }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editHuerta, setEditHuerta] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, huerta: null });

  const handleNew = () => {
    setEditHuerta(null);
    setModalOpen(true);
  };

  const handleEdit = (huerta) => {
    setEditHuerta({
      nombre: huerta.nombre_huerta || '',
      direccion: huerta.direccion_huerta || '',
      descripcion: huerta.descripcion || '',
      id_huerta: huerta.id_huerta
    });
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
      onDelete(confirmDelete.huerta.id_huerta);
    }
    handleCloseConfirm();
  };

  const handleSubmit = (formData) => {
    if (editHuerta) {
      onEdit({
        id_huerta: editHuerta.id_huerta,
        nombre_huerta: formData.nombre,
        direccion_huerta: formData.direccion,
        descripcion: formData.descripcion
      });
    } else {
      onCreate({
        nombre_huerta: formData.nombre,
        direccion_huerta: formData.direccion,
        descripcion: formData.descripcion,
        fecha_creacion: new Date().toISOString()
      });
    }
    handleClose();
  };

  if (loading) {
    return (
      <div className="admin-table-wrapper">
        <div className="admin-table-header">
          <h3>Huertas</h3>
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
            <th>Fecha Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {huertas.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>
                No hay huertas registradas
              </td>
            </tr>
          ) : (
            huertas.map((huerta) => (
              <tr key={huerta.id_huerta}>
                <td>{huerta.id_huerta}</td>
                <td>{huerta.nombre_huerta}</td>
                <td>{huerta.direccion_huerta}</td>
                <td>{huerta.descripcion}</td>
                <td>{new Date(huerta.fecha_creacion).toLocaleDateString('es-ES')}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(huerta)}>Editar</button>
                  <button className="delete-btn" onClick={() => handleDelete(huerta)}>Eliminar</button>
                </td>
              </tr>
            ))
          )}
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
        itemName={confirmDelete.huerta ? confirmDelete.huerta.nombre_huerta : ''}
      />
    </div>
  );
};

export default HuertasTable; 