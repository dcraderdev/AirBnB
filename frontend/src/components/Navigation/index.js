// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState , useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as sessionActions from '../../store/session';
import './Navigation.css';
import Logo from "./logo";


function Navigation({ isLoaded }){

  const dispatch = useDispatch();


  return (
    <nav className="navBar">
      <div className='navLine'></div>
      <Logo />
      <div className='profileButtonContainer'>
        <ProfileButton />
      </div>
    </nav>
  );
}

export default Navigation;
