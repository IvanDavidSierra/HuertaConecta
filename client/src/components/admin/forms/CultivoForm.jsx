import React, { useState } from 'react';

const CultivoForm = ({ initialData = {}, onSubmit, onCancel, isEdit = false }) => {
  const [form, setForm] = useState({
    titulo: initialData?.titulo || '',
    descripcion: initialData?.descripcion || ''
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
      <h2>{isEdit ? 'Editar Cultivo' : 'Nuevo Cultivo'}</h2>
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
        rows="4"
      />
      <div className="form-actions">
        <button type="submit" className="save-btn">{isEdit ? 'Guardar' : 'Crear'}</button>
        <button type="button" className="cancel-btn" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default CultivoForm; 