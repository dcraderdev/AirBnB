import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as spotActions from '../../store/spots';
import logo from "../../public/logo.png";
import './SpotView.css'

function SpotView() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const [loaded, isLoaded] = useState(false);
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


  const imageUrl = currentSpot?.SpotImages?.[0]?.url || logo;
  const previewImageClass = currentSpot?.SpotImages?.[0]?.url ? 'spot-view-preview-image' : 'preview-image-logo';
  const reviewsText = currentSpot && currentSpot.numReviews == 1 ? ' Review' : ' Reviews'
  const rating = currentSpot && currentSpot.avgStarRating === 'NaN' ? 'New!' : currentSpot.avgStarRating

  const comingSoon =()=>{
    alert('Feature coming soon')
  }

  return (
    <div>
      {!currentSpot && <p>Loading...</p>}

      {currentSpot && user && loaded && (
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
            <div className="spot-view-description-container">

              <div className="spot-view-description-text">
                <p> 
Occaecat nisi amet irure pariatur laboris cillum fugiat exercitation. Velit fugiat voluptate enim ipsum magna. Enim excepteur est elit cillum quis exercitation aliqua et ad ullamco. In laboris occaecat elit sint. Non quis qui ullamco tempor culpa pariatur quis nulla. Mollit laboris et cillum do qui. Cillum dolor reprehenderit anim velit reprehenderit minim occaecat cillum Lorem dolore officia ipsum sint.

Culpa velit dolore sunt velit ullamco labore consectetur fugiat. Officia labore sint et aliqua tempor dolore est reprehenderit ad fugiat esse ex magna. Consequat aliquip aliqua Lorem reprehenderit eu voluptate velit veniam aliquip.

Velit officia aute ipsum adipisicing excepteur eiusmod officia. Exercitation exercitation incididunt nostrud aliquip sunt dolore ipsum. Ex do minim Lorem laborum proident voluptate ullamco excepteur. Nostrud ullamco id velit anim. Eu exercitation duis quis laborum quis culpa enim ad quis eiusmod nisi.

Tempor anim duis esse magna incididunt irure excepteur culpa cupidatat excepteur tempor minim. Sunt eiusmod labore ex aliqua officia pariatur proident laborum sint magna veniam et aute excepteur. Do irure elit culpa minim do mollit eu magna. Nisi aliquip officia do enim minim.

Adipisicing commodo et aute aliquip excepteur occaecat commodo id qui. Nisi labore cillum occaecat occaecat sunt ex duis sint labore nostrud. Cillum ullamco quis veniam occaecat sunt voluptate tempor mollit irure. Esse laborum deserunt excepteur dolor non velit eu sunt cillum magna dolore. Culpa Lorem dolor non elit deserunt eiusmod laborum ex dolore deserunt nulla elit laborum non.

Pariatur velit dolore tempor excepteur proident sunt ex pariatur minim eiusmod cillum voluptate aliquip. Labore consequat aute veniam non non mollit. In mollit cupidatat consectetur ut sit Lorem. Nostrud dolore eiusmod reprehenderit ea ex aliquip ad officia aute voluptate ad consectetur.

Consequat occaecat nostrud sunt mollit aute enim esse do officia incididunt. Pariatur voluptate esse ex cupidatat anim quis duis ullamco. Ullamco quis minim do aliqua do. Tempor in dolore labore ullamco consequat esse anim. Mollit consequat sunt ea magna consectetur minim exercitation incididunt culpa. Dolore ut quis ex irure culpa esse dolore duis. Pariatur anim laborum laborum proident sunt Lorem labore enim eu pariatur est esse ullamco elit.

Quis deserunt veniam dolor id cillum eiusmod voluptate Lorem aliqua reprehenderit cillum nostrud adipisicing pariatur. Fugiat commodo quis aliqua nisi qui aute. Labore magna mollit ex elit excepteur. Mollit elit ad anim laborum occaecat dolor ullamco cillum exercitation dolor.

Nostrud veniam esse ad incididunt ex ex velit magna veniam incididunt proident id. Mollit culpa mollit laboris eu duis sunt laborum deserunt proident dolor adipisicing fugiat qui do. Elit aute id fugiat pariatur tempor mollit sint ex ex deserunt cillum qui cillum.
                </p>
              </div>
            </div>

            <div className="spot-view-reservation-container">
              <div>
                {currentSpot.price}Night ⭐️{rating} {currentSpot.numReviews} {reviewsText}
              </div>
              <button className="spot-view-reservation-button divButton" onClick={comingSoon}></button>
            </div>
          </div>


        <div className="spot-view-review-container">
          REVIEW COMPONENT

        </div>
             
        </div>
      )}
    </div>
  );
}

export default SpotView;
