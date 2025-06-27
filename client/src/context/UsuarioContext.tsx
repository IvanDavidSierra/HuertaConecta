import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Usuario {
  id_usuario: number;
  nombre: string;
  apellido: string;
  correo: string;
  contrasena?: string; // Opcional para no enviar en respuestas
  fecha_creacion: string;
  tipo_usuario: {
    id_tipo_usuario: number;
    descripcion_tipo_usuario: string;
  };
}

interface UsuarioContextType {
  usuarios: Usuario[];
  loading: boolean;
  error: string | null;
  fetchUsuarios: () => Promise<void>;
  createUsuario: (usuario: Omit<Usuario, 'id_usuario' | 'fecha_creacion' | 'tipo_usuario'> & { id_tipo_usuario: number }) => Promise<{ success: boolean; data?: any; error?: string }>;
  updateUsuario: (id: number, usuario: Partial<Usuario>) => Promise<{ success: boolean; data?: any; error?: string }>;
  deleteUsuario: (id: number) => Promise<{ success: boolean; error?: string }>;
}

const UsuarioContext = createContext<UsuarioContextType | undefined>(undefined);

export const useUsuario = (): UsuarioContextType => {
  const context = useContext(UsuarioContext);
  if (!context) {
    throw new Error('useUsuario debe ser usado dentro de un UsuarioProvider');
  }
  return context;
};

interface UsuarioProviderProps {
  children: ReactNode;
}

export const UsuarioProvider: React.FC<UsuarioProviderProps> = ({ children }) => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener todos los usuarios
  const fetchUsuarios = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/users');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener usuarios');
      }

      setUsuarios(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Función para crear un nuevo usuario
  const createUsuario = async (usuario: Omit<Usuario, 'id_usuario' | 'fecha_creacion' | 'tipo_usuario'> & { id_tipo_usuario: number }): Promise<{ success: boolean; data?: any; error?: string }> => {
    try {
      setError(null);
      
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al crear usuario');
      }

      // Actualizar la lista después de crear
      await fetchUsuarios();

      return { success: true, data };
    } catch (error) {
      console.error('Error al crear usuario:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Función para actualizar un usuario
  const updateUsuario = async (id: number, usuario: Partial<Usuario>): Promise<{ success: boolean; data?: any; error?: string }> => {
    try {
      setError(null);
      
      const response = await fetch(`/api/users`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_usuario: id, ...usuario }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al actualizar usuario');
      }

      // Actualizar la lista después de actualizar
      await fetchUsuarios();

      return { success: true };
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Función para eliminar un usuario
  const deleteUsuario = async (id: number): Promise<{ success: boolean; error?: string }> => {
    try {
      setError(null);
      
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al eliminar usuario');
      }

      // Actualizar la lista después de eliminar
      await fetchUsuarios();

      return { success: true };
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Cargar usuarios al montar el componente
  useEffect(() => {
    fetchUsuarios();
  }, []);

  const value: UsuarioContextType = {
    usuarios,
    loading,
    error,
    fetchUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario,
  };

  return (
    <UsuarioContext.Provider value={value}>
      {children}
    </UsuarioContext.Provider>
  );
}; 