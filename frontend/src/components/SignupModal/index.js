import React, { useEffect, useRef, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import "./SignupModal.css";


function SignupModal({ closeModal }) {

  const sessionUser = useSelector((state) => state.session.user);
  const [signingUp, setSigningUp] = useState([true]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory()
  const formRef = useRef()

  // if (sessionUser) return <Redirect to="/" />;


  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


 
  return (
    <>
    {signingUp && (
      <div className="signup-form-page-container" ref={formRef}>
        <div className="signupHeader">Sign Up</div>
      <button className="close-button" onClick={() => {
        closeModal();
        setSigningUp(false);

        }}>
        X
      </button>
        <form onSubmit={handleSubmit} className="signupDiv">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label className="emailLabel">
            Email
            <input
              className="emailField"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Username
            <input
              className="usernameField"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            First Name
            <input
              className="firstnameField"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          <label>
            Last Name
            <input
              className="lastnameField"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              className="passwordField"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>
            Confirm Password
            <input
              className="confirmPasswordField"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="signupDiv-button">
            Sign Up
          </button>
        </form>
      </div>
          )}
          </>
  );
}

export default SignupModal;



// import React, { useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
// import * as sessionActions from "../../store/session";
// import "./SignupModal.css";

// function SignupModal({ closeModal }) {
//   const dispatch = useDispatch();
//   const sessionUser = useSelector((state) => state.session.user);
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errors, setErrors] = useState([]);
//   const [signingUp, setSigningUp] = useState(true);
//   const formRef = useRef(null);

//   if (sessionUser) return <Redirect to="/" />;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors([]);
//     if (password === confirmPassword) {
//       try {
//         const result = await dispatch(
//           sessionActions.signup({ email, username, firstName, lastName, password })
//         );
//         if (result.status < 400) {
//           closeModal();
//         }
//       } catch (error) {
//         const data = await error.json();
//         if (data && data.errors) {
//           setErrors(data.errors);
//         }
//       }
//     } else {
//       setErrors(["Confirm Password field must be the same as the Password field"]);
//     }
//   };

//   const handleClickOutside = (event) => {
//     if (formRef.current && !formRef.current.contains(event.target)) {
//       closeModal();
//       setSigningUp(false);
//     }
//   };

//   return (
//     <div className="signup-form-page-container" ref={formRef}>
//       <div className="signupHeader">Sign Up</div>
//       <button
//         className="close-button"
//         onClick={() => {
//           closeModal();
//           setSigningUp(false);
//         }}
//       >
//         X
//       </button>
//       <form onSubmit={handleSubmit} className="signupDiv">
//         <ul>
//           {errors.map((error, idx) => (
//             <li key={idx}>{error}</li>
//           ))}
//         </ul>
//         <label className="emailLabel">
//           Email
//           <input
//             className="emailField"
//             type="text"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Username
//           <input
//             className="usernameField"
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           First Name
//           <input
//             className="firstnameField"
//             type="text"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Last Name
//           <input
//             className="lastnameField"
//             type="text"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Password
//           <input
//             className="passwordField"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Confirm Password
//           <input
//             className="confirmPasswordField"
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </label>
//            <button type="submit" className="signupDiv-button">
//              Sign Up
//            </button>
//       </form>
//     </div>
//            )
  
// }
 

//  export default SignupModal;