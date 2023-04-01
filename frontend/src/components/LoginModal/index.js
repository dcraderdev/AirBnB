import React, { useEffect, useRef, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './LoginModal.css';

function LoginModal({ closeModal }) {




  const sessionUser = useSelector((state) => state.session.user);
  const [loggingIn, setLoggingIn] = useState([true]);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const formRef = useRef(null);

  // if (sessionUser) return <Redirect to="/" />;


  const handleForgotPassword = () => {
    history.push('/forgotPassword');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      const result = await dispatch(
        sessionActions.login({ credential, password })
      );

      if (result.status < 400) {
        closeModal();
      }
    } catch (error) {
      const data = await error.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    }
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
    <div className="signin-form-page-container" ref={formRef}>
      <div className="signinHeader">Sign In</div>
      <button className="close-button" onClick={() => {
          closeModal();
          setLoggingIn(false);
        }}
      >
        X
      </button>
      <form onSubmit={handleSubmit} className="signinDiv">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label className="user">
          Username
          <input
            className="userField"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label className="pass">
          Password
          <input
            className="passwordField"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="signinDiv-button">
          Log In
        </button>
      </form>
      <a className="forgot-password-link" onClick={handleForgotPassword}>
        Forgot password?
      </a>
    </div>
  );
}

export default LoginModal;
