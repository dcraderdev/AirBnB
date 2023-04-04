//Spots
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpotTile from '../SpotTile';
import * as spotActions from '../../store/spots';

import './Spots.css';

const Spots = () => {
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const dispatch = useDispatch();
  const spots = useSelector((state) => {
    return state.spots.spots.Spots;
  });

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

  if (!loading) {
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
  }
};

export default Spots;
