import React, { createContext, useContext, useState, useEffect } from 'react';

interface EstadoTarea {
  id_estado_tarea: number;
  descripcion_estado_tarea: string;
}

interface TareaBackend {
  id_tarea: number;
  titulo_tarea: string;
  descripcion_tarea: string;
  fecha_inicio_tarea: string;
  fecha_fin_tarea: string;
  id_estado_tarea: number;
  id_cultivo: number;
  fecha_creacion: string;
  id_usuarios_huertas: number;
  estado_tarea?: EstadoTarea;
  cultivo?: {
    id_cultivo: number;
    titulo_cultivo: string;
  };
  usuario_huerta?: {
    id_usuarios_huertas: number;
    id_usuario?: {
      id_usuario: number;
      nombre: string;
      apellido: string;
    };
  };
}

interface Tarea {
  id_tarea?: number;
  titulo: string;
  descripcion: string;
  fecha_inicio: string;
  fecha_fin: string;
  id_estado_tarea: number;
  id_cultivo: number;
  id_usuarios_huertas: number;
  estado_tarea?: EstadoTarea;
  cultivo?: {
    id_cultivo: number;
    titulo_cultivo: string;
  };
  usuario_huerta?: {
    id_usuarios_huertas: number;
    id_usuario?: {
      id_usuario: number;
      nombre: string;
      apellido: string;
    };
  };
}

interface TareaContextType {
  tareas: Tarea[];
  estadosTareas: EstadoTarea[];
  loading: boolean;
  error: string | null;
  createTarea: (tarea: Omit<Tarea, 'id_tarea'>) => Promise<{ success: boolean; error?: string }>;
  updateTarea: (id: number, tarea: Partial<Tarea>) => Promise<{ success: boolean; error?: string }>;
  deleteTarea: (id: number) => Promise<{ success: boolean; error?: string }>;
  fetchTareas: () => Promise<void>;
  fetchTareasByUsuarioHuerta: (id_usuarios_huertas: number) => Promise<Tarea[]>;
  fetchEstadosTareas: () => Promise<void>;
  updateEstadoTarea: (id_tarea: number, id_estado_tarea: number) => Promise<{ success: boolean; error?: string }>;
}

const TareaContext = createContext<TareaContextType | undefined>(undefined);

export const useTarea = () => {
  const context = useContext(TareaContext);
  if (!context) {
    throw new Error('useTarea debe ser usado dentro de un TareaProvider');
  }
  return context;
};

// Función para mapear del backend al frontend
const mapBackendToFrontend = (tareaBackend: TareaBackend): Tarea => ({
  id_tarea: tareaBackend.id_tarea,
  titulo: tareaBackend.titulo_tarea,
  descripcion: tareaBackend.descripcion_tarea,
  fecha_inicio: tareaBackend.fecha_inicio_tarea,
  fecha_fin: tareaBackend.fecha_fin_tarea,
  id_estado_tarea: tareaBackend.id_estado_tarea,
  id_cultivo: tareaBackend.id_cultivo,
  id_usuarios_huertas: tareaBackend.id_usuarios_huertas,
  estado_tarea: tareaBackend.estado_tarea,
  cultivo: tareaBackend.cultivo,
  usuario_huerta: tareaBackend.usuario_huerta,
});

// Función para mapear del frontend al backend
const mapFrontendToBackend = (tarea: Omit<Tarea, 'id_tarea'>) => ({
  titulo_tarea: tarea.titulo,
  descripcion_tarea: tarea.descripcion,
  fecha_inicio_tarea: tarea.fecha_inicio,
  fecha_fin_tarea: tarea.fecha_fin,
  id_estado_tarea: tarea.id_estado_tarea,
  id_cultivo: tarea.id_cultivo,
  id_usuarios_huertas: tarea.id_usuarios_huertas,
});

export const TareaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [estadosTareas, setEstadosTareas] = useState<EstadoTarea[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = '/api';

  const fetchTareas = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/tarea`);
      if (!response.ok) {
        throw new Error('Error al obtener tareas');
      }
      const data: TareaBackend[] = await response.json();
      const mappedTareas = data.map(mapBackendToFrontend);
      setTareas(mappedTareas);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const fetchTareasByUsuarioHuerta = async (id_usuarios_huertas: number): Promise<Tarea[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/tarea/usuario-huerta/${id_usuarios_huertas}`);
      if (!response.ok) {
        throw new Error('Error al obtener tareas del usuario-huerta');
      }
      const data: TareaBackend[] = await response.json();
      return data.map(mapBackendToFrontend);
    } catch (err) {
      console.error('Error al obtener tareas por usuario-huerta:', err);
      return [];
    }
  };

  const fetchEstadosTareas = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/estado`);
      if (!response.ok) {
        throw new Error('Error al obtener estados de tareas');
      }
      const data: EstadoTarea[] = await response.json();
      setEstadosTareas(data);
    } catch (err) {
      console.error('Error al obtener estados de tareas:', err);
    }
  };

  const createTarea = async (tarea: Omit<Tarea, 'id_tarea'>): Promise<{ success: boolean; error?: string }> => {
    try {
      const tareaBackend = mapFrontendToBackend(tarea);
      const response = await fetch(`${API_BASE_URL}/tarea`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tareaBackend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear tarea');
      }

      await fetchTareas();
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      return { success: false, error: errorMessage };
    }
  };

  const updateTarea = async (id: number, tarea: Partial<Tarea>): Promise<{ success: boolean; error?: string }> => {
    try {
      const tareaBackend: any = {};
      if (tarea.titulo) tareaBackend.titulo_tarea = tarea.titulo;
      if (tarea.descripcion) tareaBackend.descripcion_tarea = tarea.descripcion;
      if (tarea.fecha_inicio) tareaBackend.fecha_inicio_tarea = tarea.fecha_inicio;
      if (tarea.fecha_fin) tareaBackend.fecha_fin_tarea = tarea.fecha_fin;
      if (tarea.id_estado_tarea) tareaBackend.id_estado_tarea = tarea.id_estado_tarea;
      if (tarea.id_cultivo) tareaBackend.id_cultivo = tarea.id_cultivo;
      if (tarea.id_usuarios_huertas) tareaBackend.id_usuarios_huertas = tarea.id_usuarios_huertas;

      const response = await fetch(`${API_BASE_URL}/tarea/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tareaBackend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar tarea');
      }

      await fetchTareas();
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      return { success: false, error: errorMessage };
    }
  };

  const deleteTarea = async (id: number): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/tarea/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar tarea');
      }

      await fetchTareas();
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      return { success: false, error: errorMessage };
    }
  };

  const updateEstadoTarea = async (id_tarea: number, id_estado_tarea: number): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/tarea/${id_tarea}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_estado_tarea }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar estado de tarea');
      }

      await fetchTareas();
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      return { success: false, error: errorMessage };
    }
  };

  useEffect(() => {
    fetchTareas();
    fetchEstadosTareas();
  }, []);

  const value: TareaContextType = {
    tareas,
    estadosTareas,
    loading,
    error,
    createTarea,
    updateTarea,
    deleteTarea,
    fetchTareas,
    fetchTareasByUsuarioHuerta,
    fetchEstadosTareas,
    updateEstadoTarea,
  };

  return (
    <TareaContext.Provider value={value}>
      {children}
    </TareaContext.Provider>
  );
}; 