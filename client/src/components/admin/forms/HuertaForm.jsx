import React, { useState, useEffect } from 'react';

const HuertaForm = ({ initialData = {}, onSubmit, onCancel, isEdit = false }) => {
  const [form, setForm] = useState({
    nombre: initialData?.nombre || '',
    direccion: initialData?.direccion || '',
    descripcion: initialData?.descripcion || ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit) {
      setForm({
        nombre: initialData?.nombre || '',
        direccion: initialData?.direccion || '',
        descripcion: initialData?.descripcion || ''
      });
    }
  }, [isEdit, initialData]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (form.nombre.trim().length < 10) {
      newErrors.nombre = 'El nombre debe tener al menos 10 caracteres';
    }
    if (form.descripcion.trim().length < 20) {
      newErrors.descripcion = 'La descripción debe tener al menos 20 caracteres';
    }
    return newErrors;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
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
      <div style={{fontSize: '0.9em', color: '#888'}}>Mínimo 10 caracteres</div>
      {errors.nombre && <div className="error-message">{errors.nombre}</div>}
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
      <div style={{fontSize: '0.9em', color: '#888'}}>Mínimo 20 caracteres</div>
      {errors.descripcion && <div className="error-message">{errors.descripcion}</div>}
      <div className="form-actions">
        <button type="submit" className="save-btn">{isEdit ? 'Guardar' : 'Crear'}</button>
        <button type="button" className="cancel-btn" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default HuertaForm; 