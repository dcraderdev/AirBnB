import React, {useState, useEffect, useContext} from 'react'
import './ManageSpots.css'
import { useDispatch, useSelector } from 'react-redux';
import * as spotActions from '../../store/spots';
import Spots from '../Spots';

const ManageSpots = () => {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.session.user);
  const [loaded, isLoaded] = useState(false);
  const userSpots = useSelector((state) => {
    console.log(state);
    state.spots.userSpots});


  useEffect(()=>{ 
    isLoaded(false);

    dispatch(spotActions.getUsersSpotsThunk()).then(()=>{

      isLoaded(true);

    })
  },[])





  return (
    <>
      <Spots page={'manage'}/>

    </>
  )
}
export default ManageSpots