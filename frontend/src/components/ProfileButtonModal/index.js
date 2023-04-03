import React, { useEffect, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import './ProfileButtonModal.css';
import LoginModal from '../LoginModal';
import SignupModal from '../SignupModal';
import { ModalContext } from '../../store/ModalContext';

function ProfileButtonModal({ closeModal }) {
  const history = useHistory();
  const modalRef = useRef();
  const dispatch = useDispatch();
  const { modal, openModal } = useContext(ModalContext);
  const formRef = useRef(null);
  const user = useSelector((state) => state.session.user);
   
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const logout = (e) => {
    dispatch(sessionActions.logout());
    history.push('/');
    closeModal();
  };
  const navHistory = () => {
    closeModal();
    history.push('/host')
  };
  const navHelp = () => {
    closeModal();
    history.push('/help')
  };
  const navModal = (type) => {
    closeModal();
    openModal(type)

  };

  return (
    <>
      <ul className='profileMenu' ref={formRef}>
        {user ? (
          <div>
            <div className='profile-user-welcome'>
              <div className='profile-icon'> <i className="fa-solid fa-user" /></div>
              <div className='profile-hello'>Hello, {user.firstName}!</div>

              <div className='profile-email'>{user.email}</div>
            </div>

            <div className='div-link' onClick={navHistory}>
              Host an experience/Manage Spots
            </div>

            <div className='profile-messages'>
            Messages
            </div>

            <div className='profile-reservations'>
            Reservations
            </div>

            <div className='profile-menu-logout' onClick={logout}>
              Logout
            </div>

          </div>

        ) : (
          <div>
            <div className='div-link' onClick={() => navModal('login')}>
              Sign In
            </div>
            <div className='div-link' onClick={() => navModal('signup')}>
              Sign Up
            </div>
            <div className='div-link' onClick={navHistory}>
              Airbnb your home
            </div>
            <div className='div-link' onClick={navHistory}>
              Host an experience
            </div>
            <div className='div-link' onClick={navHelp}>
              Help
            </div>
          </div>
        )}
      </ul>
    </>
  );
}

export default ProfileButtonModal;