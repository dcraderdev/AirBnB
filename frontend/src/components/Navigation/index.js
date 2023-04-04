// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useState , useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as sessionActions from '../../store/session';
import './Navigation.css';
import Logo from "./logo";


function Navigation({ isLoaded }){

  const dispatch = useDispatch();

  const user = useSelector(state=>{return state.session.user})

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
          <div className='nav-host-div' onClick={navHost}>Airbnb your home</div>
          )}
          <ProfileButton />
      </div>


    </nav>
  );
}

export default Navigation;
