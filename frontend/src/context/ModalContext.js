import React, { createContext, useState } from 'react';

const ModalContext = createContext();

const ModalProvider = ({ children }) => {

  const [modal, setModal] = useState(null);
  const [needsRerender, setNeedsRerender] = useState(false);

  const openModal = (modalType) => {
    setModal(modalType);

  };

  const closeModal = () => {
    setModal(null);
  };

  const render = () => {
    setNeedsRerender(true)
  }


  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal, render, needsRerender, setNeedsRerender }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
 

