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
          <div className="spots-wrapper">

      <div className="spots-grid">
        {spots.map((spot) => (
          <SpotTile key={spot.id} spot={spot} />
        ))}
      </div>
      </div>
    </>
  )}
};

export default Spots;


// const body ={
//   "address": "1804 garnet ave box 711",
//   "body": "United States",
//   "city": "san diego",
//   "description": "14",
//   "lat": "14",
//   "lng": "14",
//   "spotPreviewImage": "14.jpg",
//   "spotPrice": "14",
//   "spotTitle": "14",
//   "state": "CA"
// }

// "country": "Country is required",
// "name": "Name is required",
// "price": "Price per day is required"