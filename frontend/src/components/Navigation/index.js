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
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [showProfileDiv, setShowProfileDiv] = useState(false);

  const handleProfileButtonClick = () => {
    setShowProfileDiv((prevShowProfileDiv) => !prevShowProfileDiv);
  };

  const handleProfileDivAction = () => {
    setShowProfileDiv(false);
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <nav className="navBar">
      <div className='navLine'></div>
      <Logo />
      <div className='profileButtonContainer'>
        <ProfileButton user={sessionUser} onClick={handleProfileButtonClick} />
      </div>
    </nav>
  );
}

export default Navigation;
