import React, { createContext, useContext, useState, useEffect } from 'react';

interface CultivoBackend {
  id_cultivo: number;
  titulo_cultivo: string;
  descripcion_cultivo: string;
}

interface Cultivo {
  id_cultivo?: number;
  titulo: string;
  descripcion: string;
}

interface CultivoContextType {
  cultivos: Cultivo[];
  loading: boolean;
  error: string | null;
  createCultivo: (cultivo: Omit<Cultivo, 'id_cultivo'>) => Promise<{ success: boolean; error?: string }>;
  updateCultivo: (id: number, cultivo: Cultivo) => Promise<{ success: boolean; error?: string }>;
  deleteCultivo: (id: number) => Promise<{ success: boolean; error?: string }>;
  fetchCultivos: () => Promise<void>;
}

const CultivoContext = createContext<CultivoContextType | undefined>(undefined);

export const useCultivo = () => {
  const context = useContext(CultivoContext);
  if (!context) {
    throw new Error('useCultivo debe ser usado dentro de un CultivoProvider');
  }
  return context;
};

// Función para mapear del backend al frontend
const mapBackendToFrontend = (cultivoBackend: CultivoBackend): Cultivo => ({
  id_cultivo: cultivoBackend.id_cultivo,
  titulo: cultivoBackend.titulo_cultivo,
  descripcion: cultivoBackend.descripcion_cultivo,
});

// Función para mapear del frontend al backend
const mapFrontendToBackend = (cultivo: Omit<Cultivo, 'id_cultivo'>) => ({
  titulo_cultivo: cultivo.titulo,
  descripcion_cultivo: cultivo.descripcion,
});

// Función para ordenar cultivos por ID
const sortCultivos = (cultivos: Cultivo[]): Cultivo[] => {
  return cultivos.sort((a, b) => (a.id_cultivo || 0) - (b.id_cultivo || 0));
};

export const CultivoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cultivos, setCultivos] = useState<Cultivo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = '/api';

  const fetchCultivos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/cultivo`);
      if (!response.ok) {
        throw new Error('Error al obtener cultivos');
      }
      const data: CultivoBackend[] = await response.json();
      const mappedCultivos = data.map(mapBackendToFrontend);
      // Ordenar por id_cultivo para mantener consistencia
      const sortedCultivos = sortCultivos(mappedCultivos);
      setCultivos(sortedCultivos);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const createCultivo = async (cultivo: Omit<Cultivo, 'id_cultivo'>): Promise<{ success: boolean; error?: string }> => {
    try {
      const cultivoBackend = mapFrontendToBackend(cultivo);
      const response = await fetch(`${API_BASE_URL}/cultivo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cultivoBackend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear cultivo');
      }

      await fetchCultivos();
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      return { success: false, error: errorMessage };
    }
  };

  const updateCultivo = async (id: number, cultivo: Cultivo): Promise<{ success: boolean; error?: string }> => {
    try {
      const cultivoBackend = mapFrontendToBackend(cultivo);
      const response = await fetch(`${API_BASE_URL}/cultivo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cultivoBackend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar cultivo');
      }

      await fetchCultivos();
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      return { success: false, error: errorMessage };
    }
  };

  const deleteCultivo = async (id: number): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/cultivo/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar cultivo');
      }

      await fetchCultivos();
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      return { success: false, error: errorMessage };
    }
  };

  useEffect(() => {
    fetchCultivos();
  }, []);

  const value: CultivoContextType = {
    cultivos,
    loading,
    error,
    createCultivo,
    updateCultivo,
    deleteCultivo,
    fetchCultivos,
  };

  return (
    <CultivoContext.Provider value={value}>
      {children}
    </CultivoContext.Provider>
  );
}; 