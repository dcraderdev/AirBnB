import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const history = useHistory();

  const [modal, setModal] = useState(null);

  const openModal = (modalType) => {
    setModal(modalType);
  };

  const closeModal = () => {
    setModal(null);
  };

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
