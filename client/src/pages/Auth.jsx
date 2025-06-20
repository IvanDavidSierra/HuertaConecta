import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-bg">
      <Header />
      <main>
        <section className="auth-section">
          <div className="auth-form-container">
            <h2 className="auth-title">{isLogin ? 'Iniciar sesión' : 'Registrarse'}</h2>
            {isLogin ? (
              <form className="auth-form">
                <input type="email" placeholder="Ingresa tu correo" className="auth-input" required />
                <input type="password" placeholder="Ingresa tu contraseña" className="auth-input" required />
                <button type="submit" className="auth-btn">Entrar</button>
                <div className="auth-switch">
                  ¿Aún no tienes cuenta?{' '}
                  <span className="auth-link" onClick={() => setIsLogin(false)}>Registrate</span>
                </div>
              </form>
            ) : (
              <form className="auth-form">
                <input type="text" placeholder="Tus nombres" className="auth-input" required />
                <input type="text" placeholder="Tus apellidos" className="auth-input" required />
                <input type="email" placeholder="Tu correo" className="auth-input" required />
                <input type="password" placeholder="Tu contraseña" className="auth-input" required />
                <input type="password" placeholder="Confirma tu contraseña" className="auth-input" required />
                <label className="auth-checkbox-label">
                  <input type="checkbox" required />
                  <span className="auth-checkbox-custom" />
                  Acepto los términos y condiciones
                </label>
                <button type="submit" className="auth-btn">Crea tu cuenta</button>
                <div className="auth-switch">
                  ¿Tienes una cuenta?{' '}
                  <span className="auth-link" onClick={() => setIsLogin(true)}>Inicia sesión</span>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Auth; 