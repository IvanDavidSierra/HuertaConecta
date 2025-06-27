import React, { useState } from 'react';
import { useUsuariosHuertas } from '../../../context/UsuariosHuertasContext.tsx';

const PublicacionForm = ({ initialData = {}, onSubmit, onCancel, isEdit = false }) => {
  const { usuariosHuertas } = useUsuariosHuertas();
  const [form, setForm] = useState({
    titulo: initialData?.titulo || '',
    descripcion: initialData?.descripcion || '',
    contenido: initialData?.contenido || '',
    id_usuarios_huertas: initialData?.id_usuarios_huertas || ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (form.titulo.trim().length < 5) {
      newErrors.titulo = 'El título debe tener al menos 5 caracteres';
    }
    if (form.descripcion.trim().length < 10) {
      newErrors.descripcion = 'La descripción debe tener al menos 10 caracteres';
    }
    if (form.contenido.trim().length < 20) {
      newErrors.contenido = 'El contenido debe tener al menos 20 caracteres';
    }
    if (!form.id_usuarios_huertas) {
      newErrors.id_usuarios_huertas = 'Selecciona una relación usuario-huerta';
    }
    return newErrors;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    onSubmit({
      titulo: form.titulo,
      descripcion: form.descripcion,
      contenido: form.contenido,
      id_usuarios_huertas: form.id_usuarios_huertas
    });
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>{isEdit ? 'Editar Publicación' : 'Nueva Publicación'}</h2>
      <select name="id_usuarios_huertas" value={form.id_usuarios_huertas} onChange={handleChange} required>
        <option value="">Selecciona usuario y huerta...</option>
        {usuariosHuertas.map(rel => (
          <option key={rel.id_usuarios_huertas} value={rel.id_usuarios_huertas}>
            Usuario: {rel.id_usuario.nombre} {rel.id_usuario.apellido} - Huerta: {rel.id_huerta.nombre_huerta}
          </option>
        ))}
      </select>
      {errors.id_usuarios_huertas && <div className="error-message">{errors.id_usuarios_huertas}</div>}
      <input 
        name="titulo" 
        placeholder="Título" 
        value={form.titulo} 
        onChange={handleChange} 
        required 
      />
      <div style={{fontSize: '0.9em', color: '#888'}}>Mínimo 5 caracteres</div>
      {errors.titulo && <div className="error-message">{errors.titulo}</div>}
      <textarea 
        name="descripcion" 
        placeholder="Descripción" 
        value={form.descripcion} 
        onChange={handleChange} 
        required 
        rows="3"
      />
      <div style={{fontSize: '0.9em', color: '#888'}}>Mínimo 10 caracteres</div>
      {errors.descripcion && <div className="error-message">{errors.descripcion}</div>}
      <textarea 
        name="contenido" 
        placeholder="Contenido" 
        value={form.contenido} 
        onChange={handleChange} 
        required 
        rows="6"
      />
      <div style={{fontSize: '0.9em', color: '#888'}}>Mínimo 20 caracteres</div>
      {errors.contenido && <div className="error-message">{errors.contenido}</div>}
      <div className="form-actions">
        <button type="submit" className="save-btn">{isEdit ? 'Guardar' : 'Crear'}</button>
        <button type="button" className="cancel-btn" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default PublicacionForm; 