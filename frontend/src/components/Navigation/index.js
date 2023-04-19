// frontend/src/components/Navigation/index.js
import React, { useEffect, useRef, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import * as spotActions from '../../store/spots';
import { ModalContext } from '../../context/ModalContext';
import ProfileButton from './ProfileButton';
// import Logo from "./logo";
import './Navigation.css';
import logo from "../../public/logo.png";
import "./logo.css";

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
    if(user){
      dispatch(spotActions.getUsersSpotsThunk()).then(() => {
        setNeedsRerender(false)
      });
    }
    isLoaded(true);
  }, [dispatch, needsRerender, user]);


  const handleLogoClick = () => {
    history.push('/');
  };


  return (
    <>
    {loaded && (
      <nav className="nav-bar">
      <div className='nav-line'></div>
      <img className='logo' src={logo} alt="Logo" onClick={handleLogoClick}/>


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
