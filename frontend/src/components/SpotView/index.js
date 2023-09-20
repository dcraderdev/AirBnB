import React, { useEffect, useRef, useContext, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as spotActions from '../../store/spots';
import logo from '../../public/logo.png';
import './SpotView.css';
import ImageSlider from '../ImageSlider';
import ReviewStat from '../ReviewStat';
import Reviews from '../Reviews';
import { ModalContext } from '../../context/ModalContext';
import { WindowContext } from '../../context/WindowContext';

function SpotView() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [spotPreviewImage, setSpotPreviewImage] = useState('');
  const [spotPreviewImageClass, setSpotPreviewImageClass] = useState('');
  const [isMobileView, setIsMobileView] = useState(true);

  const user = useSelector((state) => state.session.user);
  const currentSpot = useSelector((state) => state.spots.currentSpot);

  const { modal, openModal, closeModal, needsRerender, setNeedsRerender } = useContext(ModalContext);
  const { windowWidth } = useContext(WindowContext);

    useEffect(() => {

      console.log(windowWidth);
      if(windowWidth > 1010){
        setIsMobileView(false)
      }else {
        setIsMobileView(true)
      }

    }, [windowWidth]);

    console.log(isMobileView);



  useEffect(() => {
    setIsLoaded(false);

    dispatch(spotActions.getSpotThunk(spotId)).then(() => {
      setNeedsRerender(false);
      setIsLoaded(true);
    });

    window.scrollTo(0, 0);
  }, [dispatch, spotId, user]);

  useEffect(() => {
    dispatch(spotActions.getSpotThunk(spotId)).then(() => {
      setNeedsRerender(false);
    });
  }, [needsRerender]);

  useEffect(() => {
    // find default image
    let defaultImage;

    if (currentSpot && currentSpot.SpotImages) {
      currentSpot.SpotImages.map((image) => {
        if (image.preview === true) {
          defaultImage = image;
        }
        return defaultImage === true;
      });
    }

    if (defaultImage) {
      setSpotPreviewImage(defaultImage.url);
    }

    if (currentSpot) {
      // setSpotPreviewImage(
      //   currentSpot?.SpotImages?.[0]?.url
      //     ? currentSpot?.SpotImages?.[0]?.url
      //     : 'preview-default-image'
      // );
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

  const comingSoon = () => {
    alert('Feature coming soon');
  };

  return (
    <>
      {isMobileView && (
        <div>
          {!currentSpot && <p>Loading...</p>}

          {currentSpot && isLoaded && (
            <div className="spot-view-container-mobile">
              <div className="spot-view-header mobile">
                <div>{currentSpot.name}</div>

                <h4>
                  {currentSpot.city}
                  {', '}
                  {currentSpot.state} {currentSpot.country}
                </h4>
              </div>

              <div className="spot-view-image-container-mobile">
                {spotPreviewImage && (
                  <img src={spotPreviewImage} alt="Spot Preview Image"></img>
                )}
              </div>

            <div className="spot-view-slide-container-mobile">
              <ImageSlider
                spotImages={currentSpot.SpotImages}
                selectImage={selectImage}
                isMobileView={true}
              />
            </div>


<div className="spot-view-description-container-mobile">

            <div className="spot-view-description-header-mobile">
              Hosted by {currentSpot.Owner.firstName}{' '}
              {currentSpot.Owner.lastName}
            </div>

            <div className="spot-view-description-text-mobile">
              {currentSpot.description}
            </div>
</div>




            <div className="spot-view-reservation-container-mobile">


              <div className="spot-view-reservation-info-mobile">
                <div className="spot-view-price-night-container-mobile">
                  <div className="spot-view-price-mobile">
                    ${currentSpot.price.toFixed(2)}
                  </div>

                  <div className="spot-view-night-mobile"> night</div>
                </div>

                <div className="spot-view-review-stat-info-mobile">
                  <ReviewStat currentSpot={currentSpot} />
                </div>
              </div>



              <button
                className="spot-view-reservation-button-mobile button"
                onClick={() => {
                  alert('Feature coming soon!');
                }}
              >
                Reserve
              </button>
            </div>
          

          <div className="spot-view-review-container-mobile">
            <Reviews currentSpot={currentSpot} isMobileView={isMobileView} />
          </div> 

          <div className='reservation-spacing-mobile'></div>

            </div>
          )}




        </div>
      )}

      {!isMobileView && (
        <div>
          {!currentSpot && <p>Loading...</p>}

          {currentSpot && isLoaded && (
            <div className="spot-view-container">
              <div className="spot-view-header">
                <div>{currentSpot.name}</div>

                <h4>
                  {currentSpot.city}
                  {', '}
                  {currentSpot.state} {currentSpot.country}
                </h4>
              </div>

              <div className="spot-view-image-container">
                <div className="spot-view-preview-image-container">
                  <img
                    className={spotPreviewImageClass}
                    src={spotPreviewImage}
                    alt="Spot Preview Image"
                  ></img>

                  <div className="preview-default-image">
                    <img
                      src={logo}
                      alt="Airbnb logo"
                      className="logo-scale"
                    ></img>
                  </div>
                </div>

                <div className="spot-view-slide-container">
                  <ImageSlider
                    spotImages={currentSpot.SpotImages}
                    selectImage={selectImage}
                    isMobileView={false}
                  />
                </div>
              </div>

              <div className="spot-view-des-res-container">
                <div className="spot-view-description-header">
                  Hosted by {currentSpot.Owner.firstName}{' '}
                  {currentSpot.Owner.lastName}
                </div>
                <div className="spot-view-description-container">
                  <div className="spot-view-description-text">
                    <p>{currentSpot.description}</p>
                  </div>
                </div>

                <div className="spot-view-reservation-container">
                  <div className="spot-view-reservation-info">
                    <div className="spot-view-price-night-container">
                      <div className="spot-view-price">
                        ${currentSpot.price.toFixed(2)}
                      </div>

                      <div className="spot-view-night"> night</div>
                    </div>

                    <div className="spot-view-review-stat-info">
                      <ReviewStat currentSpot={currentSpot} />
                    </div>
                  </div>

                  <button
                    className="spot-view-reservation-button button"
                    onClick={() => {
                      alert('Feature coming soon!');
                    }}
                  >
                    Reserve
                  </button>
                </div>
              </div>

              <div className="spot-view-review-container">
                <Reviews currentSpot={currentSpot} isMobileView={isMobileView} />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default SpotView;
