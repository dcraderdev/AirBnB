import React, { useEffect, useRef, useState, useContext } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import './LoginModal.css';
import { ModalContext } from '../../context/ModalContext';

function LoginModal({ closeModal }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [loggingIn, setLoggingIn] = useState([true]);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [signInErrors, setSignInErrors] = useState({});
  const [errors, setErrors] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const formRef = useRef(null);
  const { modal, openModal } = useContext(ModalContext);
  const [disabledButton, setDisabledButton] = useState(false);
  const [buttonClass, setButtonClass] = useState('signinDiv-button');
  const [buttonText, setButtonText] = useState('Log In');
  // if (sessionUser) return <Redirect to="/" />;

  const handleForgotPassword = () => {
    setLoggingIn(false);
    closeModal();
    history.push('/forgotPassword');
  };

  const handleSignUp = () => {
    setLoggingIn(false);
    closeModal();
    openModal('signup');
  };

  useEffect(() => {
    const errors = {};
    const loginErrors = {};

    if (!credential.length) errors['credential'] = 'Please enter a username';
    if (!password.length) errors['password'] = 'Please enter a password';

    if (credential.length < 4) {
      errors['credential'] = 'Please enter a username';
      loginErrors['credential'] = 'Username must be at least 4 characters';
    }
    if (password.length < 6) {
      errors['password'] = 'Please enter a password';
      loginErrors['password'] = 'Password must be at least 6 characters';
    }

    setValidationErrors(errors);
    setSignInErrors(loginErrors);
  }, [credential, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage([]);

    try {
      const { data, response } = await dispatch(
        sessionActions.login({ credential, password })
      );

      if (response.ok) closeModal();
    } catch (error) {
      console.error(error);
      setErrorMessage('The provided credentials were invalid');
      setDisabledButton(true);
      setButtonClass('signinDiv-button-disabled');
      setButtonText('The provided credentials were invalid');
      setTimeout(() => {
        setDisabledButton(false);
        setButtonClass('signinDiv-button');
        setButtonText('Log In');
      }, 3000);
    }
  };

  useEffect(() => {
    if (Object.keys(signInErrors).length > 0) {
      setButtonClass('signinDiv-button-disabled');
    } else {
      setButtonClass('signinDiv-button');
    }
  }, [signInErrors]);



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

console.log(Object.keys(signInErrors).length);

  return (
    <div className="signin-form-page-container" ref={formRef}>
      <div className="signinHeader">Sign In</div>
      <button
        className="close-button"
        onClick={() => {
          closeModal();
          setLoggingIn(false);
        }}
      >
        X
      </button>
      <form onSubmit={handleSubmit} className="signinDiv">
        <label className="user">
          Username
          <input
            className="userField"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder={validationErrors['credential'] || ''}
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
            placeholder={validationErrors['password'] || ''}
          />
        </label>
        <button
          type="submit"
          className={buttonClass}
          disabled={Object.keys(signInErrors).length > 0 || disabledButton}
        >
          {buttonText}
        </button>
      </form>
      <div className="altLinks">
        <div className="sign-up-link" onClick={handleSignUp}>
          Sign Up
        </div>
        <div className="forgot-password-link" onClick={handleForgotPassword}>
          Forgot password?
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
