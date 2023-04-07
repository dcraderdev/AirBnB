import React, { useEffect, useRef, useContext, useState } from 'react';
import { useHistory} from 'react-router-dom';
import { useDispatch, useSelector  } from 'react-redux';
import * as sessionActions from '../../store/session';
import './ProfileButtonModal.css';
import LoginModal from '../LoginModal';
import SignupModal from '../SignupModal';
import { ModalContext } from '../../context/ModalContext';

function ProfileButtonModal({ closeModal }) {
  const history = useHistory();
  const modalRef = useRef();
  const dispatch = useDispatch();
  const { modal, openModal } = useContext(ModalContext);
  const formRef = useRef(null);
  const [hostText, setHostText] = useState('text')

  const user = useSelector((state) => {
    return state.session.user
  });





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
             {hostText}
            </div>

            <div className='profile-messages'>
            Messages
            </div>

            <div className='profile-reservations'>
            Reservations
            </div>

            <div className='profile-favorites'>
            Favorites
            </div>

            <button className='profile-menu-logout-button' onClick={logout}>
              Logout
            </button>

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