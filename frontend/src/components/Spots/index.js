import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import SpotTile from '../SpotTile';

import './Spots.css';

const Spots = () => {

  const spots = useSelector(state=>{
    return state.spots.spots.Spots
  })

  console.log('-=-=-=-=-=-');
  console.log(spots);
  console.log('-=-=-=-=-=-');
  return (
    <>
      <div className="spots-grid">
        {spots.map((spot) => (
          <SpotTile key={spot.id} spot={spot} />
        ))}
      </div>
    </>
  );
};

export default Spots;