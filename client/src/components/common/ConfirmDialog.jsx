import React from 'react';
import './ConfirmDialog.css';

const ConfirmDialog = ({ open, onClose, onConfirm, title, message, itemName }) => {
  if (!open) return null;
  
  return (
    <div className="confirm-backdrop">
      <div className="confirm-content">
        <h3>{title}</h3>
        <p>{message}</p>
        {itemName && <p className="item-name">"{itemName}"</p>}
        <div className="confirm-actions">
          <button className="confirm-btn" onClick={onConfirm}>
            Eliminar
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog; 