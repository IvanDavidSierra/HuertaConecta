import React, { useState } from 'react';

const TipoUserForm = ({ initialData = {}, onSubmit, onCancel, isEdit = false }) => {
  const [form, setForm] = useState({
    descripcion_tipo_usuario: initialData?.descripcion_tipo_usuario || ''
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (form.descripcion_tipo_usuario.trim().length < 5) {
      setError('La descripción debe tener al menos 5 caracteres');
      return;
    }
    setError('');
    onSubmit(form);
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>{isEdit ? 'Editar Tipo de Usuario' : 'Nuevo Tipo de Usuario'}</h2>
      <input 
        name="descripcion_tipo_usuario" 
        placeholder="Descripción del rol" 
        value={form.descripcion_tipo_usuario} 
        onChange={handleChange} 
        required 
      />
      <div style={{fontSize: '0.9em', color: '#888'}}>Mínimo 5 caracteres</div>
      {error && <div className="error-message">{error}</div>}
      <div className="form-actions">
        <button type="submit" className="save-btn">{isEdit ? 'Guardar' : 'Crear'}</button>
        <button type="button" className="cancel-btn" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default TipoUserForm; 