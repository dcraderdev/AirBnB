// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './Navigation.css';
import Logo from './logo';
import { useSelector } from 'react-dom';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const menuRef = useRef();
  const buttonRef = useRef();

  const [hideTimeout, setHideTimeout] = useState(null);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target))
        setShowMenu(false);
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
        document.removeEventListener('mousedown', handleClickOutside);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  const ulClassName = showMenu ? 'profileMenu' : ' hidden';

  return (
    <div>
      <button
        ref={buttonRef}
        className="profileButton"
        onClick={() => setShowMenu(!showMenu)}
      >
        {/* <i className="fas fa-user-circle" /> */}
        <i className="fa-solid fa-bars" />
        <i className="fa-solid fa-user" />
      </button>

      <div ref={menuRef}>
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
                  history.push('/login');
                }}
              >
                Sign In
              </div>
              <div
                className="div-link"
                onClick={() => {
                  setShowMenu(false);
                  history.push('/signup');
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
    </div>
  );
}

export default ProfileButton;
