//SpotTile
import React, { useState, useRef, useEffect } from 'react';

import './SpotTile.css';
import { Link } from 'react-router-dom';

const SpotTile = ({ spot, setFavorites }) => {

  const [tooltip, setTooltip] = useState({ display: false, x: 0, y: 0 });
  const [tooltipDisplay, setTooltipDisplay] = useState(false);
  const [rating, setRating] = useState('');
  const [tileDescription, setTileDescription] = useState('');
  const [favorite, setFavorite] = useState([false]);

  const {
    name,
    previewImage,
    city,
    state,
    country,
    lat,
    lng,
    price,
    avgRating,
    description,
  } = spot;



  useEffect(()=>{
    if(avgRating === null)setRating('new');
    if (avgRating)setRating(avgRating)
    setTileDescription((description + ' ' + description).slice(0, 80) + '...')  
  },[])




  let heartFill = favorite ? 'fa-regular fa-heart' : 'fa-solid fa-heart';

  const setFav = () => {
    setFavorite(!favorite);
  };


  const handleMouseMove = (e) => {
    setTooltipDisplay(true)
    setTooltip({ x: e.clientX, y: e.clientY + window.scrollY });
  };

  const handleMouseLeave = () => {
    setTooltipDisplay(false);
  };


  return (
    <Link
      key={spot.id}
      to={`/spots/${spot.id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className="spot-tile" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <div className="spot-tile-image-container">
          <img src={previewImage} alt="Spot preview" className="spot-image" />
          <div className="heart-icon" onClick={setFav}>
            <div className={heartFill}></div>
          </div>
        </div>

        <div className="spot-info">
          <div className="location-rating">
            <div className="location">
              {city}, {state}
            </div>
            <div className="avg-rating">{rating} ⭐️</div>
          </div>
          <div className="price">${price} / night</div>
        </div>
        <div className="spot-description-line"></div>
        <p className="spot-short-description">{tileDescription}</p>

      {tooltipDisplay && (
        <div className="tooltip tooltiptext"
        style={{
          display: tooltipDisplay ? 'block' : 'none',
          top: tooltip.y + 'px',
          left: tooltip.x + 'px',
        }}>
          {name}
          </div>
      )}

      </div>



    </Link>
  );
};

export default SpotTile;


        // style={{ top: tooltip.y + 'px', left: tooltip.x + 'px' }}