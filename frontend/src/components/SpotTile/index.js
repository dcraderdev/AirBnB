import React, { useState, useRef, useEffect } from 'react';

import './SpotTile.css'
import { Link } from 'react-router-dom';



const SpotTile = ({ spot, setFavorites }) => {
  let rating
  console.log(spot);
  
  const { previewImage, city, state, country, lat, lng, price, avgRating, description } = spot;

  const [favorite, setFavorite] = useState([false])

  if(!avgRating) rating = 5
  if(avgRating) rating = avgRating
  let long = description + ' ' + description 
  let shortDescription = long.slice(0,80) + '...'


  let heartFill = favorite ? "fa-regular fa-heart" : "fa-solid fa-heart" 

const setFav = () =>{
  setFavorite(!favorite)
}

  return (
    
    <Link key={spot.id} to={`/spots/${spot.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="spot-tile">
    <div className="imageContainer">
      <img src={previewImage} alt="Spot preview" className="spot-image" />
      <div className="heart-icon" onClick={setFav} >

        <div className={heartFill} ></div>
      </div>
    </div>

    <div className="spot-info">
  <div className="location-rating">
    <div className="location">{city}, {state}</div>
    <div className="avg-rating">{rating} ⭐️</div>
  </div>
  <div className="price">${price} / night</div>
</div>
  <div className="spot-description-line"></div>
  <p className="spot-short-description">{shortDescription}</p>
      </div>
    </Link>
  );
};

export default SpotTile;