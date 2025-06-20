import React from 'react';
import Header from '../components/layout/Header';
import './Home.css';
import logo from '../assets/huerta_conecta_logo.png';
import video from '../assets/huerta_conecta_main_video.mp4';
import FeatureSection from '../components/common/FeatureSection';
import Footer from '../components/layout/Footer';
import homeImageUno from '../assets/home-image-uno.jpg';
import homeImageTwo from '../assets/home-image-two.jpg';
import homeImageThree from '../assets/home-image-three.jpg';

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
            </section>
          </div>
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
        <Footer />
      </div>
    </div>
  );
};

export default Home; 