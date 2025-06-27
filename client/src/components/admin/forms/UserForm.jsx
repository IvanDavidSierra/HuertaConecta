import React, { useState } from 'react';

const roles = [
  { value: 1, label: 'Administrador' },
  { value: 2, label: 'Propietario' },
  { value: 3, label: 'Miembro' },
  { value: 4, label: 'Invitado' }
];

const UserForm = ({ initialData = {}, onSubmit, onCancel, isEdit = false }) => {
  const [form, setForm] = useState({
    nombre: initialData?.nombre || '',
    apellido: initialData?.apellido || '',
    correo: initialData?.correo || '',
    contrasena: '',
    confirmarContrasena: '',
    id_tipo_usuario:
      initialData?.id_tipo_usuario?.id_tipo_usuario ||
      initialData?.id_tipo_usuario ||
      initialData?.tipo_usuario?.id_tipo_usuario ||
      ''
  });

  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(''); // Limpiar error al cambiar
  };

  const validate = () => {
    if (form.nombre.trim().length < 3) {
      setError('El nombre debe tener al menos 3 caracteres');
      return false;
    }
    if (form.apellido.trim().length < 3) {
      setError('El apellido debe tener al menos 3 caracteres');
      return false;
    }
    return true;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;
    
    if (!isEdit && form.contrasena !== form.confirmarContrasena) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    if (!isEdit && form.contrasena.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    // Preparar datos para enviar (sin confirmarContrasena)
    const { confirmarContrasena, ...dataToSubmit } = form;
    // Convertir id_tipo_usuario a número (si es objeto, tomar el id)
    if (typeof dataToSubmit.id_tipo_usuario === 'object' && dataToSubmit.id_tipo_usuario !== null) {
      dataToSubmit.id_tipo_usuario = dataToSubmit.id_tipo_usuario.id_tipo_usuario;
    }
    dataToSubmit.id_tipo_usuario = Number(dataToSubmit.id_tipo_usuario);
    // Si es edición y no hay contraseña nueva, no enviar contraseña
    if (isEdit && !dataToSubmit.contrasena) {
      delete dataToSubmit.contrasena;
    }
    console.log('Datos a enviar (crear/editar):', dataToSubmit);
    onSubmit(dataToSubmit);
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>{isEdit ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
      {error && <div className="error-message">{error}</div>}
      <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
      <div style={{fontSize: '0.9em', color: '#888'}}>Mínimo 3 caracteres</div>
      <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} required />
      <div style={{fontSize: '0.9em', color: '#888'}}>Mínimo 3 caracteres</div>
      <input name="correo" type="email" placeholder="Correo" value={form.correo} onChange={handleChange} required />
      {!isEdit && (
        <>
          <input name="contrasena" type="password" placeholder="Contraseña" value={form.contrasena} onChange={handleChange} required />
          <input name="confirmarContrasena" type="password" placeholder="Confirmar Contraseña" value={form.confirmarContrasena} onChange={handleChange} required />
        </>
      )}
      {isEdit && (
        <input name="contrasena" type="password" placeholder="Nueva Contraseña (opcional)" value={form.contrasena} onChange={handleChange} />
      )}
      <select name="id_tipo_usuario" value={form.id_tipo_usuario} onChange={handleChange} required>
        <option value="">Selecciona el rol...</option>
        {roles.map(r => (
          <option key={r.value} value={r.value}>{r.label}</option>
        ))}
      </select>
      <div className="form-actions">
        <button type="submit" className="save-btn">{isEdit ? 'Guardar' : 'Crear'}</button>
        <button type="button" className="cancel-btn" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default UserForm; 