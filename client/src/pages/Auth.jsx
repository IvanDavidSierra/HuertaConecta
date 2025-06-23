import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    confirmarContrasena: '',
  });
  const [loginData, setLoginData] = useState({
    correo: '',
    contrasena: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register, login } = useAuth();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLoginInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validaciones
    if (formData.contrasena !== formData.confirmarContrasena) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    if (formData.contrasena.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      const result = await register({
        nombre: formData.nombre,
        apellido: formData.apellido,
        correo: formData.correo,
        contrasena: formData.contrasena
      });

      if (result.success) {
        console.log('✅ Registro exitoso, redirigiendo al dashboard...');
        setSuccess('¡Registro exitoso! Redirigiendo al dashboard...');
        // Limpiar formulario
        setFormData({
          nombre: '',
          apellido: '',
          correo: '',
          contrasena: '',
          confirmarContrasena: ''
        });
        // Redirigir al dashboard después de 2 segundos
        setTimeout(() => {
          console.log('🔄 Ejecutando redirección a /dashboard');
          window.location.href = '/dashboard';
        }, 2000);
      } else {
        console.log('❌ Error en el registro:', result.error);
        setError(result.error);
      }
    } catch (error) {
      setError('Error en el registro. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await login(
        { correo: loginData.correo, contrasena: loginData.contrasena },
        { rememberMe }
      );

      if (result.success) {
        setSuccess('¡Inicio de sesión exitoso! Redirigiendo...');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Error en el inicio de sesión. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg">
      <Header />
      <main>
        <section className="auth-section">
          <div className="auth-form-container">
            <h2 className="auth-title">{isLogin ? 'Iniciar sesión' : 'Registrarse'}</h2>
            
            {error && (
              <div className="auth-error" style={{ 
                backgroundColor: '#f8d7da', 
                color: '#721c24', 
                padding: '10px', 
                borderRadius: '5px', 
                marginBottom: '15px',
                border: '1px solid #f5c6cb'
              }}>
                {error}
              </div>
            )}

            {success && (
              <div className="auth-success" style={{ 
                backgroundColor: '#d4edda', 
                color: '#155724', 
                padding: '10px', 
                borderRadius: '5px', 
                marginBottom: '15px',
                border: '1px solid #c3e6cb'
              }}>
                {success}
              </div>
            )}

            {isLogin ? (
              <form className="auth-form" onSubmit={handleLogin}>
                <input 
                  type="email"
                  name="correo"
                  placeholder="Ingresa tu correo" 
                  className="auth-input" 
                  value={loginData.correo}
                  onChange={handleLoginInputChange}
                  required 
                />
                <input 
                  type="password"
                  name="contrasena" 
                  placeholder="Ingresa tu contraseña" 
                  className="auth-input"
                  value={loginData.contrasena}
                  onChange={handleLoginInputChange}
                  required 
                />
                <label className="auth-checkbox-label" style={{ justifyContent: 'flex-start', marginBottom: '20px' }}>
                  <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                  <span className="auth-checkbox-custom" />
                  Recordarme
                </label>
                <button 
                  type="submit" 
                  className="auth-btn" 
                  disabled={loading}
                >
                  {loading ? 'Entrando...' : 'Entrar'}
                </button>
                <div className="auth-switch">
                  ¿Aún no tienes cuenta?{' '}
                  <span className="auth-link" onClick={() => setIsLogin(false)}>Registrate</span>
                </div>
              </form>
            ) : (
              <form className="auth-form" onSubmit={handleRegister}>
                <input 
                  type="text" 
                  name="nombre"
                  placeholder="Tus nombres" 
                  className="auth-input" 
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required 
                />
                <input 
                  type="text" 
                  name="apellido"
                  placeholder="Tus apellidos" 
                  className="auth-input" 
                  value={formData.apellido}
                  onChange={handleInputChange}
                  required 
                />
                <input 
                  type="email" 
                  name="correo"
                  placeholder="Tu correo" 
                  className="auth-input" 
                  value={formData.correo}
                  onChange={handleInputChange}
                  required 
                />
                <input 
                  type="password" 
                  name="contrasena"
                  placeholder="Tu contraseña" 
                  className="auth-input" 
                  value={formData.contrasena}
                  onChange={handleInputChange}
                  required 
                />
                <input 
                  type="password" 
                  name="confirmarContrasena"
                  placeholder="Confirma tu contraseña" 
                  className="auth-input" 
                  value={formData.confirmarContrasena}
                  onChange={handleInputChange}
                  required 
                />
                <label className="auth-checkbox-label">
                  <input type="checkbox" required />
                  <span className="auth-checkbox-custom" />
                  Acepto los términos y condiciones
                </label>
                <button 
                  type="submit" 
                  className="auth-btn" 
                  disabled={loading}
                >
                  {loading ? 'Creando cuenta...' : 'Crea tu cuenta'}
                </button>
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