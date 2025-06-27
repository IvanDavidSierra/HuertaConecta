import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TipoUsuario {
  id_tipo_usuario: number;
  descripcion_tipo_usuario: string;
}

interface TipoUsuarioContextType {
  tiposUsuario: TipoUsuario[];
  loading: boolean;
  error: string | null;
  fetchTiposUsuario: () => Promise<void>;
  createTipoUsuario: (tipoUsuario: Omit<TipoUsuario, 'id_tipo_usuario'>) => Promise<{ success: boolean; data?: any; error?: string }>;
  updateTipoUsuario: (id: number, tipoUsuario: Partial<TipoUsuario>) => Promise<{ success: boolean; data?: any; error?: string }>;
  deleteTipoUsuario: (id: number) => Promise<{ success: boolean; error?: string }>;
}

const TipoUsuarioContext = createContext<TipoUsuarioContextType | undefined>(undefined);

export const useTipoUsuario = (): TipoUsuarioContextType => {
  const context = useContext(TipoUsuarioContext);
  if (!context) {
    throw new Error('useTipoUsuario debe ser usado dentro de un TipoUsuarioProvider');
  }
  return context;
};

interface TipoUsuarioProviderProps {
  children: ReactNode;
}

export const TipoUsuarioProvider: React.FC<TipoUsuarioProviderProps> = ({ children }) => {
  const [tiposUsuario, setTiposUsuario] = useState<TipoUsuario[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener todos los tipos de usuario
  const fetchTiposUsuario = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/tipousers');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener tipos de usuario');
      }

      setTiposUsuario(data);
    } catch (error) {
      console.error('Error al obtener tipos de usuario:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Función para crear un nuevo tipo de usuario
  const createTipoUsuario = async (tipoUsuario: Omit<TipoUsuario, 'id_tipo_usuario'>): Promise<{ success: boolean; data?: any; error?: string }> => {
    try {
      setError(null);
      
      const response = await fetch('/api/tipousers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tipoUsuario),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al crear tipo de usuario');
      }

      // Actualizar la lista después de crear
      await fetchTiposUsuario();

      return { success: true, data };
    } catch (error) {
      console.error('Error al crear tipo de usuario:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Función para actualizar un tipo de usuario
  const updateTipoUsuario = async (id: number, tipoUsuario: Partial<TipoUsuario>): Promise<{ success: boolean; data?: any; error?: string }> => {
    try {
      setError(null);
      
      const response = await fetch(`/api/tipousers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tipoUsuario),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al actualizar tipo de usuario');
      }

      // Actualizar la lista después de actualizar
      await fetchTiposUsuario();

      return { success: true };
    } catch (error) {
      console.error('Error al actualizar tipo de usuario:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Función para eliminar un tipo de usuario
  const deleteTipoUsuario = async (id: number): Promise<{ success: boolean; error?: string }> => {
    try {
      setError(null);
      
      const response = await fetch(`/api/tipousers/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al eliminar tipo de usuario');
      }

      // Actualizar la lista después de eliminar
      await fetchTiposUsuario();

      return { success: true };
    } catch (error) {
      console.error('Error al eliminar tipo de usuario:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Cargar tipos de usuario al montar el componente
  useEffect(() => {
    fetchTiposUsuario();
  }, []);

  const value: TipoUsuarioContextType = {
    tiposUsuario,
    loading,
    error,
    fetchTiposUsuario,
    createTipoUsuario,
    updateTipoUsuario,
    deleteTipoUsuario,
  };

  return (
    <TipoUsuarioContext.Provider value={value}>
      {children}
    </TipoUsuarioContext.Provider>
  );
}; 