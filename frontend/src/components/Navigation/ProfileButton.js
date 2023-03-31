// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './Navigation.css';
import Logo from './logo';
import { useSelector } from 'react-dom';
import LoginFormPage from '../LoginFormPage';
import SignupFormPage from '../SignupFormPage';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [showSignupPage, setShowSignupPage] = useState(false);
  const formRef = useRef(null);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  useEffect(() => {
    if (showMenu) {
      const handleClick = (event) => {
        setShowMenu(false);
      };

      document.addEventListener('click', handleClick);

      return () => {
        document.removeEventListener('click', handleClick);
      };
    }
  }, [showMenu]);

  const ulClassName = showMenu ? 'profileMenu' : ' hidden';

  return (
    <div>
      <button className="profileButton" onClick={() => setShowMenu(!showMenu)}>
        <i className="fa-solid fa-bars" />
        <i className="fa-solid fa-user" />
      </button>

      <div>
        <ul className={ulClassName}>
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
                  setShowMenu(false);
                  setShowLoginPage(true);
                }}
              >
                Sign In
              </div>
              <div
                className="div-link"
                onClick={() => {
                  setShowMenu(false);
                  setShowSignupPage(true);
                }}
              >
                Sign Up
              </div>

              <div
                className="div-link"
                onClick={() => {
                  setShowMenu(false);
                  history.push('/host');
                }}
              >
                Airbnb your home
              </div>

              <div
                className="div-link"
                onClick={() => {
                  setShowMenu(false);
                  history.push('/host');
                }}
              >
                Host an experience
              </div>

              <div
                className="div-link"
                onClick={() => {
                  setShowMenu(false);
                  history.push('/help');
                }}
              >
                Help
              </div>
            </>
          )}
        </ul>
      </div>

      {showLoginPage && (
        <div className="modal-background">
          
          <div className="middle" >
            middleeeee
          {/* <div className="form-container" ref={formRef}>
            <LoginFormPage setShowLoginPage={setShowLoginPage}/>
          </div> */}

          </div>

        </div>
      )}


      {/* {showLoginPage && (
        <div className="modal-background">
          <div className="form-container" ref={formRef}>
            <LoginFormPage setShowLoginPage={setShowLoginPage}/>
          </div>
        </div>
      )} */}

      {showSignupPage && (
        <div className="modal-background">
          <div className="form-container" ref={formRef}>
            <SignupFormPage setShowSignupPage={setShowSignupPage} />
          </div>
        </div>

      )}
    </div>
  );
}

export default ProfileButton;
