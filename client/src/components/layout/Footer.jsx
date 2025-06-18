import React from 'react';
import styles from './Footer.module.css';
import { FaTwitter, FaFacebookF, FaGooglePlusG } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.topRow}>
        <div className={styles.brand}>HuertaConecta</div>
        <div className={styles.rightLinks}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
          <a href="#" aria-label="Twitter" className={styles.social}><FaTwitter /></a>
          <a href="#" aria-label="Facebook" className={styles.social}><FaFacebookF /></a>
          <a href="#" aria-label="Google Plus" className={styles.social}><FaGooglePlusG /></a>
        </div>
      </div>
      <hr className={styles.divider} />
      <div className={styles.bottomRow}>
        <nav className={styles.menu}>
          <a href="#">Tour</a>
          <a href="#">Features</a>
          <a href="#">Pricing Plans</a>
          <a href="#">Our Works</a>
          <a href="#">Brands</a>
          <a href="#">Contacts</a>
        </nav>
        <div className={styles.copyright}>
          © 2025 HuertaConecta. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer; 