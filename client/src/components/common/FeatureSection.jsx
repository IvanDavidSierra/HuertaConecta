import React from 'react';
import './FeatureSection.css';

const FeatureSection = ({
  image,
  title,
  description,
  linkText,
  linkHref,
  features = [],
  reverse = false
}) => {
  return (
    <section className={`feature-section${reverse ? ' reverse' : ''}`}>
      <div className="feature-image-container">
        <img src={image} alt={title} className="feature-image" />
      </div>
      <div className="feature-content">
        <h2 className="feature-title">{title}</h2>
        <p className="feature-description">{description}</p>
        {linkText && linkHref && (
          <a href={linkHref} className="feature-link">{linkText} &gt;</a>
        )}
        {features.length > 0 && (
          <div className="feature-list">
            {features.map((f, idx) => (
              <div className="feature-list-item" key={idx}>
                <h4>{f.title}</h4>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeatureSection; 