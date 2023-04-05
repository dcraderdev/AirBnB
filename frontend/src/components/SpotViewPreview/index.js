import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as spotActions from '../../store/spots';
import logo from "../../public/logo.png";
import './SpotViewPreview.css'

function SpotViewPreview() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const [rating, setRating] = useState('');
  const [imageUrl, setImageUrl] = useState(logo)
  const [previewImageClass, setPreviewImageClass] = useState('preview-image-logo')

  const user = useSelector((state) => state.session.user);
  const currentSpot = useSelector((state) => state.spots.currentSpot);

  useEffect(() => {
    if (user) dispatch(spotActions.getSpotThunk(spotId));
  }, [dispatch, spotId, user]);

  useEffect(() => {
    if (currentSpot) {
      if (currentSpot.avgStarRating === null) setRating('new');
      if (currentSpot.avgStarRating) setRating(currentSpot.avgStarRating);
 
      if(currentSpot.SpotImages[0] && currentSpot.SpotImages[0].url) {
        setImageUrl(currentSpot.SpotImages[0].url)
        setPreviewImageClass('spot-view-preview-image')
      }
    }
  }, [currentSpot]);



  return (
    <div>
      {!currentSpot && <p>Loading...</p>}

      {currentSpot && user && (
        <div className="spot-view-container">

          <div className="spot-view-header">
            
            <h1 >{currentSpot.name}</h1>

            <h5>
              {currentSpot.city}
              {currentSpot.state}
              {currentSpot.country}
            </h5>


          </div>

          <div className="spot-view-image-container">

            <div className="spot-view-preview-image-container">
              <img className={previewImageClass} src={imageUrl} alt="Spot Preview Image"></img>
            </div>

            <div className="spot-view-slide-container">
              image slider component
            </div>
          </div>

          <div className="spot-view-des-res-container">

            <div className="spot-view-description-header">
              Hosted by {currentSpot.Owner.firstName} {currentSpot.Owner.lastName}
            </div>
            
            <div className="spot-view-description">
              <p>{currentSpot.description}</p>
            </div>

            <div className="spot-view-reservation-container">
              <div>
                Price:{currentSpot.price} ⭐️:{rating} Reviews:{currentSpot.numReviews} 
              </div>
              <button className="spot-view-reservation-button divButton"></button>
            </div>
          </div>


        </div>
      )}
    </div>
  );
}

export default SpotViewPreview;
