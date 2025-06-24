import React from 'react';
import { useAuth } from '../../context/AuthContext.tsx';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Cargando...</div>;
  if (!user || !user.id_tipo_usuario || user.id_tipo_usuario.id_tipo_usuario !== 1) return <Navigate to="/" />;
  return children;
};

export default AdminRoute; 