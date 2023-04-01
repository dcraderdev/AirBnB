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
import Modal from '../Modal';

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
    if (!showMenu) return;

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


  // useEffect(() => {

  //   console.log(showLoginPage);
  //   console.log(showLoginPage);

  //   if (!showLoginPage) return;

  //   const closeMenu = (e) => {
  //     if(formRef){
  //     if (!formRef.current.contains(e.target)) {
  //       setShowLoginPage(false);
  //     }
  //   }}

  //   document.addEventListener('click', closeMenu);

  //   return () => document.removeEventListener("click", closeMenu);
  // }, [showLoginPage]);







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
            <div>
              <li>{user.username}</li>
              <li>
                {user.firstName} {user.lastName}
              </li>
              <li>{user.email}</li>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
            </div>
          ) : (
            <div>
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
            </div>
          )}
        </ul>
      </div>

      {/* {showLoginPage && (
        <div ref={formRef}>
          <LoginFormPage setShowLoginPage={setShowLoginPage} />
        </div>
      )}


      {showSignupPage && (
        <div ref={formRef}>
          <SignupFormPage setShowSignupPage={setShowSignupPage} />
        </div>
      
      )} */}

      <Modal isOpen={showLoginPage} onClose={() => setShowLoginPage(false)}>
        <LoginFormPage setShowLoginPage={setShowLoginPage} />
      </Modal>

      <Modal isOpen={showSignupPage} onClose={() => setShowSignupPage(false)}>
        <SignupFormPage setShowSignupPage={setShowSignupPage} />
      </Modal>  




      </div>
    
  );
}

export default ProfileButton;



// function ProfileButton({ user }) {
//   const dispatch = useDispatch();
//   const [showMenu, setShowMenu] = useState(false);
//   const history = useHistory();
//   const [showLoginPage, setShowLoginPage] = useState(false);
//   const [showSignupPage, setShowSignupPage] = useState(false);

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(sessionActions.logout());
//   };

//   const ulClassName = showMenu ? 'profileMenu' : 'hidden';

//   return (
//     <div>
//       <button className="profileButton" onClick={() => setShowMenu(!showMenu)}>
//         <i className="fa-solid fa-bars" />
//         <i className="fa-solid fa-user" />
//       </button>

//       <div>
//         <ul className={ulClassName}>
//           {user ? (
//             <div>
//               <li>{user.username}</li>
//               <li>
//                 {user.firstName} {user.lastName}
//               </li>
//               <li>{user.email}</li>
//               <li>
//                 <button onClick={logout}>Log Out</button>
//               </li>
//             </div>
//           ) : (
//             <div>
//               <li
//                 onClick={() => {
//                   setShowMenu(false);
//                   setShowLoginPage(true);
//                 }}
//               >
//                 Sign In
//               </li>
//               <li
//                 onClick={() => {
//                   setShowMenu(false);
//                   setShowSignupPage(true);
//                 }}
//               >
//                 Sign Up
//               </li>
//               <li
//                 onClick={() => {
//                   setShowMenu(false);
//                   history.push('/host');
//                 }}
//               >
//                 Airbnb your home
//               </li>

//               <li
//                 onClick={() => {
//                   setShowMenu(false);
//                   history.push('/host');
//                 }}
//               >
//                 Host an experience
//               </li>

//               <li
//                 onClick={() => {
//                   setShowMenu(false);
//                   history.push('/help');
//                 }}
//               >
//                 Help
//               </li>
//             </div>
//           )}
//         </ul>
//       </div>

//       <Modal isOpen={showLoginPage} onClose={() => setShowLoginPage(false)}>
//         <LoginFormPage setShowLoginPage={setShowLoginPage} />
//       </Modal>

//       <Modal isOpen={showSignupPage} onClose={() => setShowSignupPage(false)}>
//         <SignupFormPage setShowSignupPage={setShowSignupPage} />
//       </Modal>
//     </div>
//   );
// }

// export default ProfileButton;
