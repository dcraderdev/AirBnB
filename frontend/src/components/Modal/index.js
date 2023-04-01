import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}></button>
        {children}
      </div>
    </div>,
    document.getElementById('portal')
  );
};

export default Modal;