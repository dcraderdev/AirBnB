import React, { useEffect, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import './ProfileButtonModal.css';
import LoginModal from '../LoginModal';
import SignupModal from '../SignupModal';
import { ModalContext } from '../../context/ModalContext';

function ProfileButtonModal() {
  const history = useHistory();
  const modalRef = useRef();
  const dispatch = useDispatch();
  const { modal, openModal, closeModal } = useContext(ModalContext);
  const formRef = useRef(null);

   const user = useSelector((state) => state.session.user);
   

  const logout = (e) => {
    dispatch(sessionActions.logout());
    history.push('/');
    closeModal();
  };

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



  return (
    <>
      <ul className='profileMenu'>
        {user ? (
          <div>


            <div className='profile-menu-welcome'>
            Hello, {user.firstName}!
            </div>
            <div className=''>
            Hello, {user.email}!
            </div>

            <div className=''>
              {user.email}
            </div>

            <div className='profile-menu-logout' onClick={() => logout()}>
              Logout
            </div>



          </div>

        ) : (
          <div>
            <div className='div-link' onClick={() => openModal('login')}>
              Sign In
            </div>
            <div className='div-link' onClick={() => openModal('signup')}>
              Sign Up
            </div>
            <div className='div-link' onClick={() => history.push('/host')}>
              Airbnb your home
            </div>
            <div className='div-link' onClick={() => history.push('/host')}>
              Host an experience
            </div>
            <div className='div-link' onClick={() => history.push('/help')}>
              Help
            </div>
            <div className='div-link' onClick={() => logout()}>
              Logout
            </div>
          </div>
        )}
      </ul>
    </>
  );
}

export default ProfileButtonModal;