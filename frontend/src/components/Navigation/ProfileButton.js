// frontend/src/components/Navigation/ProfileButton.js
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import "./Navigation.css";
import Logo from "./logo";


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div>
      <button onClick={() => setShowMenu(!showMenu)}>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login" className="nav-link">
                Sign In
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup" className="nav-link">
                Sign Up
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;