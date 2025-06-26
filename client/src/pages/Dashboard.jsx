import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { AiOutlineHome, AiOutlineSend, AiOutlineCheckSquare } from 'react-icons/ai';
import { FaUserCircle, FaEllipsisV, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader';
import { motion, AnimatePresence } from 'framer-motion';
import './Dashboard.css';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

const huertasEjemplo = [
  {
    id: 1,
    nombre: 'Huerta El Paraíso',
    direccion: 'Calle 123, Ciudad',
    descripcion: 'Huerta orgánica con variedad de cultivos',
    propietario: 'Juan Pérez',
  },
  {
    id: 2,
    nombre: 'Huerta Verde',
    direccion: 'Avenida 456, Pueblo',
    descripcion: 'Especializada en hortalizas',
    propietario: 'María García',
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

// Mensajes de ejemplo para las huertas
const mensajesEjemplo = {
  1: [
    {
      id: 1,
      tipo: 'publicacion',
      usuario: 'Ana López',
      contenido: '¡Hoy coseché tomates hermosos! 🍅',
      fecha: '2024-01-15T10:30:00',
      avatar: 'AL'
    },
    {
      id: 2,
      tipo: 'tarea',
      usuario: 'Carlos Ruiz',
      contenido: 'Regué las plantas de la mañana',
      fecha: '2024-01-15T09:15:00',
      avatar: 'CR',
      completada: true
    },
    {
      id: 3,
      tipo: 'publicacion',
      usuario: 'María García',
      contenido: 'Las zanahorias están creciendo muy bien 🌱',
      fecha: '2024-01-15T08:45:00',
      avatar: 'MG'
    }
  ],
  2: [
    {
      id: 1,
      tipo: 'publicacion',
      usuario: 'Pedro Silva',
      contenido: 'Nuevas semillas de lechuga plantadas',
      fecha: '2024-01-15T11:20:00',
      avatar: 'PS'
    },
    {
      id: 2,
      tipo: 'tarea',
      usuario: 'Laura Torres',
      contenido: 'Fertilización de las plantas',
      fecha: '2024-01-15T10:00:00',
      avatar: 'LT',
      completada: false
    }
  ]
};

const miembrosEjemplo = [
  { nombre: 'Ana López', rol: 'Miembro' },
  { nombre: 'Carlos Ruiz', rol: 'Miembro' },
  { nombre: 'María García', rol: 'Propietario' },
];
const tareasEjemplo = [
  { 
    tarea: 'Regar plantas', 
    estado: 'Completada', 
    asignado: 'Ana López',
    descripcion: 'Regar todas las plantas del invernadero con agua filtrada. Especial atención a los tomates que están en floración.',
    comentarios: [
      { usuario: 'Ana López', texto: 'Regado completado a las 8:00 AM', fecha: '2024-01-15T08:00:00' },
      { usuario: 'María García', texto: 'Perfecto, las plantas se ven muy saludables', fecha: '2024-01-15T08:30:00' }
    ]
  },
  { 
    tarea: 'Fertilizar', 
    estado: 'Pendiente', 
    asignado: 'Carlos Ruiz',
    descripcion: 'Aplicar fertilizante orgánico a las hortalizas. Usar la mezcla preparada con compost y humus.',
    comentarios: [
      { usuario: 'Carlos Ruiz', texto: 'Preparando la mezcla de fertilizante', fecha: '2024-01-15T09:00:00' }
    ]
  },
];

const cultivosEjemplo = ['Tomate cherry', 'Lechuga', 'Zanahoria', 'Pepino', 'Albahaca'];

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

const chatPanelVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 },
};

const infoPanelVariants = {
  hidden: { x: '100%' },
  visible: { x: 0 },
  exit: { x: '100%' },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [hideHeaderFooter, setHideHeaderFooter] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [huertaSeleccionada, setHuertaSeleccionada] = useState(null);
  const [mensajes, setMensajes] = useState({});
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [showOpciones, setShowOpciones] = useState(false);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [showTareaModal, setShowTareaModal] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
  const [editandoTarea, setEditandoTarea] = useState(false);
  const [tareaEdit, setTareaEdit] = useState({});
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showConfirmDeleteMiembro, setShowConfirmDeleteMiembro] = useState(false);
  const [miembroAEliminar, setMiembroAEliminar] = useState(null);
  const navigate = useNavigate();
  const textareaRef = useRef(null);
  const [showCrearTarea, setShowCrearTarea] = useState(false);
  const [nuevaTarea, setNuevaTarea] = useState({ tarea: '', descripcion: '', asignado: miembrosEjemplo[0]?.nombre || '', cultivo: 'Tomate cherry' });
  const [showDiscoverPanel, setShowDiscoverPanel] = useState(false);
  const [showCrearHuerta, setShowCrearHuerta] = useState(false);
  const [nuevaHuerta, setNuevaHuerta] = useState({ nombre: '', descripcion: '', direccion: '' });
  const huertasDisponibles = [
    { id: 1, nombre: 'Huerta El Paraíso', descripcion: 'Huerta orgánica con variedad de cultivos' },
    { id: 2, nombre: 'Huerta Verde', descripcion: 'Especializada en hortalizas' },
    { id: 3, nombre: 'Huerta Urbana', descripcion: 'Huerta en la ciudad con cultivos verticales' },
    { id: 4, nombre: 'EcoHuerta', descripcion: 'Huerta ecológica y sostenible' },
    { id: 5, nombre: 'Huerta Familiar', descripcion: 'Huerta para toda la familia' },
  ];
  
  useEffect(() => {
    console.log('Usuario en Dashboard:', user);
  }, [user]);

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = '/auth';
    }
    setHideHeaderFooter(true);
  }, [isAuthenticated]);

  // Cargar mensajes cuando se selecciona una huerta
  useEffect(() => {
    if (huertaSeleccionada) {
      setMensajes(mensajesEjemplo[huertaSeleccionada.id] || []);
    }
  }, [huertaSeleccionada]);

  useEffect(() => {
    if (editandoTarea && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [editandoTarea, tareaEdit.descripcion]);

  const handleHuertaClick = (huerta) => {
    setHuertaSeleccionada(huerta);
    setShowOpciones(false);
  };

  const handleCerrarHuerta = () => {
    setHuertaSeleccionada(null);
    setMensajes({});
    setNuevoMensaje('');
  };

  const handleEnviarMensaje = () => {
    if (nuevoMensaje.trim() && huertaSeleccionada) {
      const nuevoMensajeObj = {
        id: Date.now(),
        tipo: 'publicacion',
        usuario: `${user.nombre} ${user.apellido}`,
        contenido: nuevoMensaje,
        fecha: new Date().toISOString(),
        avatar: `${user.nombre[0]}${user.apellido[0]}`
      };
      
      setMensajes(prev => [...prev, nuevoMensajeObj]);
      setNuevoMensaje('');
    }
  };

  const handleCrearTarea = () => {
    if (nuevoMensaje.trim() && huertaSeleccionada) {
      const nuevaTarea = {
        id: Date.now(),
        tipo: 'tarea',
        usuario: `${user.nombre} ${user.apellido}`,
        contenido: nuevoMensaje,
        fecha: new Date().toISOString(),
        avatar: `${user.nombre[0]}${user.apellido[0]}`,
        completada: false
      };
      
      setMensajes(prev => [...prev, nuevaTarea]);
      setNuevoMensaje('');
    }
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleTareaClick = (tarea) => {
    setTareaSeleccionada(tarea);
    setShowTareaModal(true);
  };

  const handleCerrarTareaModal = () => {
    setShowTareaModal(false);
    setTareaSeleccionada(null);
  };

  const handleEditarTarea = () => {
    setTareaEdit({
      tarea: tareaSeleccionada.tarea,
      descripcion: tareaSeleccionada.descripcion,
      asignado: tareaSeleccionada.asignado,
      cultivo: tareaSeleccionada.cultivo || 'Tomate cherry',
    });
    setEditandoTarea(true);
  };

  const handleCancelarEdicion = () => {
    setEditandoTarea(false);
  };

  const handleGuardarEdicion = () => {
    // Aquí podrías actualizar el estado global o hacer una petición al backend
    setEditandoTarea(false);
    setTareaSeleccionada({ ...tareaSeleccionada, ...tareaEdit });
  };

  const handleEliminarTarea = () => {
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    setShowConfirmDelete(false);
    setShowTareaModal(false);
    setTareaSeleccionada(null);
    // Aquí podrías eliminar la tarea del estado global o hacer una petición al backend
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
  };

  const handleEliminarMiembro = (miembro) => {
    setMiembroAEliminar(miembro);
    setShowConfirmDeleteMiembro(true);
  };

  const handleConfirmDeleteMiembro = () => {
    setShowConfirmDeleteMiembro(false);
    setMiembroAEliminar(null);
    // Aquí podrías eliminar el miembro del estado global o hacer una petición al backend
  };

  const handleCancelDeleteMiembro = () => {
    setShowConfirmDeleteMiembro(false);
    setMiembroAEliminar(null);
  };

  const handleAbrirCrearTarea = () => {
    setNuevaTarea({ tarea: '', descripcion: '', asignado: miembrosEjemplo[0]?.nombre || '', cultivo: 'Tomate cherry' });
    setShowCrearTarea(true);
  };

  const handleCancelarCrearTarea = () => {
    setShowCrearTarea(false);
  };

  const handleGuardarCrearTarea = () => {
    // Aquí podrías agregar la tarea al estado global o hacer una petición al backend
    setShowCrearTarea(false);
  };

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
            <div className="sidebar-header">
              <h2>HuertaConecta</h2>
            </div>
            <div className="sidebar-top-icons">
              <button className="sidebar-home-btn" onClick={() => navigate('/')}
                title="Volver al inicio">
                <AiOutlineHome size={28} />
              </button>
              <button className="sidebar-new-huerta-btn" onClick={() => setShowCrearHuerta(true)} title="Crear nueva huerta">
                <FiPlus size={26} />
              </button>
              <button className="sidebar-user-btn" onClick={() => setShowProfile(true)} title="Perfil de usuario">
                <FaUserCircle size={28} />
              </button>
            </div>
            <input type="text" className="sidebar-search" placeholder="Buscar huerta..." />
            <div className="sidebar-list">
              {huertasEjemplo.map((huerta) => (
                <div 
                  key={huerta.id} 
                  className={`sidebar-channel ${huertaSeleccionada?.id === huerta.id ? 'active' : ''}`}
                  onClick={() => handleHuertaClick(huerta)}
                >
                  <div className="channel-info">
                    <div className="channel-title">{huerta.nombre}</div>
                    <div className="channel-desc">{huerta.descripcion}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="sidebar-discover-btn" onClick={() => setShowDiscoverPanel(true)}>Descubrir más</button>
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
            <AnimatePresence mode="wait">
              {huertaSeleccionada ? (
                <motion.div
                  key="chat"
                  className="chat-container"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={chatPanelVariants}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {/* Header del chat */}
                  <div className="chat-header">
                    <div className="chat-header-info" style={{ cursor: 'pointer' }} onClick={() => setShowInfoPanel(true)}>
                      <h2>{huertaSeleccionada.nombre}</h2>
                      <p>{huertaSeleccionada.descripcion}</p>
                    </div>
                    <div className="chat-header-actions">
                      <button 
                        className="chat-options-btn"
                        onClick={() => setShowOpciones(!showOpciones)}
                      >
                        <FaEllipsisV />
                      </button>
                      {showOpciones && (
                        <div className="chat-options-menu">
                          <button onClick={handleCerrarHuerta}>
                            <FaTimes /> Cerrar
                          </button>
                          <button>
                            <FaUserCircle /> Abandonar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mensajes */}
                  <div className="chat-messages">
                    {mensajes.length > 0 ? (
                      mensajes.map((mensaje, index) => (
                        <motion.div
                          key={mensaje.id}
                          className={`message ${mensaje.tipo}`}
                          initial={{ opacity: 0, y: 30, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ 
                            duration: 0.4, 
                            delay: index * 0.1,
                            ease: "easeOut"
                          }}
                        >
                          <div className="message-avatar">
                            {mensaje.avatar}
                          </div>
                          <div className="message-content">
                            <div className="message-header">
                              <span className="message-user">{mensaje.usuario}</span>
                              <span className="message-time">{formatearFecha(mensaje.fecha)}</span>
                              {mensaje.tipo === 'tarea' && (
                                <span className={`task-status ${mensaje.completada ? 'completed' : 'pending'}`}>
                                  {mensaje.completada ? '✓ Completada' : '⏳ Pendiente'}
                                </span>
                              )}
                            </div>
                            <div className="message-text">
                              {mensaje.contenido}
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="no-messages">
                        <p>No hay mensajes aún. ¡Sé el primero en publicar!</p>
                      </div>
                    )}
                  </div>

                  {/* Input de mensaje */}
                  <div className="chat-input-container">
                    <div className="chat-input-wrapper chat-input-wrapper--grande">
                      <input
                        type="text"
                        placeholder="Escribe una publicación..."
                        value={nuevoMensaje}
                        onChange={(e) => setNuevoMensaje(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleEnviarMensaje()}
                        className="chat-input chat-input--grande"
                      />
                      <button 
                        className="chat-send-btn"
                        onClick={handleEnviarMensaje}
                        disabled={!nuevoMensaje.trim()}
                      >
                        <AiOutlineSend />
                      </button>
                      <button 
                        className="chat-task-btn"
                        onClick={handleAbrirCrearTarea}
                        title="Crear tarea"
                      >
                        <AiOutlineCheckSquare />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="welcome"
                  className="panel-center"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={chatPanelVariants}
                >
                  <h1>Descubre huertas</h1>
                  <p className="panel-desc">
                    Explora, sigue y conecta con diferentes huertas. <br />
                    ¡Encuentra la inspiración para tu propio cultivo!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
        <Footer hide={hideHeaderFooter} />
      </div>
      <AnimatePresence>
        {showInfoPanel && (
          <motion.aside
            className="huerta-info-panel"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={infoPanelVariants}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <button className="info-panel-close-btn" onClick={() => setShowInfoPanel(false)} title="Cerrar">×</button>
            <h3>{huertaSeleccionada.nombre}</h3>
            <p className="info-desc">{huertaSeleccionada.descripcion}</p>
            <div className="info-section">
              <strong>Ubicación:</strong>
              <p>{huertaSeleccionada.direccion}</p>
            </div>
            <div className="info-section">
              <strong>Miembros:</strong>
              <ul>
                {miembrosEjemplo.map((m, i) => (
                  <li key={i} className="miembro-item">
                    <div className="miembro-content">
                      <span>{m.nombre}</span>
                      <span className="info-rol">{m.rol}</span>
                    </div>
                    <button className="miembro-delete-btn" title="Eliminar miembro" onClick={() => handleEliminarMiembro(m)}><FiTrash2 color="#fff" /></button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="info-section">
              <strong>Tareas:</strong>
              <ul>
                {tareasEjemplo.map((t, i) => (
                  <li key={i} className="tarea-item" onClick={() => handleTareaClick(t)}>
                    <div className="tarea-content">
                      <div className="tarea-header">
                        <span className="tarea-titulo">{t.tarea}</span>
                        <span className={`info-tarea-estado ${t.estado === 'Completada' ? 'completada' : 'pendiente'}`}>{t.estado}</span>
                      </div>
                      <span className="tarea-asignado">Asignado a: {t.asignado}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showTareaModal && tareaSeleccionada && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCerrarTareaModal}
          >
            <motion.div
              className="tarea-modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              
              <div className="modal-header">
                <h2>{tareaSeleccionada.tarea}</h2>
                <div className="modal-header-actions">
                  <span className={`modal-estado ${tareaSeleccionada.estado === 'Completada' ? 'completada' : 'pendiente'}`}>
                    {tareaSeleccionada.estado}
                  </span>
                  <button className="modal-edit-btn" title="Editar tarea" onClick={handleEditarTarea}><FiEdit color="#fff" /></button>
                  <button className="modal-delete-btn" title="Eliminar tarea" onClick={handleEliminarTarea}><FiTrash2 color="#fff" /></button>
                  <button className="modal-close-btn" onClick={handleCerrarTareaModal}>×</button>
                </div>
              </div>

              {editandoTarea ? (
                <div className="tarea-modal-content">
                  <div className="modal-section">
                    <h3>Título</h3>
                    <input className="modal-input" value={tareaEdit.tarea} onChange={e => setTareaEdit({ ...tareaEdit, tarea: e.target.value })} />
                  </div>
                  <div className="modal-section">
                    <h3>Descripción</h3>
                    <textarea
                      ref={textareaRef}
                      className="modal-input"
                      value={tareaEdit.descripcion}
                      onChange={e => setTareaEdit({ ...tareaEdit, descripcion: e.target.value })}
                      onInput={e => {
                        e.target.style.height = 'auto';
                        e.target.style.height = e.target.scrollHeight + 'px';
                      }}
                    />
                  </div>
                  <div className="modal-section">
                    <h3>Asignado a</h3>
                    <select className="modal-input" value={tareaEdit.asignado} onChange={e => setTareaEdit({ ...tareaEdit, asignado: e.target.value })}>
                      {miembrosEjemplo.map((m, idx) => (
                        <option key={idx} value={m.nombre}>{m.nombre}</option>
                      ))}
                    </select>
                  </div>
                  <div className="modal-section">
                    <h3>Cultivo destacado</h3>
                    <select className="modal-input" value={tareaEdit.cultivo} onChange={e => setTareaEdit({ ...tareaEdit, cultivo: e.target.value })}>
                      {cultivosEjemplo.map((c, idx) => (
                        <option key={idx} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="modal-edit-actions">
                    <button className="modal-save-btn" onClick={handleGuardarEdicion}>Guardar</button>
                    <button className="modal-cancel-btn" onClick={handleCancelarEdicion}>Cancelar</button>
                  </div>
                </div>
              ) : (
                <div className="tarea-modal-content">
                  <div className="modal-section">
                    <h3>Título</h3>
                    <p>{tareaSeleccionada.tarea}</p>
                  </div>
                  <div className="modal-section">
                    <h3>Descripción</h3>
                    <p>{tareaSeleccionada.descripcion}</p>
                  </div>
                  <div className="modal-section">
                    <h3>Asignado a</h3>
                    <p>{tareaSeleccionada.asignado}</p>
                  </div>
                  <div className="modal-section">
                    <h3>Cultivo destacado</h3>
                    <p>{tareaSeleccionada.cultivo || 'Tomate cherry'}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showConfirmDelete && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="confirm-modal" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <h3>¿Eliminar tarea?</h3>
              <p>¿Estás seguro de que deseas eliminar esta tarea? Esta acción no se puede deshacer.</p>
              <div className="confirm-actions">
                <button className="modal-cancel-btn" onClick={handleCancelDelete}>Cancelar</button>
                <button className="modal-delete-btn" onClick={handleConfirmDelete}>Eliminar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showConfirmDeleteMiembro && miembroAEliminar && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="confirm-modal" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <h3>¿Eliminar miembro?</h3>
              <p>¿Estás seguro de que deseas eliminar a <b>{miembroAEliminar.nombre}</b>? Esta acción no se puede deshacer.</p>
              <div className="confirm-actions">
                <button className="modal-cancel-btn" onClick={handleCancelDeleteMiembro}>Cancelar</button>
                <button className="modal-delete-btn" onClick={handleConfirmDeleteMiembro}>Eliminar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showCrearTarea && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="tarea-modal" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <div className="modal-header">
                <h2>Nueva tarea</h2>
                <button className="modal-close-btn" onClick={handleCancelarCrearTarea}>×</button>
              </div>
              <div className="tarea-modal-content">
                <div className="modal-section">
                  <h3>Título</h3>
                  <input className="modal-input" value={nuevaTarea.tarea} onChange={e => setNuevaTarea({ ...nuevaTarea, tarea: e.target.value })} />
                </div>
                <div className="modal-section">
                  <h3>Descripción</h3>
                  <textarea className="modal-input" value={nuevaTarea.descripcion} onChange={e => setNuevaTarea({ ...nuevaTarea, descripcion: e.target.value })} />
                </div>
                <div className="modal-section">
                  <h3>Asignado a</h3>
                  <select className="modal-input" value={nuevaTarea.asignado} onChange={e => setNuevaTarea({ ...nuevaTarea, asignado: e.target.value })}>
                    {miembrosEjemplo.map((m, idx) => (
                      <option key={idx} value={m.nombre}>{m.nombre}</option>
                    ))}
                  </select>
                </div>
                <div className="modal-section">
                  <h3>Cultivo destacado</h3>
                  <select className="modal-input" value={nuevaTarea.cultivo} onChange={e => setNuevaTarea({ ...nuevaTarea, cultivo: e.target.value })}>
                    {cultivosEjemplo.map((c, idx) => (
                      <option key={idx} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="modal-edit-actions">
                  <button className="modal-save-btn" onClick={handleGuardarCrearTarea}>Crear</button>
                  <button className="modal-cancel-btn" onClick={handleCancelarCrearTarea}>Cancelar</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showDiscoverPanel && (
          <motion.div
            className="sidebar-discover-panel"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.32 }}
          >
            <button className="profile-close-btn" onClick={() => setShowDiscoverPanel(false)} title="Cerrar">×</button>
            <h3 className="discover-title">Todas las huertas</h3>
            <ul className="discover-list">
              {huertasDisponibles.map((h) => (
                <li key={h.id} className="discover-item">
                  <div className="discover-nombre">{h.nombre}</div>
                  <div className="discover-desc">{h.descripcion}</div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showCrearHuerta && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="tarea-modal" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <div className="modal-header">
                <h2>Nueva huerta</h2>
                <button className="modal-close-btn" onClick={() => setShowCrearHuerta(false)}>×</button>
              </div>
              <div className="tarea-modal-content">
                <div className="modal-section">
                  <h3>Nombre de la huerta</h3>
                  <input className="modal-input" value={nuevaHuerta.nombre} onChange={e => setNuevaHuerta({ ...nuevaHuerta, nombre: e.target.value })} />
                </div>
                <div className="modal-section">
                  <h3>Descripción</h3>
                  <textarea className="modal-input" value={nuevaHuerta.descripcion} onChange={e => setNuevaHuerta({ ...nuevaHuerta, descripcion: e.target.value })} />
                </div>
                <div className="modal-section">
                  <h3>Dirección de la huerta</h3>
                  <input className="modal-input" value={nuevaHuerta.direccion} onChange={e => setNuevaHuerta({ ...nuevaHuerta, direccion: e.target.value })} />
                </div>
                <div className="modal-edit-actions">
                  <button className="modal-save-btn" onClick={() => setShowCrearHuerta(false)}>Crear</button>
                  <button className="modal-cancel-btn" onClick={() => setShowCrearHuerta(false)}>Cancelar</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Dashboard; 