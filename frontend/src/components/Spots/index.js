//Spots
import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpotTile from '../SpotTile';
import SpotTileManage from '../SpotTileManage';
import * as spotActions from '../../store/spots';
import { ModalContext } from '../../context/ModalContext';

import './Spots.css';

const Spots = ({ page }) => {
  const [loaded, isLoaded] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [spots, setSpots] = useState([]);

  const dispatch = useDispatch();
  const allSpots = useSelector((state) => state.spots.spots);
  const userSpots = useSelector((state) => state.spots.userSpots);
  const {needsRerender, setNeedsRerender} = useContext(ModalContext)





  useEffect(() => {
    isLoaded(false)
    let action;
    if (page === 'home') action = spotActions.getAllSpotsThunk();
    if (page === 'manage') action = spotActions.getUsersSpotsThunk();
     
    if (action) {
      dispatch(action).then(() => {
        isLoaded(true);
        setNeedsRerender(false)
      });
    };

  }, [dispatch, page, needsRerender]);


  useEffect(() => {
    if (loaded) {

    }
  }, [loaded, page, allSpots, userSpots]);

  useEffect(() => {
    if (loaded) {
      if (page === 'home') {
        setSpots(allSpots);
      } else if (page === 'manage') {
        setSpots(userSpots.Spots);
      }
    }
  }, [loaded, page, allSpots, userSpots]);




  { (!loaded || needsRerender) && <div>Loading...</div>; }

  if (page === 'home' && loaded  && spots) {
    return (
      <>
        <div className="spots-wrapper">
          <div className="spots-grid">
            {spots.map((spot,index) => (

                <SpotTile
                key={index}
                spotId={spot.id}
                spot={spot}
                setFavorites={setFavorites}
                />
            ))}
          </div>
        </div>
      </>
    );
  }


  if (page === 'manage'  && loaded && spots && !needsRerender) {
    return (
      <>
      <div className='spots-manage-spots-header'>Manage Spots</div>
        <div className="spots-wrapper">
          <div className="spots-grid">
            {spots.map((spot,index) => (
              <SpotTileManage
                key={index}
                spot={spot}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
};

export default Spots;
