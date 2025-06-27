import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-bg">
      <div className="about-overlay">
        <div className="about-container">
          <h2 className="about-title">Sobre HuertaConecta</h2>
          <p className="about-desc">
            En HuertaConecta creemos en el poder de la agricultura colaborativa y sostenible. Nuestra misión es conectar a productores, comunidades y empresas para impulsar el desarrollo de huertas urbanas y rurales, promoviendo la innovación, el aprendizaje y el respeto por la naturaleza.
          </p>
          <div className="about-section">
            <h3 className="about-subtitle">Nuestra Visión</h3>
            <p>
              Ser la plataforma líder en gestión y conexión de huertas, facilitando el acceso a tecnología, conocimiento y redes de apoyo para todos los actores del sector agrícola.
            </p>
          </div>
          <div className="about-section">
            <h3 className="about-subtitle">Nuestros Valores</h3>
            <ul className="about-values">
              <li>Colaboración</li>
              <li>Sostenibilidad</li>
              <li>Innovación</li>
              <li>Respeto por la naturaleza</li>
              <li>Educación y comunidad</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 