import React, { useState } from 'react';
import Modal from '../../common/Modal';
import ConfirmDialog from '../../common/ConfirmDialog';
import PublicacionForm from '../forms/PublicacionForm';
import { useHuerta } from '../../../context/HuertaContext.tsx';
import { useUsuario } from '../../../context/UsuarioContext.tsx';
import '../forms/UserForm.css';

const PublicacionesTable = ({ publicaciones, onCreate, onEdit, onDelete }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editPublicacion, setEditPublicacion] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, publicacion: null });
  const { huertas } = useHuerta();
  const { usuarios } = useUsuario();

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
      const publicacionId = confirmDelete.publicacion.id_publicacion || confirmDelete.publicacion.id;
      onDelete(publicacionId);
    }
    handleCloseConfirm();
  };

  const handleSubmit = (formData) => {
    if (editPublicacion) {
      const publicacionId = editPublicacion.id_publicacion || editPublicacion.id;
      onEdit({ id_publicacion: publicacionId, ...formData });
    } else {
      onCreate(formData);
    }
    handleClose();
  };

  // Función para obtener el nombre de la huerta y usuario por la relación anidada
  const getHuertaNombre = (pub) => {
    return pub.id_usuarios_huertas?.id_huerta?.nombre_huerta || '-';
  };
  const getUsuarioNombre = (pub) => {
    const u = pub.id_usuarios_huertas?.id_usuario;
    return u ? `${u.nombre} ${u.apellido}` : '-';
  };

  // Función para truncar texto largo
  const truncateText = (text, maxLength = 50) => {
    if (!text) return '-';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
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
            <th>Contenido</th>
            <th>Huerta</th>
            <th>Usuario</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {publicaciones && publicaciones.length > 0 ? (
            publicaciones.map((pub) => (
              <tr key={pub.id_publicacion || pub.id}>
                <td>{pub.id_publicacion || pub.id}</td>
                <td>{truncateText(pub.titulo_post || pub.titulo, 30)}</td>
                <td>{truncateText(pub.contenido_post || pub.contenido, 50)}</td>
                <td>{getHuertaNombre(pub)}</td>
                <td>{getUsuarioNombre(pub)}</td>
                <td>{pub.fecha_post ? new Date(pub.fecha_post).toLocaleDateString() : '-'}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(pub)}>Editar</button>
                  <button className="delete-btn" onClick={() => handleDelete(pub)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>
                No hay publicaciones registradas
              </td>
            </tr>
          )}
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
        itemName={confirmDelete.publicacion ? (confirmDelete.publicacion.titulo_post || confirmDelete.publicacion.titulo) : ''}
      />
    </div>
  );
};

export default PublicacionesTable; 