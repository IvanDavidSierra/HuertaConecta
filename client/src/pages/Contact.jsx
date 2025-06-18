import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Contact = () => {
  return (
    <div className="contact">
      <Header />
      <main>
        <section className="contact-section">
          <h1>Contacto</h1>
          <div className="contact-container">
            <div className="contact-info">
              <h2>Información de Contacto</h2>
              <p>Email: info@huertaconecta.com</p>
              <p>Teléfono: +123 456 7890</p>
              <p>Dirección: Calle Principal 123, Ciudad</p>
            </div>
            <form className="contact-form">
              <h2>Envíanos un mensaje</h2>
              <div className="form-group">
                <label htmlFor="name">Nombre:</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Mensaje:</label>
                <textarea id="message" name="message" required></textarea>
              </div>
              <button type="submit">Enviar Mensaje</button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact; 