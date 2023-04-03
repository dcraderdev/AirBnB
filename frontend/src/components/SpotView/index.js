import React, { useEffect, useState  } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as spotActions from '../../store/spots';


function SpotView() {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user); 
  const currentSpot = useSelector((state) => state.spots.currentSpot);

  useEffect(() => {
    if(user) dispatch(spotActions.getSpotThunk(spotId));
  }, [dispatch, spotId, user]);








  return (
    <div>
      <h1>Spot {spotId}</h1>
      {currentSpot ? (
        <div>
          <h2>{currentSpot.name}</h2>
          <p>{currentSpot.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SpotView;