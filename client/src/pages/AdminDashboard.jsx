import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminSummaryCards from '../components/admin/AdminSummaryCards';
import UsersTable from '../components/admin/tables/UsersTable';
import TipoUsuarioTable from '../components/admin/tables/TipoUsuarioTable';
import HuertasTable from '../components/admin/tables/HuertasTable';
import PublicacionesTable from '../components/admin/tables/PublicacionesTable.jsx';
import CultivosTable from '../components/admin/tables/CultivosTable';
import AdminRoute from '../components/admin/AdminRoute';
import Loader from '../components/common/Loader';
import { useTipoUsuario } from '../context/TipoUsuarioContext';
import { useUsuario } from '../context/UsuarioContext';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext.tsx';
import { useHuerta } from '../context/HuertaContext';
import { usePublicacion } from '../context/PublicacionContext.tsx';
import { useCultivo } from '../context/CultivoContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [selected, setSelected] = useState('usuarios');
  const [user, setUser] = useState(null);
  const { tiposUsuario, loading: tiposLoading, createTipoUsuario, updateTipoUsuario, deleteTipoUsuario } = useTipoUsuario();
  const { usuarios, loading: usuariosLoading, updateUsuario, deleteUsuario, fetchUsuarios } = useUsuario();
  const { showToast } = useToast();
  const { register } = useAuth();
  const { huertas, loading: huertasLoading, createHuerta, updateHuerta, deleteHuerta } = useHuerta();
  const { publicaciones, loading: publicacionesLoading, createPublicacion, updatePublicacion, deletePublicacion } = usePublicacion();
  const { cultivos, loading: cultivosLoading, createCultivo, updateCultivo, deleteCultivo } = useCultivo();

  useEffect(() => {
    // Simulate fetching user data
    setUser(true);
  }, []);

  // Handlers para tipos de usuario
  const handleCreateTipoUsuario = async (formData) => {
    const result = await createTipoUsuario(formData);
    if (result.success) {
      showToast('Tipo de usuario creado exitosamente', 'success');
    } else {
      showToast(`Error al crear tipo de usuario: ${result.error}`, 'error');
    }
  };

  const handleUpdateTipoUsuario = async (formData) => {
    const result = await updateTipoUsuario(formData.id_tipo_usuario, formData);
    if (result.success) {
      showToast('Tipo de usuario actualizado exitosamente', 'success');
    } else {
      showToast(`Error al actualizar tipo de usuario: ${result.error}`, 'error');
    }
  };

  const handleDeleteTipoUsuario = async (id) => {
    const result = await deleteTipoUsuario(id);
    if (result.success) {
      showToast('Tipo de usuario eliminado exitosamente', 'success');
    } else {
      showToast(`Error al eliminar tipo de usuario: ${result.error}`, 'error');
    }
  };

  // Handler para crear usuario usando AuthContext
  const handleCreateUsuario = async (formData) => {
    // El AuthContext espera: nombre, apellido, correo, contrasena, id_tipo_usuario
    const { nombre, apellido, correo, contrasena, id_tipo_usuario } = formData;
    const result = await register({ nombre, apellido, correo, contrasena, id_tipo_usuario }, { admin: true });
    if (result.success) {
      showToast('Usuario creado exitosamente', 'success');
      await fetchUsuarios(); // Actualizar la tabla de usuarios
    } else {
      showToast(`Error al crear usuario: ${result.error}`, 'error');
    }
  };

  const handleUpdateUsuario = async (formData) => {
    const result = await updateUsuario(formData.id_usuario, formData);
    if (result.success) {
      showToast('Usuario actualizado exitosamente', 'success');
      await fetchUsuarios(); // Actualizar la tabla de usuarios
    } else {
      showToast(`Error al actualizar usuario: ${result.error}`, 'error');
    }
  };

  const handleDeleteUsuario = async (id) => {
    const result = await deleteUsuario(id);
    if (result.success) {
      showToast('Usuario eliminado exitosamente', 'success');
    } else {
      showToast(`Error al eliminar usuario: ${result.error}`, 'error');
    }
  };

  // Handlers para huertas
  const handleCreateHuerta = async (formData) => {
    const result = await createHuerta(formData);
    if (result.success) {
      showToast('Huerta creada exitosamente', 'success');
    } else {
      showToast(`Error al crear huerta: ${result.error}`, 'error');
    }
  };

  const handleUpdateHuerta = async (formData) => {
    const result = await updateHuerta(formData.id_huerta, formData);
    if (result.success) {
      showToast('Huerta actualizada exitosamente', 'success');
    } else {
      showToast(`Error al actualizar huerta: ${result.error}`, 'error');
    }
  };

  const handleDeleteHuerta = async (id) => {
    const result = await deleteHuerta(id);
    if (result.success) {
      showToast('Huerta eliminada exitosamente', 'success');
    } else {
      showToast(`Error al eliminar huerta: ${result.error}`, 'error');
    }
  };

  // Handlers para publicaciones
  const handleCreatePublicacion = async (formData) => {
    const result = await createPublicacion(formData);
    if (result.success) {
      showToast('Publicación creada exitosamente', 'success');
    } else {
      showToast(`Error al crear publicación: ${result.error}`, 'error');
    }
  };

  const handleUpdatePublicacion = async (formData) => {
    const result = await updatePublicacion(formData.id, formData);
    if (result.success) {
      showToast('Publicación actualizada exitosamente', 'success');
    } else {
      showToast(`Error al actualizar publicación: ${result.error}`, 'error');
    }
  };

  const handleDeletePublicacion = async (id) => {
    const result = await deletePublicacion(id);
    if (result.success) {
      showToast('Publicación eliminada exitosamente', 'success');
    } else {
      showToast(`Error al eliminar publicación: ${result.error}`, 'error');
    }
  };

  // Handlers para cultivos
  const handleCreateCultivo = async (formData) => {
    const result = await createCultivo(formData);
    if (result.success) {
      showToast('Cultivo creado exitosamente', 'success');
    } else {
      showToast(`Error al crear cultivo: ${result.error}`, 'error');
    }
  };

  const handleUpdateCultivo = async (id, formData) => {
    const result = await updateCultivo(id, formData);
    if (result.success) {
      showToast('Cultivo actualizado exitosamente', 'success');
    } else {
      showToast(`Error al actualizar cultivo: ${result.error}`, 'error');
    }
  };

  const handleDeleteCultivo = async (id) => {
    const result = await deleteCultivo(id);
    if (result.success) {
      showToast('Cultivo eliminado exitosamente', 'success');
    } else {
      showToast(`Error al eliminar cultivo: ${result.error}`, 'error');
    }
  };

  if (!user) {
    return <Loader />;
  }

  return (
    <AdminRoute>
      <div className="admin-dashboard">
        <AdminSidebar selected={selected} setSelected={setSelected} />
        <main className="admin-main">
          <h2>Panel de Administración</h2>
          <AdminSummaryCards />
          {selected === 'tipos' && (
            <TipoUsuarioTable 
              tiposUsuario={tiposUsuario}
              onCreate={handleCreateTipoUsuario}
              onEdit={handleUpdateTipoUsuario}
              onDelete={handleDeleteTipoUsuario}
              loading={tiposLoading}
            />
          )}
          {selected === 'usuarios' && (
            <UsersTable 
              usuarios={usuarios}
              onCreate={handleCreateUsuario}
              onEdit={handleUpdateUsuario}
              onDelete={handleDeleteUsuario}
              loading={usuariosLoading}
            />
          )}
          {selected === 'huertas' && (
            <HuertasTable
              huertas={huertas}
              onCreate={handleCreateHuerta}
              onEdit={handleUpdateHuerta}
              onDelete={handleDeleteHuerta}
              loading={huertasLoading}
            />
          )}
          {selected === 'publicaciones' && (
            <PublicacionesTable
              publicaciones={publicaciones}
              onCreate={handleCreatePublicacion}
              onEdit={handleUpdatePublicacion}
              onDelete={handleDeletePublicacion}
              loading={publicacionesLoading}
            />
          )}
          {selected === 'cultivos' && (
            <CultivosTable
              cultivos={cultivos}
              onCreate={handleCreateCultivo}
              onEdit={handleUpdateCultivo}
              onDelete={handleDeleteCultivo}
              loading={cultivosLoading}
            />
          )}
        </main>
      </div>
    </AdminRoute>
  );
};

export default AdminDashboard; 