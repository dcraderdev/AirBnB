//Spots
import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpotTile from '../SpotTile';
import SpotTileManage from '../SpotTileManage';
import * as spotActions from '../../store/spots';
import { ModalContext } from '../../context/ModalContext';

import './Spots.css';

const Spots = ({ page }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [spots, setSpots] = useState([]);

  const dispatch = useDispatch();
  const allSpots = useSelector((state) => state.spots.spots);
  const user = useSelector((state) => state.session.user);
  const userSpots = useSelector((state) => state.spots.userSpots);
  const { needsRerender, setNeedsRerender } = useContext(ModalContext);


  useEffect(() => {
  }, []);
  
  
  
  useEffect(() => {
    setIsLoaded(false);
    if (!user) {
      dispatch(spotActions.getAllSpotsThunk()).then(() => {
        
        
        setTimeout(() => {
          setIsLoaded(true);
        }, 1000);
        setNeedsRerender(false);
        return
      });
    }
    if (user) {
      dispatch(spotActions.getAllSpotsThunk()).then(() => {
        dispatch(spotActions.getUsersSpotsThunk()).then(() => {
          setTimeout(() => {
            setIsLoaded(true);
          }, 1000);
          setNeedsRerender(false);
          return
        });
      });
    }
  }, [dispatch, page, needsRerender,user]);





  useEffect(() => {
      if (page === 'home' && allSpots) {
        setSpots(allSpots);
      } else if (page === 'manage' && userSpots) {
        setSpots(userSpots.Spots);
      }
  }, [ page, allSpots, userSpots]);

  {
    ( needsRerender) && <div>Loading...</div>;
  }

  if (page === 'home' && spots) {
    return (
      <>
        <div className="spots-wrapper">
          <div className="spots-grid">
            {spots.map((spot, index) => (
              <SpotTile
                key={index}
                spotId={spot.id}
                spot={spot}
                setFavorites={setFavorites}
                isLoaded={isLoaded}
                index={index}
              />
            ))}
          </div>
        </div>
      </>
    );
  }

  if (page === 'manage' && isLoaded && spots && !needsRerender) {
    return (
      <>
        <div className="spots-manage-spots-header">Manage Spots</div>
        <div className="spots-wrapper">
          <div className="spots-grid">
            {spots.map((spot, index) => (
              <SpotTileManage 
              key={index} 
              spot={spot}                
              isLoaded={isLoaded}
              index={index} />
            ))}
          </div>
        </div>
      </>
    );
  }
};

export default Spots;
