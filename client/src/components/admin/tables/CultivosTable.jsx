import React, { useState } from 'react';
import Modal from '../../common/Modal';
import ConfirmDialog from '../../common/ConfirmDialog';
import CultivoForm from '../forms/CultivoForm';
import '../forms/UserForm.css';

const CultivosTable = ({ cultivos, onCreate, onEdit, onDelete }) => {
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
      onDelete(confirmDelete.cultivo.id);
    }
    handleCloseConfirm();
  };

  const handleSubmit = (formData) => {
    if (editCultivo) {
      onEdit({ ...editCultivo, ...formData });
    } else {
      onCreate(formData);
    }
    handleClose();
  };

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
          <tr>
            <td>1</td>
            <td>Tomate Cherry</td>
            <td>Variedad de tomate pequeño y dulce</td>
            <td>
              <button className="edit-btn" onClick={() => handleEdit({ 
                id: 1, 
                titulo: 'Tomate Cherry', 
                descripcion: 'Variedad de tomate pequeño y dulce' 
              })}>Editar</button>
              <button className="delete-btn" onClick={() => handleDelete({ 
                id: 1, 
                titulo: 'Tomate Cherry' 
              })}>Eliminar</button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Lechuga Romana</td>
            <td>Lechuga de hojas largas y crujientes</td>
            <td>
              <button className="edit-btn" onClick={() => handleEdit({ 
                id: 2, 
                titulo: 'Lechuga Romana', 
                descripcion: 'Lechuga de hojas largas y crujientes' 
              })}>Editar</button>
              <button className="delete-btn" onClick={() => handleDelete({ 
                id: 2, 
                titulo: 'Lechuga Romana' 
              })}>Eliminar</button>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Zanahoria Naranja</td>
            <td>Zanahoria tradicional de color naranja</td>
            <td>
              <button className="edit-btn" onClick={() => handleEdit({ 
                id: 3, 
                titulo: 'Zanahoria Naranja', 
                descripcion: 'Zanahoria tradicional de color naranja' 
              })}>Editar</button>
              <button className="delete-btn" onClick={() => handleDelete({ 
                id: 3, 
                titulo: 'Zanahoria Naranja' 
              })}>Eliminar</button>
            </td>
          </tr>
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