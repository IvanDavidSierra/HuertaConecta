import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id_usuario: number;
  nombre: string;
  apellido: string;
  correo: string;
  id_tipo_usuario: number;
}

interface RegisterData {
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
}

interface RegisterResult {
  success: boolean;
  data?: any;
  error?: string;
}

interface LoginData {
  correo: string;
  contrasena: string;
}

interface LoginOptions {
  rememberMe: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  register: (userData: RegisterData) => Promise<RegisterResult>;
  login: (loginData: LoginData, options: LoginOptions) => Promise<RegisterResult>;
  logout: () => void;
  isAuthenticated: () => boolean;
  getAuthHeaders: () => { [key: string]: string };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Verificar si hay una sesión guardada al cargar la app
  useEffect(() => {
    // Priorizar localStorage (Recordarme) sobre sessionStorage
    const savedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
    const savedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    
    setLoading(false);
  }, []);

  // Función para registrar usuario
  const register = async (userData: RegisterData): Promise<RegisterResult> => {
    try {
      console.log('🚀 Iniciando registro con datos:', { ...userData, contrasena: '[HIDDEN]' });
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...userData,
          id_tipo_usuario: 4 // Asignar tipo de usuario 4 automáticamente
        }),
      });

      const data = await response.json();
      console.log('📡 Respuesta del servidor:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Error en el registro');
      }

      // Guardar token y usuario en sessionStorage
      console.log('💾 Guardando datos de sesión en sessionStorage...');
      setToken(data.token);
      setUser(data.user);
      
      // Guardar en sessionStorage
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('user', JSON.stringify(data.user));

      console.log('✅ Registro completado exitosamente');
      return { success: true, data };
    } catch (error) {
      console.error('❌ Error en el contexto de registro:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      };
    }
  };

  const login = async (loginData: LoginData, options: LoginOptions): Promise<RegisterResult> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en el inicio de sesión');
      }

      // Guardar token y usuario
      setToken(data.token);
      setUser(data.user);
      
      // Decidir dónde guardar la sesión
      const storage = options.rememberMe ? localStorage : sessionStorage;
      storage.setItem('token', data.token);
      storage.setItem('user', JSON.stringify(data.user));

      return { success: true, data };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      };
    }
  };

  // Función para cerrar sesión
  const logout = (): void => {
    setToken(null);
    setUser(null);
    // Limpiar ambos almacenamientos al cerrar sesión
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Función para verificar si el token es válido
  const isAuthenticated = (): boolean => {
    return !!token;
  };

  // Función para obtener el token para peticiones autenticadas
  const getAuthHeaders = (): { [key: string]: string } => {
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  };

  const value: AuthContextType = {
    user,
    token,
    loading,
    register,
    login,
    logout,
    isAuthenticated,
    getAuthHeaders,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 