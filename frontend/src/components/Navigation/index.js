// frontend/src/components/Navigation/index.js
import React, { useState , useEffect}from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as sessionActions from '../../store/session';
import './Navigation.css';
import Logo from "./logo";


function Navigation(){

  const user = useSelector(state=> state.session.user)
  const history = useHistory()

  const navHost = () => {
    history.push('/host')
  }

  return (
    <nav className="nav-bar">
      <div className='nav-line'></div>
      <Logo />

      <div className='nav-user-buttons'>
        {user && (
          <div className='nav-host-button nav-button' onClick={navHost}>Airbnb your home</div>
          )}
          <ProfileButton />
      </div>


    </nav>
  );
}

export default Navigation;
