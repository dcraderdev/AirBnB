import React, { useEffect, useRef, useContext, useState } from 'react';
import { useHistory} from 'react-router-dom';
import { useDispatch, useSelector  } from 'react-redux';
import * as sessionActions from '../../store/session';
import { ModalContext } from '../../context/ModalContext';
import * as spotActions from '../../store/spots';

import './ProfileButtonModal.css';

function ProfileButtonModal() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { modal, openModal, closeModal, needsRerender, setNeedsRerender } = useContext(ModalContext);
  const formRef = useRef(null);
  const [isHost, setIsHost] = useState('')

  const user = useSelector(state => state.session.user);
  const userSpots = useSelector(state => state.spots.userSpots.Spots);



  useEffect(() => {
    if(user){
      if (userSpots.length) {
        setIsHost('Manage Spots')
      } else {
        setIsHost('Host a spot');
      }
    }
  }, [user, userSpots, needsRerender]);

  useEffect(() => {
    if(user){
      if(user){
        dispatch(spotActions.getUsersSpotsThunk()).then(() => {
          setNeedsRerender(false)
        });
      }
    }
  }, [user, needsRerender]);


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
    isHost === 'Manage Spots' && user ? history.push('/manage') : history.push('/host')
    
  };
  const navHelp = () => {
    closeModal();
    history.push('/')
  };
  const navModal = (type) => {
    closeModal();
    openModal(type)
  };




  return (
    
    <>
    <div className='ghost-button'></div>
      <ul className='profileMenu' ref={formRef}>
        {user ? (
          <div>
            <div className='profile-user-welcome'>
              <div className='profile-icon'> <i className="fa-solid fa-user" /></div>
              <div className='profile-hello'>Hello, {user.firstName}!</div>

              <div className='profile-email'>{user.email}</div>
            </div>

            <div className='div-link' onClick={navHistory}>
             {isHost}
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