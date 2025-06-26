import React, { useState } from 'react';

const PublicacionForm = ({ initialData = {}, onSubmit, onCancel, isEdit = false }) => {
  const [form, setForm] = useState({
    titulo: initialData?.titulo || '',
    descripcion: initialData?.descripcion || '',
    contenido: initialData?.contenido || ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>{isEdit ? 'Editar Publicación' : 'Nueva Publicación'}</h2>
      <input 
        name="titulo" 
        placeholder="Título" 
        value={form.titulo} 
        onChange={handleChange} 
        required 
      />
      <textarea 
        name="descripcion" 
        placeholder="Descripción" 
        value={form.descripcion} 
        onChange={handleChange} 
        required 
        rows="3"
      />
      <textarea 
        name="contenido" 
        placeholder="Contenido" 
        value={form.contenido} 
        onChange={handleChange} 
        required 
        rows="6"
      />
      <div className="form-actions">
        <button type="submit" className="save-btn">{isEdit ? 'Guardar' : 'Crear'}</button>
        <button type="button" className="cancel-btn" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default PublicacionForm; 