// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState , useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import ProfileDiv from './ProfileDiv';
import * as sessionActions from '../../store/session';
import './Navigation.css';
import Logo from "./logo";



// store states
// store islcicked prolfile button
// store state is loginbutton clicked
// turn state off if signin happens
// store state is signup button clikced
// turn state off if signup happens


// signup is comp
// signin  is comp
// loginbutton is comp


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
      <Logo />
      <ProfileButton user={sessionUser} onClick={handleProfileButtonClick} />
      {showProfileDiv && (
        <ProfileDiv
          user={sessionUser}
          onAction={handleProfileDivAction}
          logout={logout}
        />
      )}
    </nav>
  );
}

export default Navigation;
// onCLick={setSignInClick(!signInClick)}