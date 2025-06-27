import React from 'react';
import './HowItWorks.css';

const steps = [
  {
    icon: '📝',
    title: 'Regístrate',
    desc: 'Crea tu cuenta en HuertaConecta de forma rápida y sencilla.'
  },
  {
    icon: '🌿',
    title: 'Crea tu huerta',
    desc: 'Agrega información sobre tu huerta, cultivos y tareas.'
  },
  {
    icon: '🤝',
    title: 'Conecta y colabora',
    desc: 'Únete a la comunidad, comparte experiencias y recibe apoyo.'
  },
  {
    icon: '📊',
    title: 'Gestiona y crece',
    desc: 'Lleva el control de tu producción y accede a reportes y recursos.'
  }
];

const HowItWorks = () => {
  return (
    <div className="how-bg">
      <div className="how-overlay">
        <div className="how-container">
          <h2 className="how-title">¿Cómo funciona HuertaConecta?</h2>
          <p className="how-desc">
            Sigue estos sencillos pasos para comenzar a gestionar y potenciar tu huerta con nuestra plataforma.
          </p>
          <div className="how-list">
            {steps.map((step, idx) => (
              <div className="how-card" key={idx}>
                <div className="how-icon">{step.icon}</div>
                <div className="how-step-title">{step.title}</div>
                <div className="how-step-desc">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks; 