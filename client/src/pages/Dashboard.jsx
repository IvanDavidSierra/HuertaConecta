import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { useHuerta } from '../context/HuertaContext.tsx';
import { useUsuariosHuertas } from '../context/UsuariosHuertasContext.tsx';
import { useTipoUsuario } from '../context/TipoUsuarioContext.tsx';
import { useTarea } from '../context/TareaContext.tsx';
import { useCultivo } from '../context/CultivoContext';
import { usePublicacion } from '../context/PublicacionContext.tsx';
import { useToast } from '../context/ToastContext.tsx';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { AiOutlineHome, AiOutlineSend, AiOutlineCheckSquare } from 'react-icons/ai';
import { FaUserCircle, FaEllipsisV, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader';
import { motion, AnimatePresence } from 'framer-motion';
import './Dashboard.css';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';


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
  const { user, isAuthenticated, logout, updateUser } = useAuth();
  const { huertas, loading: huertasLoading, error: huertasError, fetchHuertas, createHuerta } = useHuerta();
  const { fetchUsuariosHuertas, fetchUsuariosHuertasByUserId } = useUsuariosHuertas();
  const { tiposUsuario } = useTipoUsuario();
  const { tareas, estadosTareas, loading: tareasLoading, createTarea, updateTarea, deleteTarea, fetchTareasByUsuarioHuerta, fetchTareasByHuerta, updateEstadoTarea } = useTarea();
  const { cultivos } = useCultivo();
  const { createPublicacion, fetchPublicacionesByHuertaId } = usePublicacion();
  const { showToast } = useToast();
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
  const [nuevaTarea, setNuevaTarea] = useState({ 
    titulo: '', 
    descripcion: '', 
    fecha_inicio: new Date().toISOString().split('T')[0],
    fecha_fin: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    id_estado_tarea: 1, // Pendiente por defecto
    id_cultivo: 1,
    id_usuarios_huertas: 0
  });
  const [showCrearPublicacion, setShowCrearPublicacion] = useState(false);
  const [nuevaPublicacion, setNuevaPublicacion] = useState({
    titulo_post: '',
    contenido_post: ''
  });
  const [showDiscoverPanel, setShowDiscoverPanel] = useState(false);
  const [showCrearHuerta, setShowCrearHuerta] = useState(false);
  const [nuevaHuerta, setNuevaHuerta] = useState({ nombre: '', descripcion: '', direccion: '' });
  const [creandoHuerta, setCreandoHuerta] = useState(false);
  const [misHuertas, setMisHuertas] = useState([]);
  const [loadingMisHuertas, setLoadingMisHuertas] = useState(false);
  const [huertaErrors, setHuertaErrors] = useState({});
  const [miembrosHuerta, setMiembrosHuerta] = useState([]);
  const [loadingMiembros, setLoadingMiembros] = useState(false);
  const [tareasHuerta, setTareasHuerta] = useState([]);
  const [loadingTareas, setLoadingTareas] = useState(false);
  const feedRef = useRef(null);
  
  console.log('huertaSeleccionada (detallado):', huertaSeleccionada, typeof huertaSeleccionada);

  useEffect(() => {
    console.log('Usuario en Dashboard:', user);
  }, [user]);

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = '/auth';
    }
    setHideHeaderFooter(true);
  }, [isAuthenticated]);

  // Cargar las huertas del usuario actual
  useEffect(() => {
    const cargarMisHuertas = async () => {
      if (user && user.id_usuario) {
        setLoadingMisHuertas(true);
        try {
          const huertasUsuario = await fetchUsuariosHuertasByUserId(user.id_usuario);
          setMisHuertas(huertasUsuario);
        } catch (error) {
          console.error('Error al cargar mis huertas:', error);
        } finally {
          setLoadingMisHuertas(false);
        }
      }
    };

    cargarMisHuertas();
  }, [user, fetchUsuariosHuertasByUserId]);

  // Cargar mensajes cuando se selecciona una huerta
  useEffect(() => {
    const cargarFeed = async () => {
      if (huertaSeleccionada) {
        // 1. Cargar publicaciones reales de la huerta usando el contexto
        let publicaciones = [];
        try {
          publicaciones = await fetchPublicacionesByHuertaId(huertaSeleccionada.id_huerta);
        } catch (e) {
          console.error('Error al cargar publicaciones:', e);
          publicaciones = [];
        }

        // 2. Mapear tareas al formato de mensaje
        const tareasComoMensajes = tareasHuerta.map(tarea => ({
          id: tarea.id_tarea,
          tipo: 'tarea',
          usuario: tarea.usuario_huerta?.id_usuario?.nombre + ' ' + tarea.usuario_huerta?.id_usuario?.apellido,
          titulo: tarea.titulo,
          contenido: tarea.descripcion,
          fecha: tarea.fecha_creacion || tarea.fecha_inicio,
          avatar: (tarea.usuario_huerta?.id_usuario?.nombre?.[0] || '') + (tarea.usuario_huerta?.id_usuario?.apellido?.[0] || ''),
          estado: tarea.estado_tarea?.descripcion_estado_tarea || 'Pendiente'
        }));

        // 3. Mapear publicaciones al formato de mensaje
        const publicacionesComoMensajes = publicaciones.map(pub => ({
          id: pub.id_publicacion,
          tipo: pub.titulo_post.startsWith('Mensaje_') ? 'mensaje' : 'publicacion',
          usuario: pub.id_usuarios_huertas?.id_usuario?.nombre + ' ' + pub.id_usuarios_huertas?.id_usuario?.apellido,
          titulo: pub.titulo_post.startsWith('Mensaje_') ? 'Mensaje' : pub.titulo_post,
          contenido: pub.contenido_post,
          fecha: pub.fecha_post,
          avatar: (pub.id_usuarios_huertas?.id_usuario?.nombre?.[0] || '') + (pub.id_usuarios_huertas?.id_usuario?.apellido?.[0] || '')
        }));

        // 4. Unir y ordenar por fecha
        const feed = [...tareasComoMensajes, ...publicacionesComoMensajes].sort(
          (a, b) => new Date(a.fecha) - new Date(b.fecha)
        );

        setMensajes(feed);
      }
    };

    cargarFeed();
  }, [huertaSeleccionada, tareasHuerta, fetchPublicacionesByHuertaId]);

  useEffect(() => {
    if (editandoTarea && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [editandoTarea, tareaEdit.descripcion]);

  // Cuando se abre el panel de información, obtener los miembros reales de la huerta
  useEffect(() => {
    const fetchMiembrosHuerta = async () => {
      if (showInfoPanel && huertaSeleccionada?.id_huerta) {
        setLoadingMiembros(true);
        try {
          const res = await fetch(`/api/usuarios-huertas/huerta/${huertaSeleccionada.id_huerta}`);
          const data = await res.json();
          console.log('Miembros de la huerta:', data);
          if (Array.isArray(data)) {
            setMiembrosHuerta(data);
          } else {
            setMiembrosHuerta([]);
          }
        } catch (error) {
          console.error('Error al obtener miembros de la huerta:', error);
          setMiembrosHuerta([]);
        } finally {
          setLoadingMiembros(false);
        }
      }
    };
    fetchMiembrosHuerta();
  }, [showInfoPanel, huertaSeleccionada]);

  // Cargar tareas de la huerta cuando se selecciona
  useEffect(() => {
    const fetchTareasHuerta = async () => {
      if (huertaSeleccionada?.id_huerta) {
        setLoadingTareas(true);
        try {
          // Obtener todas las tareas de la huerta
          const tareas = await fetchTareasByHuerta(huertaSeleccionada.id_huerta);
          setTareasHuerta(tareas);
          // Buscar la tarea editada y setearla como seleccionada para actualizar el modal
          if (tareaSeleccionada) {
            const tareaActualizada = tareas.find(t => t.id_tarea === tareaSeleccionada.id_tarea);
            if (tareaActualizada) setTareaSeleccionada(tareaActualizada);
          }
        } catch (error) {
          console.error('Error al obtener tareas de la huerta:', error);
          setTareasHuerta([]);
        } finally {
          setLoadingTareas(false);
        }
      }
    };
    fetchTareasHuerta();
  }, [huertaSeleccionada, fetchTareasByHuerta]);

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [mensajes]);

  // Función para verificar si el usuario es propietario de la huerta seleccionada
  const esPropietarioDeHuerta = () => {
    if (!user || !huertaSeleccionada) return false;
    
    const relacionUsuarioHuerta = misHuertas.find(
      h => h.id_huerta?.id_huerta === huertaSeleccionada.id_huerta
    );
    
    return relacionUsuarioHuerta?.id_usuario?.id_tipo_usuario?.descripcion_tipo_usuario?.toLowerCase().includes('propietario');
  };

  const handleHuertaClick = (huerta) => {
    // Si viene de usuarios_huertas, extrae el objeto huerta
    const huertaObj = huerta.id_huerta ? huerta : (huerta.id_huerta ? huerta.id_huerta : huerta);
    setHuertaSeleccionada(huertaObj);
    setShowDiscoverPanel(false);
    setShowOpciones(false);
  };

  const handleCerrarHuerta = () => {
    setHuertaSeleccionada(null);
    setMensajes({});
    setNuevoMensaje('');
  };

  const handleEnviarMensaje = async () => {
    if (nuevoMensaje.trim() && huertaSeleccionada) {
      try {
        // Obtener la relación usuario-huerta para el usuario actual
        const relacionUsuarioHuerta = misHuertas.find(
          h => h.id_huerta?.id_huerta === huertaSeleccionada.id_huerta
        );

        if (!relacionUsuarioHuerta) {
          showToast('No tienes permisos para enviar mensajes en esta huerta', 'error');
          return;
        }

        // Crear la publicación con el mensaje
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(2, 8);
        const tituloUnico = `Mensaje_${timestamp}_${randomId}`;
        
        const publicacionData = {
          titulo_post: tituloUnico,
          contenido_post: nuevoMensaje,
          id_usuarios_huertas: relacionUsuarioHuerta.id_usuarios_huertas
        };

        console.log('Datos a enviar al backend:', publicacionData);
        console.log('Relación usuario-huerta encontrada:', relacionUsuarioHuerta);

        const result = await createPublicacion(publicacionData);
        
        if (result.success) {
          // Limpiar el input
          setNuevoMensaje('');
          
          // Recargar publicaciones y actualizar el feed
          const publicaciones = await fetchPublicacionesByHuertaId(huertaSeleccionada.id_huerta);
          
          // Mapear publicaciones al formato de mensaje
          const publicacionesComoMensajes = publicaciones.map(pub => ({
            id: pub.id_publicacion,
            tipo: pub.titulo_post.startsWith('Mensaje_') ? 'mensaje' : 'publicacion',
            usuario: pub.id_usuarios_huertas?.id_usuario?.nombre + ' ' + pub.id_usuarios_huertas?.id_usuario?.apellido,
            titulo: pub.titulo_post.startsWith('Mensaje_') ? 'Mensaje' : pub.titulo_post,
            contenido: pub.contenido_post,
            fecha: pub.fecha_post,
            avatar: (pub.id_usuarios_huertas?.id_usuario?.nombre?.[0] || '') + (pub.id_usuarios_huertas?.id_usuario?.apellido?.[0] || '')
          }));

          // Mapear tareas al formato de mensaje
          const tareasComoMensajes = tareasHuerta.map(tarea => ({
            id: tarea.id_tarea,
            tipo: 'tarea',
            usuario: tarea.usuario_huerta?.id_usuario?.nombre + ' ' + tarea.usuario_huerta?.id_usuario?.apellido,
            titulo: tarea.titulo,
            contenido: tarea.descripcion,
            fecha: tarea.fecha_creacion || tarea.fecha_inicio,
            avatar: (tarea.usuario_huerta?.id_usuario?.nombre?.[0] || '') + (tarea.usuario_huerta?.id_usuario?.apellido?.[0] || ''),
            estado: tarea.estado_tarea?.descripcion_estado_tarea || 'Pendiente'
          }));

          // Unir y ordenar por fecha
          const feed = [...tareasComoMensajes, ...publicacionesComoMensajes].sort(
            (a, b) => new Date(a.fecha) - new Date(b.fecha)
          );

          setMensajes(feed);
        } else {
          showToast(`Error al enviar mensaje: ${result.error}`, 'error');
        }
      } catch (error) {
        console.error('Error al enviar mensaje:', error);
        showToast('Error al enviar mensaje', 'error');
      }
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

  const getEstadoTarea = (estado) => {
    const estadoLower = estado?.toLowerCase() || 'pendiente';
    
    if (estadoLower.includes('completada') || estadoLower.includes('finalizada')) {
      return { emoji: '✅', texto: 'Completada', clase: 'completed' };
    } else if (estadoLower.includes('en progreso') || estadoLower.includes('progreso')) {
      return { emoji: '🔄', texto: 'En Progreso', clase: 'en-progreso' };
    } else if (estadoLower.includes('cancelada') || estadoLower.includes('cancelada')) {
      return { emoji: '❌', texto: 'Cancelada', clase: 'cancelada' };
    } else {
      return { emoji: '⏳', texto: 'Pendiente', clase: 'pending' };
    }
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
      titulo: tareaSeleccionada.titulo,
      descripcion: tareaSeleccionada.descripcion,
      fecha_inicio: tareaSeleccionada.fecha_inicio.split('T')[0],
      fecha_fin: tareaSeleccionada.fecha_fin.split('T')[0],
      id_estado_tarea: tareaSeleccionada.id_estado_tarea,
      id_cultivo: tareaSeleccionada.id_cultivo,
    });
    setEditandoTarea(true);
  };

  const handleCancelarEdicion = () => {
    setEditandoTarea(false);
  };

  const handleGuardarEdicion = async () => {
    if (!tareaEdit.titulo?.trim() || !tareaEdit.descripcion?.trim()) {
      showToast('Por favor completa todos los campos', 'error');
      return;
    }

    try {
      const result = await updateTarea(tareaSeleccionada.id_tarea, {
        ...tareaEdit,
        id_usuarios_huertas: tareaSeleccionada.id_usuarios_huertas
      });
      
      if (result.success) {
        showToast('Tarea actualizada exitosamente', 'success');
        setEditandoTarea(false);
        setTareaSeleccionada({ ...tareaSeleccionada, ...tareaEdit });
        // Recargar tareas
        const tareas = await fetchTareasByHuerta(huertaSeleccionada.id_huerta);
        console.log('Tareas tras actualizar tarea:', tareas);
        setTareasHuerta(tareas);
      } else {
        showToast(`Error al actualizar tarea: ${result.error}`, 'error');
      }
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
      showToast('Error al actualizar tarea', 'error');
    }
  };

  const handleEliminarTarea = () => {
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const result = await deleteTarea(tareaSeleccionada.id_tarea);
      
      if (result.success) {
        showToast('Tarea eliminada exitosamente', 'success');
        setShowConfirmDelete(false);
        setShowTareaModal(false);
        setTareaSeleccionada(null);
        // Recargar tareas
        const tareas = await fetchTareasByHuerta(huertaSeleccionada.id_huerta);
        setTareasHuerta(tareas);
      } else {
        showToast(`Error al eliminar tarea: ${result.error}`, 'error');
      }
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
      showToast('Error al eliminar tarea', 'error');
    }
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
    setNuevaTarea({ 
      titulo: '', 
      descripcion: '', 
      fecha_inicio: new Date().toISOString().split('T')[0],
      fecha_fin: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      id_estado_tarea: 1, // Pendiente por defecto
      id_cultivo: 1,
      id_usuarios_huertas: 0
    });
    setShowCrearTarea(true);
  };

  const handleCancelarCrearTarea = () => {
    setShowCrearTarea(false);
  };

  const handleGuardarCrearTarea = async () => {
    if (!nuevaTarea.titulo.trim() || !nuevaTarea.descripcion.trim()) {
      showToast('Por favor completa todos los campos', 'error');
      return;
    }

    try {
      // Obtener la relación usuario-huerta para el usuario actual
      const relacionUsuarioHuerta = misHuertas.find(
        h => h.id_huerta?.id_huerta === huertaSeleccionada.id_huerta
      );

      if (!relacionUsuarioHuerta) {
        showToast('No tienes permisos para crear tareas en esta huerta', 'error');
        return;
      }

      const tareaData = {
        ...nuevaTarea,
        id_usuarios_huertas: relacionUsuarioHuerta.id_usuarios_huertas
      };

      console.log('Datos de tarea a enviar:', tareaData);
      console.log('ID de cultivo seleccionado:', tareaData.id_cultivo, typeof tareaData.id_cultivo);

      const result = await createTarea(tareaData);
      
      if (result.success) {
        showToast('Tarea creada exitosamente', 'success');
        setShowCrearTarea(false);
        // Recargar tareas
        const tareas = await fetchTareasByHuerta(huertaSeleccionada.id_huerta);
        setTareasHuerta(tareas);
        // Agregar como mensaje en el chat
        const nuevaTareaMensaje = {
          id: Date.now(),
          tipo: 'tarea',
          usuario: `${user.nombre} ${user.apellido}`,
          contenido: `Nueva tarea: ${nuevaTarea.titulo}`,
          fecha: new Date().toISOString(),
          avatar: `${user.nombre[0]}${user.apellido[0]}`,
          completada: false
        };
        setMensajes(prev => [...prev, nuevaTareaMensaje]);
      } else {
        showToast(`Error al crear tarea: ${result.error}`, 'error');
      }
    } catch (error) {
      console.error('Error al crear tarea:', error);
      showToast('Error al crear tarea', 'error');
    }
  };

  const handleCancelarCrearHuerta = () => {
    setShowCrearHuerta(false);
    setNuevaHuerta({ nombre: '', descripcion: '', direccion: '' });
    setHuertaErrors({});
  };

  const handleHuertaInputChange = (field, value) => {
    setNuevaHuerta({ ...nuevaHuerta, [field]: value });
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (huertaErrors[field]) {
      setHuertaErrors({ ...huertaErrors, [field]: null });
    }
  };

  const validateHuerta = () => {
    const newErrors = {};
    if (nuevaHuerta.nombre.trim().length < 10) {
      newErrors.nombre = 'El nombre debe tener al menos 10 caracteres';
    }
    if (nuevaHuerta.descripcion.trim().length < 20) {
      newErrors.descripcion = 'La descripción debe tener al menos 20 caracteres';
    }
    if (nuevaHuerta.direccion.trim().length < 5) {
      newErrors.direccion = 'La dirección debe tener al menos 5 caracteres';
    }
    return newErrors;
  };

  const handleCrearHuerta = async () => {
    const validationErrors = validateHuerta();
    setHuertaErrors(validationErrors);
    
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setCreandoHuerta(true);
    try {
      // Crear la huerta
      const huertaData = {
        nombre_huerta: nuevaHuerta.nombre,
        descripcion: nuevaHuerta.descripcion,
        direccion_huerta: nuevaHuerta.direccion,
        fecha_creacion: new Date().toISOString().split('T')[0]
      };

      const result = await createHuerta(huertaData);
      
      if (result.success) {
        // Vincular al usuario como propietario de la huerta
        const huertaId = result.data.huertaId;
        await fetch('/api/usuarios-huertas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id_usuario: user.id_usuario,
            id_huerta: huertaId,
            fecha_vinculacion: new Date().toISOString().split('T')[0]
          }),
        });

        // Actualizar las listas
        await fetchHuertas();
        await fetchUsuariosHuertas();
        
        // Actualizar mis huertas
        const huertasUsuario = await fetchUsuariosHuertasByUserId(user.id_usuario);
        setMisHuertas(huertasUsuario);
        
        // Cambiar el rol del usuario a propietario
        const propietarioTipo = tiposUsuario.find(tipo => 
          tipo.descripcion_tipo_usuario.toLowerCase().includes('propietario')
        );
        
        if (propietarioTipo && user.id_tipo_usuario !== propietarioTipo.id_tipo_usuario) {
          const updateResult = await updateUser({
            id_usuario: user.id_usuario,
            id_tipo_usuario: propietarioTipo.id_tipo_usuario
          });
          
          if (updateResult.success) {
            console.log('Rol actualizado a propietario exitosamente');
            showToast('¡Rol actualizado a propietario exitosamente!', 'success');
          } else {
            console.error('Error al actualizar rol:', updateResult.error);
            showToast('Huerta creada pero no se pudo actualizar el rol. Contacta al administrador.', 'warning');
          }
        }
        
        // Limpiar formulario y cerrar modal
        setNuevaHuerta({ nombre: '', descripcion: '', direccion: '' });
        setHuertaErrors({});
        setShowCrearHuerta(false);
        
        // Mostrar mensaje de éxito (podríamos usar un toast aquí)
        console.log('¡Huerta creada exitosamente! Ya eres el propietario.');
        showToast('¡Huerta creada exitosamente! Ya eres el propietario.', 'success');
      } else {
        setHuertaErrors({ general: result.error });
        showToast(`Error al crear la huerta: ${result.error}`, 'error');
      }
    } catch (error) {
      console.error('Error al crear huerta:', error);
      const errorMessage = 'Error al crear la huerta. Por favor intenta de nuevo.';
      setHuertaErrors({ general: errorMessage });
      showToast(errorMessage, 'error');
    } finally {
      setCreandoHuerta(false);
    }
  };

  const handleAbrirCrearHuerta = () => {
    setShowCrearHuerta(true);
    setNuevaHuerta({ nombre: '', descripcion: '', direccion: '' });
    setHuertaErrors({});
  };

  // Unirse a una huerta
  const handleUnirseHuerta = async (huerta) => {
    if (!user) return;
    try {
      // Insertar en usuarios_huertas
      await fetch('/api/usuarios-huertas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_usuario: user.id_usuario,
          id_huerta: huerta.id_huerta,
          fecha_vinculacion: new Date().toISOString().split('T')[0]
        }),
      });
      // Si el usuario es invitado, cambiar a miembro
      const miembroTipo = tiposUsuario.find(tipo => tipo.descripcion_tipo_usuario.toLowerCase().includes('miembro'));
      if (miembroTipo && user.id_tipo_usuario !== miembroTipo.id_tipo_usuario) {
        await updateUser({
          id_usuario: user.id_usuario,
          id_tipo_usuario: miembroTipo.id_tipo_usuario
        });
      }
      // Actualizar listas
      await fetchHuertas();
      await fetchUsuariosHuertas();
      const huertasUsuario = await fetchUsuariosHuertasByUserId(user.id_usuario);
      setMisHuertas(huertasUsuario);
      showToast('¡Te has unido a la huerta!', 'success');
    } catch (error) {
      showToast('Error al unirse a la huerta', 'error');
    }
  };

  // Abandonar una huerta
  const handleAbandonarHuerta = async (huerta) => {
    if (!user) return;
    try {
      // Buscar la relación usuario-huerta
      const relacion = misHuertas.find(uh => uh.id_huerta.id_huerta === huerta.id_huerta);
      if (!relacion) return;
      // Eliminar la relación
      await fetch(`/api/usuarios-huertas/${relacion.id_usuarios_huertas}`, {
        method: 'DELETE',
      });
      // Actualizar listas
      await fetchHuertas();
      await fetchUsuariosHuertas();
      const huertasUsuario = await fetchUsuariosHuertasByUserId(user.id_usuario);
      setMisHuertas(huertasUsuario);
      // Si el usuario no tiene más huertas, cambiar a invitado
      if (huertasUsuario.length === 0) {
        const invitadoTipo = tiposUsuario.find(tipo => tipo.descripcion_tipo_usuario.toLowerCase().includes('invitado'));
        if (invitadoTipo && user.id_tipo_usuario !== invitadoTipo.id_tipo_usuario) {
          await updateUser({
            id_usuario: user.id_usuario,
            id_tipo_usuario: invitadoTipo.id_tipo_usuario
          });
        }
      }
      setHuertaSeleccionada(null);
      showToast('Has abandonado la huerta', 'info');
    } catch (error) {
      showToast('Error al abandonar la huerta', 'error');
    }
  };

  const handleCambiarEstadoTarea = async (nuevoEstadoId) => {
    try {
      const result = await updateEstadoTarea(tareaSeleccionada.id_tarea, nuevoEstadoId);
      
      if (result.success) {
        showToast('Estado de tarea actualizado exitosamente', 'success');
        // Actualizar el estado local
        const nuevoEstado = estadosTareas.find(e => e.id_estado_tarea === nuevoEstadoId);
        setTareaSeleccionada({ 
          ...tareaSeleccionada, 
          id_estado_tarea: nuevoEstadoId,
          estado_tarea: nuevoEstado
        });
        // Recargar tareas
        const tareas = await fetchTareasByHuerta(huertaSeleccionada.id_huerta);
        console.log('Tareas tras actualizar estado:', tareas);
        setTareasHuerta(tareas);
      } else {
        showToast(`Error al actualizar estado: ${result.error}`, 'error');
      }
    } catch (error) {
      console.error('Error al actualizar estado de tarea:', error);
      showToast('Error al actualizar estado de tarea', 'error');
    }
  };

  // Funciones para manejar publicaciones
  const handleAbrirCrearPublicacion = () => {
    setNuevaPublicacion({
      titulo_post: '',
      contenido_post: ''
    });
    setShowCrearPublicacion(true);
  };

  const handleCancelarCrearPublicacion = () => {
    setShowCrearPublicacion(false);
  };

  const handleGuardarCrearPublicacion = async () => {
    if (!nuevaPublicacion.titulo_post.trim() || !nuevaPublicacion.contenido_post.trim()) {
      showToast('Por favor completa todos los campos', 'error');
      return;
    }

    try {
      // Obtener la relación usuario-huerta para el usuario actual
      const relacionUsuarioHuerta = misHuertas.find(
        h => h.id_huerta?.id_huerta === huertaSeleccionada.id_huerta
      );

      if (!relacionUsuarioHuerta) {
        showToast('No tienes permisos para crear publicaciones en esta huerta', 'error');
        return;
      }

      const publicacionData = {
        ...nuevaPublicacion,
        id_usuarios_huertas: relacionUsuarioHuerta.id_usuarios_huertas
      };

      console.log('Datos de publicación a enviar:', publicacionData);

      const result = await createPublicacion(publicacionData);
      
      if (result.success) {
        showToast('Publicación creada exitosamente', 'success');
        setShowCrearPublicacion(false);
        
        // Recargar publicaciones y actualizar el feed
        const publicaciones = await fetchPublicacionesByHuertaId(huertaSeleccionada.id_huerta);
        
        // Mapear publicaciones al formato de mensaje
        const publicacionesComoMensajes = publicaciones.map(pub => ({
          id: pub.id_publicacion,
          tipo: pub.titulo_post.startsWith('Mensaje_') ? 'mensaje' : 'publicacion',
          usuario: pub.id_usuarios_huertas?.id_usuario?.nombre + ' ' + pub.id_usuarios_huertas?.id_usuario?.apellido,
          titulo: pub.titulo_post.startsWith('Mensaje_') ? 'Mensaje' : pub.titulo_post,
          contenido: pub.contenido_post,
          fecha: pub.fecha_post,
          avatar: (pub.id_usuarios_huertas?.id_usuario?.nombre?.[0] || '') + (pub.id_usuarios_huertas?.id_usuario?.apellido?.[0] || '')
        }));

        // Mapear tareas al formato de mensaje
        const tareasComoMensajes = tareasHuerta.map(tarea => ({
          id: tarea.id_tarea,
          tipo: 'tarea',
          usuario: tarea.usuario_huerta?.id_usuario?.nombre + ' ' + tarea.usuario_huerta?.id_usuario?.apellido,
          titulo: tarea.titulo,
          contenido: tarea.descripcion,
          fecha: tarea.fecha_creacion || tarea.fecha_inicio,
          avatar: (tarea.usuario_huerta?.id_usuario?.nombre?.[0] || '') + (tarea.usuario_huerta?.id_usuario?.apellido?.[0] || ''),
          estado: tarea.estado_tarea?.descripcion_estado_tarea || 'Pendiente'
        }));

        // Unir y ordenar por fecha
        const feed = [...tareasComoMensajes, ...publicacionesComoMensajes].sort(
          (a, b) => new Date(a.fecha) - new Date(b.fecha)
        );

        setMensajes(feed);
      } else {
        showToast(`Error al crear publicación: ${result.error}`, 'error');
      }
    } catch (error) {
      console.error('Error al crear publicación:', error);
      showToast('Error al crear publicación', 'error');
    }
  };

  if (!user) {
    return <Loader />;
  }

  console.log('miembrosHuerta:', miembrosHuerta);

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
              <button className="sidebar-new-huerta-btn" onClick={handleAbrirCrearHuerta} title="Crear nueva huerta">
                <FiPlus size={26} />
              </button>
              <button className="sidebar-user-btn" onClick={() => setShowProfile(true)} title="Perfil de usuario">
                <FaUserCircle size={28} />
              </button>
            </div>
            <input type="text" className="sidebar-search" placeholder="Buscar huerta..." />
            <div className="sidebar-list">
              {loadingMisHuertas ? (
                <div className="sidebar-loading">
                  <Loader />
                  <p>Cargando mis huertas...</p>
                </div>
              ) : misHuertas.length === 0 ? (
                <div className="sidebar-empty-state">
                  <div className="empty-state-icon">🌱</div>
                  <h3>¡Bienvenido a HuertaConecta!</h3>
                  <p>No tienes huertas aún. ¡Crea tu primera huerta y comienza tu aventura de cultivo!</p>
                  <button 
                    className="create-huerta-btn"
                    onClick={handleAbrirCrearHuerta}
                  >
                    <FiPlus size={20} />
                    Crear mi primera huerta
                  </button>
                </div>
              ) : (
                misHuertas.map((usuarioHuerta) => {
                  const huerta = usuarioHuerta.id_huerta ? usuarioHuerta.id_huerta : usuarioHuerta;
                  return (
                    <div 
                      key={usuarioHuerta.id_usuarios_huertas || huerta.id_huerta} 
                      className={`sidebar-channel ${huertaSeleccionada?.id_huerta === huerta.id_huerta ? 'active' : ''}`}
                      onClick={() => handleHuertaClick(huerta)}
                    >
                      <div className="channel-info">
                        <div className="channel-title">{huerta.nombre_huerta}</div>
                        <div className="channel-desc">{huerta.descripcion}</div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <button className="sidebar-discover-btn" onClick={() => setShowDiscoverPanel(true)}>Descubrir huertas</button>
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
                      <h2>{huertaSeleccionada?.nombre_huerta}</h2>
                      <p>{huertaSeleccionada?.descripcion}</p>
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
                          <button onClick={() => handleAbandonarHuerta(huertaSeleccionada)}>
                            <FaUserCircle /> Abandonar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mensajes */}
                  <div className="feed-mensajes" ref={feedRef} style={{ overflowY: 'auto'}}>
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
                                (() => {
                                  const estado = getEstadoTarea(mensaje.estado);
                                  return (
                                    <span className={`task-status ${estado.clase}`}>
                                      {estado.emoji} {estado.texto}
                                    </span>
                                  );
                                })()
                              )}
                            </div>
                            <div className="message-text">
                              {mensaje.tipo === 'mensaje' ? (
                                <div className="message-content-text">
                                  {mensaje.contenido}
                                </div>
                              ) : (
                                <>
                                  <span className="message-title">{mensaje.titulo}</span>
                                  <div className="message-content-text">
                                    {mensaje.contenido}
                                  </div>
                                </>
                              )}
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
                        placeholder="Escribe un mensaje..."
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
                        className="chat-publication-btn"
                        onClick={handleAbrirCrearPublicacion}
                        title="Crear publicación"
                      >
                        <FiPlus />
                      </button>
                      {esPropietarioDeHuerta() && (
                      <button 
                        className="chat-task-btn"
                        onClick={handleAbrirCrearTarea}
                          title="Crear tarea"
                      >
                          <AiOutlineCheckSquare />
                      </button>
                      )}
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
            <h2 className="info-title">{huertaSeleccionada?.nombre_huerta}</h2>
            <p className="info-desc">{huertaSeleccionada?.descripcion}</p>
            <div className="info-section">
              <strong>Ubicación:</strong>
              <p>{huertaSeleccionada?.direccion_huerta}</p>
            </div>
            <div className="info-section">
              <strong>Miembros:</strong>
              {loadingMiembros ? (
                <p>Cargando miembros...</p>
              ) : (
                <ul>
                  {miembrosHuerta.length === 0 ? (
                    <li>No hay miembros en esta huerta.</li>
                  ) : (
                    miembrosHuerta.map((relacion, i) => {
                      const esPropietarioDeEstaHuerta = miembrosHuerta.some(
                        (rel) =>
                          rel.id_huerta?.id_huerta === huertaSeleccionada?.id_huerta &&
                          rel.id_usuario?.id_usuario === user?.id_usuario &&
                          rel.id_usuario?.id_tipo_usuario?.descripcion_tipo_usuario?.toLowerCase().includes('propietario')
                      );
                      return (
                        <li key={relacion.id_usuarios_huertas || i} className="miembro-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div>
                            <span style={{ fontWeight: 'bold' }}>{relacion.id_usuario?.nombre} {relacion.id_usuario?.apellido}</span>
                            <span className="info-rol" style={{ display: 'block', color: '#2ecc40', fontWeight: 'bold' }}>{relacion.id_usuario?.id_tipo_usuario?.descripcion_tipo_usuario || ''}</span>
                          </div>
                          {esPropietarioDeEstaHuerta && user.id_usuario !== relacion.id_usuario?.id_usuario && (
                            <button
                              className="eliminar-miembro-btn"
                              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e74c3c', fontSize: '1.3em', marginLeft: 'auto', marginRight: 0, display: 'flex', alignItems: 'center' }}
                              onClick={() => {
                                setMiembroAEliminar(relacion);
                                setShowConfirmDeleteMiembro(true);
                              }}
                              title="Eliminar miembro"
                            >
                              <FiTrash2 />
                            </button>
                          )}
                        </li>
                      );
                    })
                  )}
                </ul>
              )}
            </div>
            <div className="info-section">
              <strong>Tareas:</strong>
              {loadingTareas ? (
                <p>Cargando tareas...</p>
              ) : (
                <ul>
                  {tareasHuerta.length === 0 ? (
                    <li>No hay tareas en esta huerta.</li>
                  ) : (
                    tareasHuerta.map((tarea, i) => (
                      <li key={tarea.id_tarea || i} className="tarea-item" onClick={() => handleTareaClick(tarea)}>
                        <div className="tarea-content">
                          <div className="tarea-header">
                            <span className="tarea-titulo">{tarea.titulo}</span>
                            {(() => {
                              const estado = getEstadoTarea(tarea.estado_tarea?.descripcion_estado_tarea);
                              return (
                                <span className={`task-status ${estado.clase}`}>
                                  {estado.emoji} {estado.texto}
                                </span>
                              );
                            })()}
                          </div>
                          <span className="tarea-asignado">
                            Cultivo: {tarea.cultivo?.titulo_cultivo || 'Sin cultivo'}
                          </span>
                          <span className="tarea-fechas">
                            {new Date(tarea.fecha_inicio).toLocaleDateString()} - {new Date(tarea.fecha_fin).toLocaleDateString()}
                          </span>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              )}
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
                <h2>{tareaSeleccionada.titulo}</h2>
                <div className="modal-header-actions">
                  {(() => {
                    const estado = getEstadoTarea(tareaSeleccionada.estado_tarea?.descripcion_estado_tarea);
                    return (
                      <span className={`task-status ${estado.clase}`}>
                        {estado.emoji} {estado.texto}
                      </span>
                    );
                  })()}
                  {esPropietarioDeHuerta() && (
                    <>
                      <button className="modal-edit-btn" title="Editar tarea" onClick={handleEditarTarea}><FiEdit color="#fff" /></button>
                      <button className="modal-delete-btn" title="Eliminar tarea" onClick={handleEliminarTarea}><FiTrash2 color="#fff" /></button>
                    </>
                  )}
                  <button className="modal-close-btn" onClick={handleCerrarTareaModal}>×</button>
                </div>
              </div>

              {editandoTarea ? (
                <div className="tarea-modal-content">
                  <div className="modal-section">
                    <h3>Título</h3>
                    <input className="modal-input" value={tareaEdit.titulo} onChange={e => setTareaEdit({ ...tareaEdit, titulo: e.target.value })} />
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
                    <h3>Fecha de inicio</h3>
                    <input className="modal-input" type="date" value={tareaEdit.fecha_inicio} onChange={e => setTareaEdit({ ...tareaEdit, fecha_inicio: e.target.value })} />
                  </div>
                  <div className="modal-section">
                    <h3>Fecha de fin</h3>
                    <input className="modal-input" type="date" value={tareaEdit.fecha_fin} onChange={e => setTareaEdit({ ...tareaEdit, fecha_fin: e.target.value })} />
                  </div>
                  <div className="modal-section">
                    <h3>Estado de la tarea</h3>
                    <select className="modal-input" value={tareaEdit.id_estado_tarea} onChange={e => setTareaEdit({ ...tareaEdit, id_estado_tarea: parseInt(e.target.value) })}>
                      {estadosTareas.map((estado, idx) => (
                        <option key={idx} value={estado.id_estado_tarea}>{estado.descripcion_estado_tarea}</option>
                      ))}
                    </select>
                  </div>
                  <div className="modal-section">
                    <h3>Cultivo</h3>
                    <select className="modal-input" value={tareaEdit.id_cultivo} onChange={e => setTareaEdit({ ...tareaEdit, id_cultivo: parseInt(e.target.value) })}>
                      <option value="">Seleccionar cultivo</option>
                      {cultivos.map((cultivo, idx) => (
                        <option key={idx} value={cultivo.id_cultivo}>{cultivo.titulo}</option>
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
                    <p>{tareaSeleccionada.titulo}</p>
                  </div>
                  <div className="modal-section">
                    <h3>Descripción</h3>
                    <p>{tareaSeleccionada.descripcion}</p>
                  </div>
                  <div className="modal-section">
                    <h3>Fechas</h3>
                    <p>Inicio: {new Date(tareaSeleccionada.fecha_inicio).toLocaleDateString()}</p>
                    <p>Fin: {new Date(tareaSeleccionada.fecha_fin).toLocaleDateString()}</p>
                  </div>
                  <div className="modal-section">
                    <h3>Estado actual</h3>
                    {(() => {
                      const estado = getEstadoTarea(tareaSeleccionada.estado_tarea?.descripcion_estado_tarea);
                      return (
                        <span className={`task-status ${estado.clase}`}>
                          {estado.emoji} {estado.texto}
                        </span>
                      );
                    })()}
                    {esPropietarioDeHuerta() && (
                      <div className="estado-selector">
                        <h4>Cambiar estado:</h4>
                        <select 
                          className="modal-input" 
                          value={tareaSeleccionada.id_estado_tarea}
                          onChange={(e) => handleCambiarEstadoTarea(parseInt(e.target.value))}
                        >
                          {estadosTareas.map((estado, idx) => (
                            <option key={idx} value={estado.id_estado_tarea}>{estado.descripcion_estado_tarea}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                  <div className="modal-section">
                    <h3>Cultivo</h3>
                    <p>{tareaSeleccionada.cultivo?.titulo_cultivo || 'Sin cultivo'}</p>
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
          <div className="confirm-backdrop">
            <div className="confirm-content">
              <h3>¿Eliminar miembro?</h3>
              <p>¿Estás seguro de que quieres eliminar a <span className="item-name">{miembroAEliminar.id_usuario?.nombre} {miembroAEliminar.id_usuario?.apellido}</span> de esta huerta?</p>
              <div className="confirm-actions">
                <button className="cancel-btn" onClick={() => setShowConfirmDeleteMiembro(false)}>Cancelar</button>
                <button className="confirm-btn" onClick={async () => {
                  try {
                    await fetch(`/api/usuarios-huertas/${miembroAEliminar.id_usuarios_huertas}`, { method: 'DELETE' });
                    setShowConfirmDeleteMiembro(false);
                    setMiembroAEliminar(null);
                    // Refrescar miembros y huertas
                    const res = await fetch(`/api/usuarios-huertas/huerta/${huertaSeleccionada.id_huerta}`);
                    const data = await res.json();
                    setMiembrosHuerta(Array.isArray(data) ? data : []);
                    showToast('Miembro eliminado correctamente', 'success');
                  } catch (error) {
                    showToast('Error al eliminar miembro', 'error');
                  }
                }}>Eliminar</button>
              </div>
            </div>
          </div>
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
                  <input className="modal-input" value={nuevaTarea.titulo} onChange={e => setNuevaTarea({ ...nuevaTarea, titulo: e.target.value })} />
                </div>
                <div className="modal-section">
                  <h3>Descripción</h3>
                  <textarea className="modal-input" value={nuevaTarea.descripcion} onChange={e => setNuevaTarea({ ...nuevaTarea, descripcion: e.target.value })} />
                </div>
                <div className="modal-section">
                  <h3>Fecha de inicio</h3>
                  <input className="modal-input" type="date" value={nuevaTarea.fecha_inicio} onChange={e => setNuevaTarea({ ...nuevaTarea, fecha_inicio: e.target.value })} />
                </div>
                <div className="modal-section">
                  <h3>Fecha de fin</h3>
                  <input className="modal-input" type="date" value={nuevaTarea.fecha_fin} onChange={e => setNuevaTarea({ ...nuevaTarea, fecha_fin: e.target.value })} />
                </div>
                <div className="modal-section">
                  <h3>Estado de la tarea</h3>
                  <select className="modal-input" value={nuevaTarea.id_estado_tarea} onChange={e => setNuevaTarea({ ...nuevaTarea, id_estado_tarea: e.target.value })}>
                    {estadosTareas.map((estado, idx) => (
                      <option key={idx} value={estado.id_estado_tarea}>{estado.descripcion_estado_tarea}</option>
                    ))}
                  </select>
                </div>
                <div className="modal-section">
                  <h3>Cultivo</h3>
                  <select className="modal-input" value={nuevaTarea.id_cultivo} onChange={e => setNuevaTarea({ ...nuevaTarea, id_cultivo: parseInt(e.target.value) })}>
                    <option value="">Seleccionar cultivo</option>
                    {cultivos.map((cultivo, idx) => (
                      <option key={idx} value={cultivo.id_cultivo}>{cultivo.titulo}</option>
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
            {huertasLoading ? (
              <div className="discover-loading">
                <Loader />
                <p>Cargando huertas...</p>
              </div>
            ) : huertasError ? (
              <div className="discover-error">
                <p>Error al cargar huertas: {huertasError}</p>
                <button onClick={fetchHuertas} className="retry-btn">Reintentar</button>
              </div>
            ) : huertas.length === 0 ? (
              <div className="discover-empty">
                <p>No hay huertas disponibles</p>
              </div>
            ) : (
              <ul className="discover-list">
                {huertas.map((huerta) => {
                  const esMiHuerta = misHuertas.some(uh => uh.id_huerta.id_huerta === huerta.id_huerta);
                  return (
                    <li key={huerta.id_huerta} className={`discover-item ${esMiHuerta ? 'discover-item--mi-huerta' : ''}`} onClick={() => handleHuertaClick(huerta)}>
                      <div className="discover-nombre">{huerta.nombre_huerta}</div>
                      <div className="discover-desc">{huerta.descripcion}</div>
                      <div className="discover-direccion">{huerta.direccion_huerta}</div>
                      {!esMiHuerta && (
                        <button className="discover-join-btn" onClick={e => { e.stopPropagation(); handleUnirseHuerta(huerta); }}>Unirse</button>
                      )}
                      {esMiHuerta && <div className="discover-badge">Mi huerta</div>}
                    </li>
                  );
                })}
              </ul>
            )}
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
                  <input 
                    className={`modal-input ${huertaErrors.nombre ? 'modal-input--error' : ''}`}
                    value={nuevaHuerta.nombre} 
                    onChange={(e) => handleHuertaInputChange('nombre', e.target.value)}
                    placeholder="Ej: Huerta Orgánica El Paraíso"
                  />
                  <div className="modal-help-text">Mínimo 10 caracteres</div>
                  {huertaErrors.nombre && <div className="modal-error-message">{huertaErrors.nombre}</div>}
                </div>
                <div className="modal-section">
                  <h3>Descripción</h3>
                  <textarea 
                    className={`modal-input ${huertaErrors.descripcion ? 'modal-input--error' : ''}`}
                    value={nuevaHuerta.descripcion} 
                    onChange={(e) => handleHuertaInputChange('descripcion', e.target.value)}
                    placeholder="Describe tu huerta, qué cultivos tienes, técnicas que usas..."
                    rows="4"
                  />
                  <div className="modal-help-text">Mínimo 20 caracteres</div>
                  {huertaErrors.descripcion && <div className="modal-error-message">{huertaErrors.descripcion}</div>}
                </div>
                <div className="modal-section">
                  <h3>Dirección de la huerta</h3>
                  <input 
                    className={`modal-input ${huertaErrors.direccion ? 'modal-input--error' : ''}`}
                    value={nuevaHuerta.direccion} 
                    onChange={(e) => handleHuertaInputChange('direccion', e.target.value)}
                    placeholder="Ej: Calle 123, Ciudad Jardín, Bogotá"
                  />
                  <div className="modal-help-text">Mínimo 5 caracteres</div>
                  {huertaErrors.direccion && <div className="modal-error-message">{huertaErrors.direccion}</div>}
                </div>
                {huertaErrors.general && (
                  <div className="modal-error-message modal-error-message--general">
                    {huertaErrors.general}
                  </div>
                )}
                <div className="modal-edit-actions">
                  <button 
                    className="modal-save-btn" 
                    onClick={handleCrearHuerta}
                    disabled={creandoHuerta}
                  >
                    {creandoHuerta ? 'Creando...' : 'Crear'}
                  </button>
                  <button 
                    className="modal-cancel-btn" 
                    onClick={handleCancelarCrearHuerta}
                    disabled={creandoHuerta}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showCrearPublicacion && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="tarea-modal" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <div className="modal-header">
                <h2>Nueva publicación</h2>
                <button className="modal-close-btn" onClick={handleCancelarCrearPublicacion}>×</button>
              </div>
              <div className="tarea-modal-content">
                <div className="modal-section">
                  <h3>Título</h3>
                  <input 
                    className="modal-input" 
                    value={nuevaPublicacion.titulo_post} 
                    onChange={e => setNuevaPublicacion({ ...nuevaPublicacion, titulo_post: e.target.value })}
                    placeholder="Ej: Cosecha de tomates"
                  />
                </div>
                <div className="modal-section">
                  <h3>Contenido</h3>
                  <textarea 
                    className="modal-input" 
                    value={nuevaPublicacion.contenido_post} 
                    onChange={e => setNuevaPublicacion({ ...nuevaPublicacion, contenido_post: e.target.value })}
                    placeholder="Comparte lo que está pasando en tu huerta..."
                    rows="6"
                  />
                </div>
                <div className="modal-edit-actions">
                  <button className="modal-save-btn" onClick={handleGuardarCrearPublicacion}>Publicar</button>
                  <button className="modal-cancel-btn" onClick={handleCancelarCrearPublicacion}>Cancelar</button>
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