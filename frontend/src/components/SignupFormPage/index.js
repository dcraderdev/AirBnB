import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupFormPage.css";


function SignupFormPage({setShowSignupPage}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [signingUp, setSigningUp] = useState([true]);
  const history = useHistory()
  const formRef = useRef()

  if (sessionUser) return <Redirect to="/" />;



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

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setSigningUp(false)
      setShowSignupPage(false)
      history.goBack();
    }
  };
 
  return (
    <>
    {signingUp && (
    <div className="signup-form-page" onClick={handleClickOutside}>
      <div className="signup-form-page-container" ref={formRef}>
        <div className="signupHeader">Sign Up</div>
      <button className="close-button" onClick={() => {
        setSigningUp(false)
        setShowSignupPage(false)
        history.goBack();
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
    </div>
          )}
          </>
  );
}

export default SignupFormPage;