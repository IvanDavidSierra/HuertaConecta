import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export interface Huerta {
  id_huerta: number;
  nombre_huerta: string;
  descripcion: string;
  direccion_huerta: string;
  fecha_creacion: string;
}

interface HuertaContextType {
  huertas: Huerta[];
  loading: boolean;
  error: string | null;
  fetchHuertas: () => Promise<void>;
  createHuerta: (huerta: Omit<Huerta, 'id_huerta'>) => Promise<{ success: boolean; data?: any; error?: string }>;
  updateHuerta: (id: number, huerta: Partial<Huerta>) => Promise<{ success: boolean; data?: any; error?: string }>;
  deleteHuerta: (id: number) => Promise<{ success: boolean; error?: string }>;
}

const HuertaContext = createContext<HuertaContextType | undefined>(undefined);

export const useHuerta = (): HuertaContextType => {
  const context = useContext(HuertaContext);
  if (!context) {
    throw new Error('useHuerta debe ser usado dentro de un HuertaProvider');
  }
  return context;
};

interface HuertaProviderProps {
  children: ReactNode;
}

export const HuertaProvider: React.FC<HuertaProviderProps> = ({ children }) => {
  const [huertas, setHuertas] = useState<Huerta[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Obtener todas las huertas
  const fetchHuertas = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/huertas');
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener huertas');
      }
      setHuertas(data.sort((a, b) => a.id_huerta - b.id_huerta));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear huerta
  const createHuerta = useCallback(async (huerta: Omit<Huerta, 'id_huerta'>): Promise<{ success: boolean; data?: any; error?: string }> => {
    try {
      setError(null);
      const response = await fetch('/api/huertas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(huerta),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error al crear huerta');
      }
      await fetchHuertas();
      return { success: true, data };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, [fetchHuertas]);

  // Editar huerta
  const updateHuerta = useCallback(async (id: number, huerta: Partial<Huerta>): Promise<{ success: boolean; data?: any; error?: string }> => {
    try {
      setError(null);
      const response = await fetch(`/api/huertas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(huerta),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al actualizar huerta');
      }
      await fetchHuertas();
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, [fetchHuertas]);

  // Eliminar huerta
  const deleteHuerta = useCallback(async (id: number): Promise<{ success: boolean; error?: string }> => {
    try {
      setError(null);
      const response = await fetch(`/api/huerta/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al eliminar huerta');
      }
      await fetchHuertas();
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, [fetchHuertas]);

  useEffect(() => {
    fetchHuertas();
  }, [fetchHuertas]);

  const value: HuertaContextType = {
    huertas,
    loading,
    error,
    fetchHuertas,
    createHuerta,
    updateHuerta,
    deleteHuerta,
  };

  return (
    <HuertaContext.Provider value={value}>
      {children}
    </HuertaContext.Provider>
  );
}; 