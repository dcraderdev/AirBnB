// frontend/src/components/Navigation/ProfileButton.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './Navigation.css';
import Logo from './logo';
import { useSelector } from 'react-dom';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory()

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  console.log(user);

  const ulClassName = showMenu ? 'profileMenu' : ' hidden';

  return (
    <>
      <button className="profileButton" onClick={() => setShowMenu(!showMenu)}>
        {/* <i className="fas fa-user-circle" /> */}
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
              <div className="div-link" onClick={()=>history.push("/login")}>
              Sign In
              </div>
              <div className="div-link" onClick={()=>history.push("/signup")}>
              Sign Up
              </div>


            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default ProfileButton;
