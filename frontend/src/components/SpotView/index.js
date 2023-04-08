import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as spotActions from '../../store/spots';
import logo from "../../public/logo.png";
import './SpotView.css'
import ImageSlider from '../ImageSlider'
import Reviews from '../Reviews'

function SpotView() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const [loaded, isLoaded] = useState(false);
  const [spotPreviewImage, setSpotPreviewImage] = useState('');

  const user = useSelector((state) => state.session.user);
  const currentSpot = useSelector((state) => {
    return state.spots.currentSpot
  });


  useEffect(() => {
    if (user) {
      isLoaded(false)
      dispatch(spotActions.getSpotThunk(spotId)).then(()=>{
        isLoaded(true)
      })
    }
    window.scrollTo(0, 0);
  }, [dispatch, spotId, user]);

  useEffect(() => {
    setSpotPreviewImage(currentSpot?.SpotImages?.[0]?.url || logo);
  }, [currentSpot]);



  const selectImage = (file) => {
    setSpotPreviewImage(file.url);
  };


  const previewImageClass = currentSpot?.SpotImages?.[0]?.url ? 'spot-view-preview-image' : 'preview-image-logo';
  const reviewsText = currentSpot && currentSpot.numReviews == 1 ? ' Review' : ' Reviews'
  const rating = currentSpot && currentSpot.avgStarRating !== 'NaN' ? currentSpot.avgStarRating : 'New!'

  const comingSoon =()=>{
    alert('Feature coming soon')
  }

  return (
    <div>
      {!currentSpot && <p>Loading...</p>}

      {currentSpot && user && loaded && (
        <div className="spot-view-container">

          <div className="spot-view-header">
            
            <div >{currentSpot.name}</div>

            <h4>
              {currentSpot.city}{', '} 
              {currentSpot.state}{', '}  
              {currentSpot.country}
            </h4>


          </div>

          <div className="spot-view-image-container">

            <div className="spot-view-preview-image-container">
              <img className={previewImageClass} src={spotPreviewImage} alt="Spot Preview Image"></img>
              <div className='preview-image-background'><img src={logo} alt="Spot Preview Image"></img></div>
            </div>

            <div className="spot-view-slide-container">
              <ImageSlider spotImages={currentSpot.SpotImages} selectImage={selectImage}/>
            </div>
          </div>

          <div className="spot-view-des-res-container">
            

            <div className="spot-view-description-header">
              Hosted by {currentSpot.Owner.firstName} {currentSpot.Owner.lastName}
            </div>
            <div className="spot-view-description-container">

              <div className="spot-view-description-text">
                <p>{currentSpot.description}{currentSpot.description}{currentSpot.description}
                {''}
                {currentSpot.description}{currentSpot.description}{currentSpot.description}{currentSpot.description}{currentSpot.description}{currentSpot.description}{currentSpot.description}{currentSpot.description}{currentSpot.description}{currentSpot.description}{currentSpot.description}{currentSpot.description}{currentSpot.description}{currentSpot.description}{currentSpot.description}{currentSpot.description}{currentSpot.description}{currentSpot.description}{currentSpot.description}</p>
              </div>
            </div>

            <div className="spot-view-reservation-container">
              <div>
                {currentSpot.price.toFixed(2)}Night ⭐️{rating} {currentSpot.numReviews} {reviewsText}
              </div>
              <button className="spot-view-reservation-button button"></button>
            </div>
          </div>


        <div className="spot-view-review-container">
          <Reviews />

        </div>
             
        </div>
      )}
    </div>
  );
}

export default SpotView;
