//Spots
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpotTile from '../SpotTile';
import SpotTileManage from '../SpotTileManage';
import * as spotActions from '../../store/spots';

import './Spots.css';

const Spots = ({ page }) => {
  const [loaded, isLoaded] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [spots, setSpots] = useState([]);

  const dispatch = useDispatch();
  const allSpots = useSelector((state) => state.spots.spots);
  const userSpots = useSelector((state) => state.spots.userSpots);




  useEffect(() => {

      let action;
      if (page === 'home') action = spotActions.getAllSpotsThunk();
      if (page === 'manage') action = spotActions.getUsersSpotsThunk();
       
      if (action) {
        dispatch(action).then(() => {
          isLoaded(true);
        });
      };

  }, [dispatch, page]);


  useEffect(() => {
    if (loaded) {
      if (page === 'home') {
        setSpots(allSpots);
      } else if (page === 'manage') {
        setSpots(userSpots.Spots);
      }
    }
  }, [loaded, page, allSpots, userSpots]);






  { !loaded && <div>Loading...</div>; }

  if (page === 'home') {
    return (
      <>
        <div className="spots-wrapper">
          <div className="spots-grid">
            {spots.map((spot) => (
              <SpotTile
                key={spot.id}
                spot={spot}
                setFavorites={setFavorites}
                page={page}
              />
            ))}
          </div>
        </div>
      </>
    );
  }

  if (page === 'manage' && spots) {
    return (
      <>
        <div className="spots-wrapper">
          <div className="spots-grid">
            {spots.map((spot) => (
              <SpotTileManage
                key={spot.id}
                spot={spot}
                setFavorites={setFavorites}
                page={page}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
};

export default Spots;
