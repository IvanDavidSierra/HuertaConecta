import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    console.log('🔒 ProtectedRoute - Verificando autenticación...');
    console.log('🔒 Loading:', loading);
    console.log('🔒 IsAuthenticated:', isAuthenticated());
    
    if (!loading && !isAuthenticated()) {
      console.log('🔒 Usuario no autenticado, redirigiendo a /auth');
      // Redirigir a la página de login si no está autenticado
      window.location.href = '/auth';
    } else if (!loading && isAuthenticated()) {
      console.log('🔒 Usuario autenticado, mostrando contenido protegido');
    }
  }, [isAuthenticated, loading]);

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    console.log('🔒 Mostrando pantalla de carga...');
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontSize: '1.2rem'
      }}>
        Verificando autenticación...
      </div>
    );
  }

  // Si no está autenticado, no mostrar nada (se redirigirá)
  if (!isAuthenticated()) {
    console.log('🔒 Usuario no autenticado, no mostrando contenido');
    return null;
  }

  // Si está autenticado, mostrar el contenido protegido
  console.log('🔒 Mostrando contenido protegido');
  return children;
};

export default ProtectedRoute; 