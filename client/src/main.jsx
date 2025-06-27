import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import { TipoUsuarioProvider } from './context/TipoUsuarioContext.tsx';
import { UsuarioProvider } from './context/UsuarioContext.tsx';
import { HuertaProvider } from './context/HuertaContext.tsx';
import { ToastProvider } from './context/ToastContext.tsx';
import { PublicacionProvider } from './context/PublicacionContext.tsx';
import { UsuariosHuertasProvider } from './context/UsuariosHuertasContext.tsx';
import { CultivoProvider } from './context/CultivoContext';
import { TareaProvider } from './context/TareaContext.tsx';
import AppRoutes from './routes';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <TipoUsuarioProvider>
        <UsuarioProvider>
          <HuertaProvider>
            <UsuariosHuertasProvider>
              <PublicacionProvider>
                <CultivoProvider>
                  <TareaProvider>
                    <ToastProvider>
                      <BrowserRouter>
                        <AppRoutes />
                      </BrowserRouter>
                    </ToastProvider>
                  </TareaProvider>
                </CultivoProvider>
              </PublicacionProvider>
            </UsuariosHuertasProvider>
          </HuertaProvider>
        </UsuarioProvider>
      </TipoUsuarioProvider>
    </AuthProvider>
  </React.StrictMode>
);
