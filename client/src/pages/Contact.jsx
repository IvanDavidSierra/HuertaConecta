import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-bg">
      <div className="contact-overlay">
        <div className="contact-container">
          <h2 className="contact-title">Contáctanos</h2>
          <p className="contact-desc">
            Hemos creado una plataforma para ayudar a productores, comunidades y empresas a conectar y gestionar sus huertas de manera fácil y eficiente.
          </p>
          <form className="contact-form">
            <div className="contact-row">
              <input type="text" placeholder="Tu nombre" className="contact-input" />
              <input type="email" placeholder="Tu email" className="contact-input" />
            </div>
            <textarea placeholder="Tu mensaje" className="contact-textarea" rows={4}></textarea>
            <button type="submit" className="contact-btn">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact; 