import React from 'react';
import './Home.css';
import logo from '../assets/huerta_conecta_logo.png';
import video from '../assets/huerta_conecta_main_video.mp4';
import FeatureSection from '../components/common/FeatureSection';
import homeImageUno from '../assets/home-image-uno.jpg';
import homeImageTwo from '../assets/home-image-two.jpg';
import homeImageThree from '../assets/home-image-three.jpg';

const features = [
  {
    title: 'Gestión de Huertas',
    desc: 'Administra y monitorea tus cultivos de manera sencilla y eficiente.'
  },
  {
    title: 'Comunidad',
    desc: 'Conecta con otros productores y comparte experiencias.'
  },
  {
    title: 'Reportes Inteligentes',
    desc: 'Visualiza el progreso y accede a reportes detallados.'
  },
  {
    title: 'Recursos y Aprendizaje',
    desc: 'Accede a talleres, guías y recursos educativos.'
  }
];

const Home = () => {
  return (
    <div className="home-video-container">
      <section className="hero-split">
        <div className="hero-split-left">
          <img src={logo} alt="HuertaConecta Logo" className="hero-split-logo" />
          <h1 className="hero-split-title">Conecta tu huerta con el mundo</h1>
          <p className="hero-split-desc">La plataforma para gestionar, aprender y compartir sobre agricultura sostenible.</p>
          <div className="hero-split-btns">
            <a href="/auth" className="hero-split-btn main">Comenzar</a>
          </div>
        </div>
        <div className="hero-split-right">
          <video className="hero-split-video" autoPlay loop muted playsInline poster="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80">
            <source src={video} type="video/mp4" />
            Tu navegador no soporta el video de fondo.
          </video>
          <div className="hero-split-video-overlay" />
        </div>
      </section>
      <section className="features-hero-bg" style={{backgroundImage: `url(${homeImageUno})`}}>
        <div className="features-hero-overlay" />
        <div className="features-hero-content">
          <h2 className="features-hero-title">¿Por qué elegir HuertaConecta?</h2>
          <p className="features-hero-desc">Descubre las ventajas de nuestra plataforma para tu huerta y tu comunidad.</p>
          <ul className="features-hero-list">
            {features.map((f, idx) => (
              <li key={idx} className="features-hero-item">
                <span className="features-hero-item-title">{f.title}</span>
                <span className="features-hero-item-desc">{f.desc}</span>
              </li>
            ))}
          </ul>
          <a href="/servicios" className="features-hero-btn">Descubre nuestros servicios</a>
        </div>
      </section>
      <div className="home-content">
        <main className="snap-container">
          <div className="snap-section">
            <FeatureSection
              image={homeImageUno}
              title="Sobre Nosotros"
              description="Somos una comunidad apasionada por la agricultura urbana y la tecnología, dedicada a conectar personas que desean transformar sus espacios en huertas productivas y sostenibles."
              linkText=""
              linkHref="#"
              features={[
                { title: 'Compromiso Social', text: 'Fomentamos la colaboración y el aprendizaje entre los miembros de la comunidad.' },
                { title: 'Innovación', text: 'Utilizamos tecnología para facilitar el acceso a recursos y conocimientos sobre huertas.' }
              ]}
            />
          </div>
          <div className="snap-section">
            <FeatureSection
              image={homeImageTwo}
              title="Nuestros Servicios"
              description="Ofrecemos herramientas y asesoría para que puedas diseñar, gestionar y optimizar tu huerta desde cualquier lugar."
              features={[
                { title: 'Asesoría Personalizada', text: 'Recibe recomendaciones y acompañamiento de expertos en agricultura urbana.' },
                { title: 'Gestión Digital', text: 'Administra tu huerta, registra cultivos y accede a recursos desde nuestra plataforma.' }
              ]}
              reverse
            />
          </div>
          <div className="snap-section">
            <FeatureSection
              image={homeImageThree}
              title="¿Cómo Funciona?"
              description="Conéctate, diseña tu huerta y accede a una red de apoyo y recursos en solo tres pasos."
              linkText="Iniciar sesión"
              linkHref="#"
              features={[
                { title: 'Diseña y Gestiona', text: 'Utiliza nuestras herramientas para planificar y monitorear tu huerta.' },
              ]}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home; 