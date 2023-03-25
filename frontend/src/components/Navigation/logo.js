import React from 'react'
import { NavLink } from 'react-router-dom';
import {useHistory} from 'react-router-dom'

export const Logo = () => {
  const history = useHistory();
  const handleLogoClick = () => {
    history.push('/');
  };
  return (
    <div onClick={handleLogoClick}>Logo</div>
  )
}

export default Logo