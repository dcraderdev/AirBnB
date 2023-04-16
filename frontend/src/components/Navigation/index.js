// frontend/src/components/Navigation/index.js
import React, { useEffect, useRef, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import * as spotActions from '../../store/spots';
import { ModalContext } from '../../context/ModalContext';
import ProfileButton from './ProfileButton';
import Logo from "./logo";
import './Navigation.css';


function Navigation(){
  const history = useHistory()
  const dispatch = useDispatch();
  const { modal, openModal, closeModal, needsRerender, setNeedsRerender } = useContext(ModalContext);
  const [loaded, isLoaded] = useState(false);

  const user = useSelector(state=> state.session.user)
  const userSpots = useSelector(state => state.spots.userSpots.Spots);

  const navHost = () => {
    history.push('/host')
  }

  useEffect(() => {
    isLoaded(false)
    dispatch(spotActions.getUsersSpotsThunk()).then(() => {
      setNeedsRerender(false)
    });
    isLoaded(true);
  }, [dispatch, needsRerender]);

  return (
    <>
    {loaded && (
      <nav className="nav-bar">
      <div className='nav-line'></div>
      <Logo />

      <div className='nav-user-buttons'>
        {user && (
          <div className='nav-host-button nav-button' onClick={navHost}>Airbnb your home</div>
          )}
          <ProfileButton user={user}/>
      </div>
    </nav>
    )}
    </>
  );
}

export default Navigation;
