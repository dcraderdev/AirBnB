import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as spotActions from '../../store/spots';


function SpotView() {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(spotActions.getSpotThunk(spotId));
  }, [dispatch, spotId]);

  const currentSpot = useSelector(state => {
    return state.spots.currentSpot;
  });

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