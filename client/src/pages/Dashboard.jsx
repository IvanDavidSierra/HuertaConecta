import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import huertaLogo from '../assets/huerta_conecta_logo.png';
import { AiOutlineHome } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader';
import { motion, AnimatePresence } from 'framer-motion';
import './Dashboard.css';

const huertasEjemplo = [
  {
    id: 1,
    nombre: 'Huerta El Paraíso',
    direccion: 'Calle 123, Ciudad',
    descripcion: 'Huerta orgánica con variedad de cultivos',
  },
  {
    id: 2,
    nombre: 'Huerta Verde',
    direccion: 'Avenida 456, Pueblo',
    descripcion: 'Especializada en hortalizas',
  },
];

const sugerencias = [
  {
    id: 3,
    nombre: 'Huerta Urbana',
    seguidores: '1.2K',
  },
  {
    id: 4,
    nombre: 'EcoHuerta',
    seguidores: '980',
  },
];

const animationVariants = {
  initial: { scale: 0.95, opacity: 0 },
  in: { scale: 1, opacity: 1 },
  out: { scale: 0.95, opacity: 0 },
};

const animationTransition = { duration: 0.32, ease: 'easeInOut' };

const profilePanelVariants = {
  hidden: { x: '-100%' },
  visible: { x: 0 },
  exit: { x: '-100%' },
};

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [hideHeaderFooter, setHideHeaderFooter] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log('Usuario en Dashboard:', user);
  }, [user]);

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = '/auth';
    }
    setHideHeaderFooter(true);
  }, [isAuthenticated]);

  if (!user) {
    return <Loader />;
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={animationVariants}
      transition={animationTransition}
      style={{ minHeight: '80vh' }}
    >
      <div className="dashboard-wsp-container">
        <Header hide={hideHeaderFooter} />
        <div className="dashboard-wsp-main">
          {/* Sidebar izquierda */}
          <aside className="dashboard-wsp-sidebar">
            <div className="sidebar-top-icons">
              <button className="sidebar-home-btn" onClick={() => navigate('/')}
                title="Volver al inicio">
                <AiOutlineHome size={28} />
              </button>
              <button className="sidebar-user-btn" onClick={() => setShowProfile(true)} title="Perfil de usuario">
                <FaUserCircle size={28} />
              </button>
            </div>
            <div className="sidebar-header">
              <h2>HuertaConecta</h2>
              <input type="text" className="sidebar-search" placeholder="Buscar huerta..." />
            </div>
            <div className="sidebar-list">
              {huertasEjemplo.map((huerta) => (
                <div key={huerta.id} className="sidebar-channel">
                  <div className="channel-avatar">{huerta.nombre.charAt(0)}</div>
                  <div className="channel-info">
                    <div className="channel-title">{huerta.nombre}</div>
                    <div className="channel-desc">{huerta.descripcion}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="sidebar-suggest-title">Sugerencias para seguir</div>
            <div className="sidebar-suggest-list">
              {sugerencias.map((s) => (
                <div key={s.id} className="sidebar-suggest-item">
                  <span className="suggest-avatar">{s.nombre.charAt(0)}</span>
                  <span className="suggest-name">{s.nombre}</span>
                  <span className="suggest-followers">{s.seguidores} seguidores</span>
                  <button className="suggest-btn">Seguir</button>
                </div>
              ))}
            </div>
            <button className="sidebar-discover-btn">Descubrir más</button>
            <AnimatePresence>
              {showProfile && (
                <motion.div
                  className="sidebar-profile-panel"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={profilePanelVariants}
                  transition={{ type: 'tween', duration: 0.32 }}
                >
                  <button className="profile-close-btn" onClick={() => setShowProfile(false)} title="Cerrar perfil">×</button>
                  <div className="profile-avatar"><FaUserCircle size={48} /></div>
                  <div className="profile-info">
                    <div className="profile-name">{user.nombre} {user.apellido}</div>
                    <div className="profile-email">{user.correo}</div>
                  </div>
                  <button className="profile-logout-btn" onClick={logout}>Cerrar sesión</button>
                </motion.div>
              )}
            </AnimatePresence>
          </aside>
          {/* Panel principal */}
          <main className="dashboard-wsp-panel">
            <div className="panel-center">
              <h1>Descubre huertas</h1>
              <p className="panel-desc">
                Explora, sigue y conecta con diferentes huertas. <br />
                ¡Encuentra la inspiración para tu propio cultivo!
              </p>
            </div>
          </main>
        </div>
        <Footer hide={hideHeaderFooter} />
      </div>
    </motion.div>
  );
};

export default Dashboard; 