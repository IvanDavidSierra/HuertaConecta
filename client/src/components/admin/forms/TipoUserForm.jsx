import React, { useState } from 'react';

const TipoUserForm = ({ initialData = {}, onSubmit, onCancel, isEdit = false }) => {
  const [form, setForm] = useState({
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
      <h2>{isEdit ? 'Editar Tipo de Usuario' : 'Nuevo Tipo de Usuario'}</h2>
      <input 
        name="descripcion" 
        placeholder="Descripción del rol" 
        value={form.descripcion} 
        onChange={handleChange} 
        required 
      />
      <div className="form-actions">
        <button type="submit" className="save-btn">{isEdit ? 'Guardar' : 'Crear'}</button>
        <button type="button" className="cancel-btn" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default TipoUserForm; 