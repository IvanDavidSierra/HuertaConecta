import React from 'react';
import Header from '../components/layout/Header';
import './Home.css';
import logo from '../assets/huerta_conecta_logo.png';
import video from '../assets/huerta_conecta_main_video.mp4';
import FeatureSection from '../components/common/FeatureSection';
import Footer from '../components/layout/Footer';

const Home = () => {
  return (
    <div className="home-video-container">
      <video className="home-bg-video" autoPlay loop muted playsInline poster="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80">
        <source src={video} type="video/mp4" />
        Tu navegador no soporta el video de fondo.
      </video>
      <div className="home-overlay"/>
      <div className="home-content">
        <Header />
        <main className="snap-container">
          <div className="snap-section">
            <section className="hero">
              <img src={logo} alt="HuertaConecta Logo" className="hero-logo" />
              <h2>Conecta tu huerta con el mundo</h2>
              <div className="hero-features">
                <div>
                  <h3>Generador fácil de usar</h3>
                  <p>Construye tu red de huertas de forma intuitiva y rápida.</p>
                </div>
                <div>
                  <h3>Comparte y exporta</h3>
                  <p>Comparte tu progreso y conecta con otros productores y consumidores.</p>
                </div>
              </div>
            </section>
          </div>
          <div className="snap-section">
            <FeatureSection
              image="https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80"
              title="Prototipado Rápido"
              description="Herramienta poderosa para crear prototipos de tu huerta de manera rápida y sencilla."
              linkText="Saber más sobre prototipado"
              linkHref="#"
              features={[
                { title: 'Basado en Bootstrap', text: 'Diseño confiable y moderno para tu proyecto.' },
                { title: 'HTML5 & CSS3', text: 'Tecnologías probadas para los mejores resultados.' }
              ]}
            />
          </div>
          <div className="snap-section">
            <FeatureSection
              image="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
              title="Creamos Algo Nuevo"
              description="Un producto que ayuda a diseñadores y desarrolladores a crear sitios web para sus huertas de forma rápida."
              features={[
                { title: '30 nuevas páginas', text: 'Incluye componentes y bloques complejos.' },
                { title: 'Componentes útiles', text: 'Juega y experimenta con los bloques visuales.' }
              ]}
              reverse
            />
          </div>
          <div className="snap-section">
            <FeatureSection
              image="https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80"
              title="Consejos para tu Huerta"
              description="Descubre tips y trucos para mejorar tu huerta y compartir con la comunidad."
              linkText="Iniciar sesión"
              linkHref="#"
            />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Home; 