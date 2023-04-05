//Spots
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpotTile from '../SpotTile';
import * as spotActions from '../../store/spots';

import './Spots.css';

const Spots = () => {
  const [loaded, isLoaded] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const dispatch = useDispatch();
  const spots = useSelector((state) => {

    return state.spots.spots;
  });

  useEffect(() => {
    async function fetchData() {
      await dispatch(spotActions.getAllSpotsThunk()).then(()=>{
        isLoaded(true);
      })
    }
    fetchData();
  }, [dispatch]);


  if (!loaded) {
    return <div>Loading...</div>;
  }
return (
 
       <>
        <div className="spots-wrapper">
          <div className="spots-grid">
            {spots.map((spot) => (
              <SpotTile key={spot.id} spot={spot} setFavorites={setFavorites} />
            ))}
          </div>
        </div>
      </>
    );
  

  
};

export default Spots;
