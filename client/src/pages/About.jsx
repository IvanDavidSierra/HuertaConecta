import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const About = () => {
  return (
    <div className="about">
      <Header />
      <main>
        <section className="about-section">
          <h1>Sobre Nosotros</h1>
          <p>HuertaConecta nace con la misión de conectar a productores locales con consumidores conscientes, 
             promoviendo el consumo de productos frescos y sostenibles.</p>
          <div className="mission-vision">
            <div className="mission">
              <h2>Nuestra Misión</h2>
              <p>Facilitar el acceso a productos frescos y de calidad, apoyando a los productores locales 
                 y promoviendo prácticas sostenibles.</p>
            </div>
            <div className="vision">
              <h2>Nuestra Visión</h2>
              <p>Ser la plataforma líder en la conexión entre productores y consumidores, 
                 contribuyendo a un sistema alimentario más sostenible y justo.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About; 