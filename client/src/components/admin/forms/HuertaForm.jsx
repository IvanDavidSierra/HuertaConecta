import React, { useState } from 'react';

const HuertaForm = ({ initialData = {}, onSubmit, onCancel, isEdit = false }) => {
  const [form, setForm] = useState({
    nombre: initialData?.nombre || '',
    direccion: initialData?.direccion || '',
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
      <h2>{isEdit ? 'Editar Huerta' : 'Nueva Huerta'}</h2>
      <input 
        name="nombre" 
        placeholder="Nombre de la huerta" 
        value={form.nombre} 
        onChange={handleChange} 
        required 
      />
      <input 
        name="direccion" 
        placeholder="Dirección" 
        value={form.direccion} 
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

export default HuertaForm; 