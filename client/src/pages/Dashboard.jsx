import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import './Dashboard.css';

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  
  // Verificar si el usuario está autenticado
  useEffect(() => {
    if (!isAuthenticated()) {
      // Redirigir a la página de login si no está autenticado
      window.location.href = '/auth';
    }
  }, [isAuthenticated]);

  // Si no hay usuario, mostrar loading
  if (!user) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Header />
      <main className="dashboard-main">
        <div className="dashboard-content">
          <div className="dashboard-header">
            <h1>¡Bienvenido a tu Dashboard, {user.nombre}!</h1>
            <p className="dashboard-subtitle">
              Tu huerta conectada está lista para crecer
            </p>
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-card">
              <div className="card-icon">🌱</div>
              <h3>Mi Huerta</h3>
              <p>Gestiona tus cultivos y plantas</p>
              <button className="dashboard-btn">Ver Huerta</button>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">📊</div>
              <h3>Estadísticas</h3>
              <p>Mira el progreso de tu huerta</p>
              <button className="dashboard-btn">Ver Estadísticas</button>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">📅</div>
              <h3>Calendario</h3>
              <p>Planifica tus actividades</p>
              <button className="dashboard-btn">Ver Calendario</button>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">👥</div>
              <h3>Comunidad</h3>
              <p>Conecta con otros agricultores</p>
              <button className="dashboard-btn">Ver Comunidad</button>
            </div>
          </div>

          <div className="dashboard-info">
            <div className="user-info-card">
              <h3>Información de tu Cuenta</h3>
              <div className="user-details">
                <p><strong>Nombre:</strong> {user.nombre} {user.apellido}</p>
                <p><strong>Email:</strong> {user.correo}</p>
                <p><strong>Tipo de Usuario:</strong> {user.id_tipo_usuario === 4 ? 'Agricultor' : 'Usuario'}</p>
              </div>
              <button 
                className="logout-btn" 
                onClick={logout}
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard; 