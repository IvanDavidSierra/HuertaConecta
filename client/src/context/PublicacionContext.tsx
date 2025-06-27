import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Publicacion {
  id_publicacion: number;
  titulo_post: string;
  contenido_post: string;
  fecha_post: string;
  id_usuarios_huertas: {
    id_usuarios_huertas: number;
    id_usuario: {
      id_usuario: number;
      nombre: string;
      apellido: string;
      correo: string;
    };
    id_huerta: {
      id_huerta: number;
      nombre_huerta: string;
      direccion_huerta: string;
      descripcion: string;
    };
    fecha_vinculacion: string;
  };
}

interface PublicacionContextType {
  publicaciones: Publicacion[];
  loading: boolean;
  error: string | null;
  fetchPublicaciones: () => Promise<void>;
  fetchPublicacionesByHuertaId: (huertaId: number) => Promise<Publicacion[]>;
  createPublicacion: (publicacion: { titulo_post: string; contenido_post: string; id_usuarios_huertas: number }) => Promise<{ success: boolean; data?: any; error?: string }>;
  updatePublicacion: (id: number, publicacion: Partial<Publicacion>) => Promise<{ success: boolean; data?: any; error?: string }>;
  deletePublicacion: (id: number) => Promise<{ success: boolean; error?: string }>;
}

const PublicacionContext = createContext<PublicacionContextType | undefined>(undefined);

export const usePublicacion = (): PublicacionContextType => {
  const context = useContext(PublicacionContext);
  if (!context) {
    throw new Error('usePublicacion debe ser usado dentro de un PublicacionProvider');
  }
  return context;
};

interface PublicacionProviderProps {
  children: ReactNode;
}

export const PublicacionProvider: React.FC<PublicacionProviderProps> = ({ children }) => {
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Obtener todas las publicaciones
  const fetchPublicaciones = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/publicaciones');
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener publicaciones');
      }
      setPublicaciones(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Obtener publicaciones por ID de huerta
  const fetchPublicacionesByHuertaId = async (huertaId: number): Promise<Publicacion[]> => {
    try {
      const response = await fetch(`/api/publicaciones/huerta/${huertaId}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener publicaciones de la huerta');
      }
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      console.error('Error al obtener publicaciones de la huerta:', errorMessage);
      return [];
    }
  };

  // Crear publicación
  const createPublicacion = async (publicacion: { titulo_post: string; contenido_post: string; id_usuarios_huertas: number }): Promise<{ success: boolean; data?: any; error?: string }> => {
    try {
      setError(null);
      console.log('PublicacionContext - Datos recibidos:', publicacion);
      const response = await fetch('/api/publicaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(publicacion),
      });
      const data = await response.json();
      console.log('PublicacionContext - Respuesta del backend:', data);
      if (!response.ok) {
        throw new Error(data.message || 'Error al crear publicación');
      }
      await fetchPublicaciones();
      return { success: true, data };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      console.error('PublicacionContext - Error:', errorMessage);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Editar publicación
  const updatePublicacion = async (id: number, publicacion: Partial<Publicacion>): Promise<{ success: boolean; data?: any; error?: string }> => {
    try {
      setError(null);
      const response = await fetch(`/api/publicaciones/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(publicacion),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al actualizar publicación');
      }
      await fetchPublicaciones();
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Eliminar publicación
  const deletePublicacion = async (id: number): Promise<{ success: boolean; error?: string }> => {
    try {
      setError(null);
      const response = await fetch(`/api/publicaciones/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al eliminar publicación');
      }
      await fetchPublicaciones();
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  useEffect(() => {
    fetchPublicaciones();
  }, []);

  const value: PublicacionContextType = {
    publicaciones,
    loading,
    error,
    fetchPublicaciones,
    fetchPublicacionesByHuertaId,
    createPublicacion,
    updatePublicacion,
    deletePublicacion,
  };

  return (
    <PublicacionContext.Provider value={value}>
      {children}
    </PublicacionContext.Provider>
  );
}; 