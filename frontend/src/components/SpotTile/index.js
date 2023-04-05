//SpotTile
import React, { useState, useRef, useEffect } from 'react';

import './SpotTile.css';
import { Link } from 'react-router-dom';
import logo from "../../public/logo.png";

const SpotTile = ({ spot, setFavorites }) => {

  const [tooltip, setTooltip] = useState({ display: false, x: 0, y: 0 });
  const [tooltipDisplay, setTooltipDisplay] = useState(false);
  const [rating, setRating] = useState('');
  const [tileDescription, setTileDescription] = useState('');
  const [favorite, setFavorite] = useState([false]);
  const [heartIcon, setHeartIcon] = useState("heart-icon");
  const [heartFill, setHeartFill] = useState('fa-regular fa-heart');
  const [previewImageClass, setPreviewImageClass] = useState('preview-image-logo')
  const [imageUrl, setImageUrl] = useState(logo)


  const { name, previewImage, city, state, country, lat, lng, price, avgRating, description,
  } = spot;




  useEffect(()=>{
    if(avgRating !== 'NaN')setRating(avgRating)
    if(avgRating === 'NaN')setRating('New!');
    setTileDescription((description + ' ' + description).slice(0, 80) + '...')  
    if(previewImage !== null) {
      setImageUrl(previewImage)
      setPreviewImageClass('spot-tile-spot-image')
    }
  },[])






  
  const setFav = (e) => {
    e.stopPropagation()
    e.preventDefault()
    // stop propagation
    // stop prevent default
    const fav = !favorite
    setFavorite(fav);
    setHeartFill(fav ? 'fa-regular fa-heart large' : 'fa-solid fa-heart large');

  };
  
  
  const handleFavHover = (e) => {
    setHeartFill(favorite ? 'fa-regular fa-heart large' : 'fa-solid fa-heart large')
  };

  const handleFavLeave = (e) => {
    setHeartFill(favorite ? 'fa-regular fa-heart' : 'fa-solid fa-heart')
  };
  

  const handleMouseMove = (e) => {
    setTooltipDisplay(true)
    setTooltip({ x: e.pageX, y: e.pageY - 90 });
  };

  const handleMouseLeave = () => {
    setTooltipDisplay(false);
  };


  return (
    <div>

      
    
    <Link
      key={spot.id}
      to={`/spots/${spot.id}`}
      className="spot-tile-link"
    >
      <div className="spot-tile" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>

        <div className={heartIcon} onClick={setFav} onMouseMove={handleFavHover} onMouseLeave={handleFavLeave}>
          <div className={heartFill}></div>
        </div>

        
        <div className="spot-tile-image-container">
          <img src={imageUrl} alt="Spot preview" className={previewImageClass} />
        </div>

        <div className="spot-tile-spot-info">
          <div className="spot-tile-location">{city}, {state}</div>
          <div className="spot-tile-avg-rating-container">
            <div className="spot-tile-avg-rating-star"><i className="fa-solid fa-star" /></div>
            <div className="spot-tile-avg-rating">{rating}</div>
          </div>
          <div className="spot-tile-price-night-container">
            <div className="spot-tile-price">${price}</div>
            <div className="spot-tile-night"> night</div>
          </div>
        </div>
        <div className="spot-tile-description-line"></div>
        <p className="spot-tile-short-description">{tileDescription}</p>

      {tooltipDisplay && (
        <div className="tooltip tooltiptext"
        style={{
          top: tooltip.y + 'px',
          left: tooltip.x + 'px'}}>
          {name}
        </div>
      )}

      </div>



    </Link>
    </div>
  );
};

export default SpotTile;


        // style={{ top: tooltip.y + 'px', left: tooltip.x + 'px' }}