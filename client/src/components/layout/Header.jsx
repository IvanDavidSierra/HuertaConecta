import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../assets/huerta_conecta_mini.png';
import { useAuth } from '../../context/AuthContext.tsx';

const Header = ({ hide }) => {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const isLoggedIn = isAuthenticated();
  
  // Verificar si el usuario es administrador (id_tipo_usuario: 1)
  const isAdmin =  user?.id_tipo_usuario.id_tipo_usuario === 1;

  return (
    <header className={`${styles.header} ${hide ? styles.slideUp : ''}`}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link to="/" className={styles.logoLink}>
            <img src={logo} alt="HuertaConecta Logo" className={styles.logoImg} />
            <span className={styles.brand}>HuertaConecta</span>
          </Link>
        </div>
        <nav className={styles.navMenu}>
          <Link to="/nosotros" className={location.pathname === '/nosotros' ? styles.active : styles.navLink}>Nosotros</Link>
          <Link to="/servicios" className={location.pathname === '/servicios' ? styles.active : styles.navLink}>Servicios</Link>
          <Link to="/como-funciona" className={location.pathname === '/como-funciona' ? styles.active : styles.navLink}>¿Cómo funciona?</Link>
          <Link to="/contacto" className={location.pathname === '/contacto' ? styles.active : styles.navLink}>Contacto</Link>
        </nav>
        <div className={styles.right}>
          <Link to={isLoggedIn ? (isAdmin ? "/admin" : "/dashboard") : "/auth"} className={styles.signupBtn}>
            {isLoggedIn ? (isAdmin ? "Administrar" : "Mi Huerta") : "Conéctate"}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header; 