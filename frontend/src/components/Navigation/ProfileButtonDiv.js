// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './Navigation.css';

import LoginFormPage from '../LoginFormPage';
import SignupFormPage from '../SignupFormPage';

function ProfileButtonDiv({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showLoginPage, setShowLoginPage] = useState(false);
  const [showSignupPage, setShowSignupPage] = useState(false);
  const formRef = useRef(null);


  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };




  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      history.goBack();
    }
  };



  return (
    <>
      <div className='profileMenu' >
        <ul>
          {user ? (
            <>
              <li>{user.username}</li>
              <li>
                {user.firstName} {user.lastName}
              </li>
              <li>{user.email}</li>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
            </>
          ) : (
            <>
              <div
                className="div-link"
                onClick={() => {
                  // history.push('/login');
                  setShowLoginPage(true)
                }}
              >
                Sign In
              </div>
              <div
                className="div-link"
                onClick={() => {
                  // history.push('/signup');
                  setShowSignupPage(true)
                }}
              >
                Sign Up
              </div>

              <div
                className="div-link"
                onClick={() => {
                  history.push('/host');
                }}
              >
                Airbnb your home
              </div>

              <div
                className="div-link"
                onClick={() => {
                  history.push('/host');
                }}
              >
                Host an experience
              </div>

              <div
                className="div-link"
                onClick={() => {
                  history.push('/help');
                }}
              >
                Help
              </div>
            </>
          )}
        </ul>
      </div>


{showLoginPage && 
  <div className="login-form-container">
    <LoginFormPage/>
  </div>}


{showSignupPage && <SignupFormPage/>}

</>

  );
}

export default ProfileButtonDiv;

