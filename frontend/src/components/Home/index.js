import React, { useEffect,useRef, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './Home.css'
import Spots from '../Spots';


const Home = ({isLoaded}) => {
  const sessionUser = useSelector(state => state.session.user);
  return (
    <div>
      <Spots/>
    </div>
  )
}

export default Home