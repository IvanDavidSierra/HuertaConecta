import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Services = () => {
  return (
    <div className="services">
      <Header />
      <main>
        <section className="services-section">
          <h1>Nuestros Servicios</h1>
          <div className="services-grid">
            <div className="service-card">
              <h2>Para Productores</h2>
              <ul>
                <li>Plataforma de venta directa</li>
                <li>Gestión de pedidos</li>
                <li>Estadísticas de ventas</li>
                <li>Comunicación con clientes</li>
              </ul>
            </div>
            <div className="service-card">
              <h2>Para Consumidores</h2>
              <ul>
                <li>Acceso a productos frescos</li>
                <li>Pedidos personalizados</li>
                <li>Seguimiento de entregas</li>
                <li>Calificación de productos</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services; 