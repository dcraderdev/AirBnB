import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import ProfileButtonModal from '../ProfileButtonModal';

import './Navigation.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };



  useEffect(() => {
    if (!showModal) return;

    const handleNextClick = () => {
      setShowModal(false);
    };

    document.addEventListener('click', handleNextClick);

    return () => {
      document.removeEventListener('click', handleNextClick);
    };
  }, [showModal]);


  return (
    <div>
      <button className='profileButton' onClick={toggleModal}>
        <i className='fa-solid fa-bars' />
        <i className='fa-solid fa-user' />
      </button>
      {showModal && <ProfileButtonModal />}
    </div>
  );
}

export default ProfileButton;

