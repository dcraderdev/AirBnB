import React, { useEffect, useRef, useContext, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as spotActions from '../../store/spots';
import logo from "../../public/logo.png";
import './SpotView.css'
import ImageSlider from '../ImageSlider'
import ReviewStat from '../ReviewStat'
import Reviews from '../Reviews'
import { ModalContext } from '../../context/ModalContext';


function SpotView() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const [loaded, isLoaded] = useState(false);
  const [spotPreviewImage, setSpotPreviewImage] = useState('');
  const [spotPreviewImageClass, setSpotPreviewImageClass] = useState('');

  const user = useSelector((state) => state.session.user);
  const currentSpot = useSelector((state) => state.spots.currentSpot);

  const { modal, openModal, closeModal,needsRerender,setNeedsRerender } = useContext(ModalContext);




  useEffect(() => {
    isLoaded(false);

    dispatch(spotActions.getSpotThunk(spotId)).then(()=>{
      setNeedsRerender(false)
      isLoaded(true);

    })
  
    window.scrollTo(0, 0);
  }, [dispatch, spotId, user]);
  



  useEffect(() => {

    dispatch(spotActions.getSpotThunk(spotId)).then(()=>{
      setNeedsRerender(false)
    })
  
  }, [needsRerender]);


  useEffect(() => {
    if (currentSpot) {
      setSpotPreviewImage(
        currentSpot?.SpotImages?.[0]?.url
          ? currentSpot?.SpotImages?.[0]?.url
          : 'preview-default-image'
      );
      setSpotPreviewImageClass(
        currentSpot?.SpotImages?.[0]?.url
          ? 'spot-view-preview-image'
          : 'preview-default-image'
      );
    }
  }, [currentSpot]);

  const selectImage = (file) => {
    setSpotPreviewImage(file.url);
  };




  const comingSoon =()=>{
    alert('Feature coming soon')
  }

  return (
    <div>
      {!currentSpot && <p>Loading...</p>}

      {currentSpot && loaded && (
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

              <img className={spotPreviewImageClass} src={spotPreviewImage} alt="Spot Preview Image"></img>

              <div className='preview-default-image'>
                <img src={logo} alt="Airbnb logo" className='logo-scale'></img>
              </div>


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


              <div className="spot-view-reservation-info">

                <div className="spot-view-price-night-container">
                  <div className="spot-view-price">${currentSpot.price.toFixed(2)}</div>

                  <div className="spot-view-night"> night</div>
                </div>


                <div className="spot-view-review-stat-info">
                  <ReviewStat currentSpot={currentSpot}/>
                </div>



              </div>


              <button className="spot-view-reservation-button button" onClick={()=>{alert('Feature coming soon!')}}>Reserve</button>
            </div>





          </div>


        <div className="spot-view-review-container">
          <Reviews currentSpot={currentSpot} />

        </div>
             
        </div>
      )}
    </div>
  );
}

export default SpotView;
