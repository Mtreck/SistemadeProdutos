import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, title, children, type = 'info' }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className={`modal-content glass-morphism ${type}`}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-button" onClick={onClose}>
            <span className="material-icons-round">close</span>
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <button className="btn-modal-close" onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
