import { createContext, useContext, useState } from 'react';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';

const ModalContext = createContext();

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [componentType, setComponentType] = useState(null);

  const openModal = (component) => {
    setShowModal(true);
    setComponentType(component);
  };

  const closeModal = () => {
    setShowModal(false);
    setComponentType(null);
  };

  const renderComponent = () => {
    switch (componentType) {
      case 'login':
        return <LoginFormPage closeModal={closeModal} />;
      case 'signup':
        return <SignupFormPage closeModal={closeModal} />;
      default:
        return null;
    }
  };

  return (
    <ModalContext.Provider value={{ showModal, openModal, closeModal }}>
      {children}
      {showModal && renderComponent()}
    </ModalContext.Provider>
  );
};