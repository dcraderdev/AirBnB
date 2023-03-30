import React, { useEffect,useRef, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage({ setShowLoginPage }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [loggingIn, setLoggingIn] = useState([true])
  const formRef = useRef(null);
  const history = useHistory();

  const handleForgotPassword = () => {
    history.push('/forgotPassword');
  };

  useEffect(()=>{
    setLoggingIn(true)
  },[])


  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  



  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setLoggingIn(false)
      setShowLoginPage(false)
    }
  };



  return (
    <>
      {loggingIn && (
        <div className="login-form-page-container">
        <div className="signinHeader">Sign In</div>

            <button className="close-button" onClick={() => {
              setLoggingIn(false)
              setShowLoginPage(false)

              history.goBack();
              }}>
              X
            </button>
            <div className="logInDiv">
              <form onSubmit={handleSubmit}>
                <ul>
                  {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                </ul>
                <label className='user' >
                  Username
                  <input
                    className='userField'
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                  />
                </label>
                <label className='pass'>
                  Password
                  <input
                  className='passwordField'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
                <button type="submit">Log In</button>
              </form>
              <a
                className="forgot-password-link"
                onClick={handleForgotPassword}
              >
                Forgot password?
              </a>
            </div>
          </div>

      )}
    </>
  );
}

export default LoginFormPage;