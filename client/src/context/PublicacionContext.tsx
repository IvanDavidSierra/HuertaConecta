import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Publicacion {
  id: number;
  titulo: string;
  descripcion: string;
  contenido: string;
  id_huerta: number;
  id_usuario: number;
}

interface PublicacionContextType {
  publicaciones: Publicacion[];
  loading: boolean;
  error: string | null;
  fetchPublicaciones: () => Promise<void>;
  createPublicacion: (publicacion: Omit<Publicacion, 'id'>) => Promise<{ success: boolean; data?: any; error?: string }>;
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

  // Crear publicación
  const createPublicacion = async (publicacion: Omit<Publicacion, 'id'>): Promise<{ success: boolean; data?: any; error?: string }> => {
    try {
      setError(null);
      const response = await fetch('/api/publicaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(publicacion),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error al crear publicación');
      }
      await fetchPublicaciones();
      return { success: true, data };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
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