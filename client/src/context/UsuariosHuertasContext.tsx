import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export interface UsuarioHuerta {
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
}

interface UsuariosHuertasContextType {
  usuariosHuertas: UsuarioHuerta[];
  loading: boolean;
  error: string | null;
  fetchUsuariosHuertas: () => Promise<void>;
  fetchUsuariosHuertasByUserId: (userId: number) => Promise<UsuarioHuerta[]>;
}

const UsuariosHuertasContext = createContext<UsuariosHuertasContextType | undefined>(undefined);

export const useUsuariosHuertas = (): UsuariosHuertasContextType => {
  const context = useContext(UsuariosHuertasContext);
  if (!context) {
    throw new Error('useUsuariosHuertas debe ser usado dentro de un UsuariosHuertasProvider');
  }
  return context;
};

interface UsuariosHuertasProviderProps {
  children: ReactNode;
}

export const UsuariosHuertasProvider: React.FC<UsuariosHuertasProviderProps> = ({ children }) => {
  const [usuariosHuertas, setUsuariosHuertas] = useState<UsuarioHuerta[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsuariosHuertas = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/usuarios-huertas');
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener relaciones usuario-huerta');
      }
      setUsuariosHuertas(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUsuariosHuertasByUserId = useCallback(async (userId: number): Promise<UsuarioHuerta[]> => {
    try {
      console.log('Buscando huertas para userId:', userId);
      const response = await fetch(`/api/usuarios-huertas/user/${userId}`);
      const data = await response.json();
      console.log('Respuesta de huertas del usuario:', data);
      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener las huertas del usuario');
      }
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      console.error('Error al obtener huertas del usuario:', errorMessage);
      return [];
    }
  }, []);

  useEffect(() => {
    fetchUsuariosHuertas();
  }, [fetchUsuariosHuertas]);

  const value: UsuariosHuertasContextType = {
    usuariosHuertas,
    loading,
    error,
    fetchUsuariosHuertas,
    fetchUsuariosHuertasByUserId,
  };

  return (
    <UsuariosHuertasContext.Provider value={value}>
      {children}
    </UsuariosHuertasContext.Provider>
  );
}; 