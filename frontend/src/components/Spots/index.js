import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from '../../store/spots';
import SpotTile from '../SpotTile';
import * as spotActions from '../../store/spots';

import './Spots.css';

const Spots = () => {

  const [loading, setLoading] = useState(true);

const dispatch = useDispatch()
const spots = useSelector(state=>{
  console.log('********');
    console.log(state.spots.spots.Spots);
    return state.spots.spots.Spots
  })


  useEffect(() => {
    async function fetchData() {
      await dispatch(spotActions.getAllSpotsThunk());
      setLoading(false);
    }
    fetchData();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }


if(!loading){
  return (
    <>
      <div className="spots-grid">
        {spots.map((spot) => (
          <SpotTile key={spot.id} spot={spot} />
        ))}
      </div>
    </>
  )}
};

export default Spots;