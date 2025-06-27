import React, { useState } from 'react';
import Modal from '../../common/Modal';
import ConfirmDialog from '../../common/ConfirmDialog';
import CultivoForm from '../forms/CultivoForm';
import Loader from '../../common/Loader';
import '../forms/UserForm.css';

const CultivosTable = ({ cultivos = [], onCreate, onEdit, onDelete, loading = false }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editCultivo, setEditCultivo] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, cultivo: null });

  const handleNew = () => {
    setEditCultivo(null);
    setModalOpen(true);
  };

  const handleEdit = (cultivo) => {
    setEditCultivo(cultivo);
    setModalOpen(true);
  };

  const handleDelete = (cultivo) => {
    setConfirmDelete({ open: true, cultivo });
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditCultivo(null);
  };

  const handleCloseConfirm = () => {
    setConfirmDelete({ open: false, cultivo: null });
  };

  const handleConfirmDelete = () => {
    if (confirmDelete.cultivo && onDelete) {
      onDelete(confirmDelete.cultivo.id_cultivo);
    }
    handleCloseConfirm();
  };

  const handleSubmit = (formData) => {
    if (editCultivo) {
      onEdit(editCultivo.id_cultivo, { ...editCultivo, ...formData });
    } else {
      onCreate(formData);
    }
    handleClose();
  };

  if (loading) {
    return <Loader />;
  }

  // Ordenar cultivos por ID para mantener consistencia
  const sortedCultivos = [...cultivos].sort((a, b) => (a.id_cultivo || 0) - (b.id_cultivo || 0));

  return (
    <div className="admin-table-wrapper">
      <div className="admin-table-header">
        <h3>Cultivos</h3>
        <button className="new-btn" onClick={handleNew}>+ Nuevo</button>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sortedCultivos.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>
                No hay cultivos registrados
              </td>
            </tr>
          ) : (
            sortedCultivos.map((cultivo) => (
              <tr key={cultivo.id_cultivo}>
                <td>{cultivo.id_cultivo}</td>
                <td>{cultivo.titulo}</td>
                <td>{cultivo.descripcion}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(cultivo)}>
                    Editar
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(cultivo)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      
      <Modal open={modalOpen} onClose={handleClose}>
        <CultivoForm
          initialData={editCultivo}
          onSubmit={handleSubmit}
          onCancel={handleClose}
          isEdit={!!editCultivo}
        />
      </Modal>

      <ConfirmDialog
        open={confirmDelete.open}
        onClose={handleCloseConfirm}
        onConfirm={handleConfirmDelete}
        title="Eliminar Cultivo"
        message="¿Estás seguro de que quieres eliminar este cultivo?"
        itemName={confirmDelete.cultivo ? confirmDelete.cultivo.titulo : ''}
      />
    </div>
  );
};

export default CultivosTable; 