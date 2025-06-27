import React from 'react';
import './Services.css';

const services = [
  {
    icon: '🌱',
    title: 'Gestión de Huertas',
    desc: 'Administra tus huertas de manera eficiente, registra cultivos, tareas y obtén reportes en tiempo real.'
  },
  {
    icon: '🤝',
    title: 'Conexión entre Productores',
    desc: 'Conecta con otros productores, comparte experiencias y crea redes de colaboración agrícola.'
  },
  {
    icon: '📈',
    title: 'Análisis y Reportes',
    desc: 'Visualiza el progreso de tus cultivos y accede a reportes detallados para mejorar tu producción.'
  },
  {
    icon: '🎓',
    title: 'Capacitación y Comunidad',
    desc: 'Accede a recursos educativos, talleres y participa en una comunidad activa de aprendizaje.'
  }
];

const Services = () => {
  return (
    <div className="services-bg">
      <div className="services-overlay">
        <div className="services-container">
          <h2 className="services-title">Nuestros Servicios</h2>
          <p className="services-desc">
            Descubre cómo HuertaConecta puede ayudarte a potenciar tu huerta y conectar con una comunidad agrícola innovadora.
          </p>
          <div className="services-list">
            {services.map((service, idx) => (
              <div className="service-card" key={idx}>
                <div className="service-icon">{service.icon}</div>
                <div className="service-title">{service.title}</div>
                <div className="service-desc">{service.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services; 