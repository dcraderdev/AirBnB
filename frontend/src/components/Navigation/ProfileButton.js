import React, { useEffect, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import ProfileButtonModal from '../ProfileButtonModal';
import { ModalContext } from '../../context/ModalContext';

import './Navigation.css';

function ProfileButton({ user }) {
  const { modal, openModal, closeModal } = useContext(ModalContext);

  const buttonClass = `profileButton${modal === 'profileMenu' ? ' profileButtonActive' : ''}`;

  return (
    <div>
      <button
        className={buttonClass}
        onClick={() => {openModal('profileMenu')}}
      >
        <i className="fa-solid fa-bars" />
        <i className="fa-solid fa-user" />
      </button>
    </div>
  );
}

export default ProfileButton;
