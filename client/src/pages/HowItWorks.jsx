import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const HowItWorks = () => {
  return (
    <div className="how-it-works">
      <Header />
      <main>
        <section className="how-it-works-section">
          <h1>¿Cómo Funciona?</h1>
          <div className="steps">
            <div className="step">
              <h2>1. Regístrate</h2>
              <p>Crea tu cuenta como productor o consumidor</p>
            </div>
            <div className="step">
              <h2>2. Explora</h2>
              <p>Navega por los productos disponibles o publica tus productos</p>
            </div>
            <div className="step">
              <h2>3. Conecta</h2>
              <p>Realiza pedidos o recibe solicitudes de compra</p>
            </div>
            <div className="step">
              <h2>4. Entrega</h2>
              <p>Coordina la entrega de productos frescos</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks; 