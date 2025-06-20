import React from 'react';
import styles from './Footer.module.css';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { BsTwitterX } from "react-icons/bs";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.topRow}>
        <div className={styles.brand}>HuertaConecta</div>
        <div className={styles.rightLinks}>
          <a href="#">Politica de privacidad</a>
          <a href="#">Terminos y condiciones</a>
          <a href="#" aria-label="Twitter" className={styles.social}><BsTwitterX /></a>
          <a href="#" aria-label="Facebook" className={styles.social}><FaFacebookF /></a>
          <a href="#" aria-label="Instagram" className={styles.social}><FaInstagram /></a>
        </div>
      </div>
      <hr className={styles.divider} />
      <div className={styles.bottomRow}>
        <nav className={styles.menu}>
          <Link to="/nosotros" className={location.pathname === '/nosotros' ? styles.active : styles.navLink}>Nosotros</Link>
          <Link to="/servicios" className={location.pathname === '/servicios' ? styles.active : styles.navLink}>Servicios</Link>
          <Link to="/como-funciona" className={location.pathname === '/como-funciona' ? styles.active : styles.navLink}>¿Como funciona?</Link>
          <Link to="/contacto" className={location.pathname === '/contacto' ? styles.active : styles.navLink}>Contacto</Link>
        </nav>
        <div className={styles.copyright}>
          © 2025 HuertaConecta. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  ); 
};

export default Footer; 