import React from 'react'
import { NavLink } from 'react-router-dom';
import {useHistory} from 'react-router-dom'
import logo from "./logo.png";
import "./logo.css";


export const Logo = () => {
  const history = useHistory();
  const handleLogoClick = () => {
    history.push('/');
  };
  return (
    <>
    <img className='logo' src={logo} alt="Logo" onClick={handleLogoClick}/>
    </>
  )
}

export default Logo
