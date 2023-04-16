//SpotTile
import React, { useState, useRef, useEffect } from 'react';

import './SpotTile.css';
import { Link } from 'react-router-dom';

const SpotTile = ({ spot, setFavorites}) => {
  const [displayName, setDisplayName] = useState('');
  const [rating, setRating] = useState('');
  const [tileDescription, setTileDescription] = useState('');
  const [favorite, setFavorite] = useState([false]);
  const [heartIcon, setHeartIcon] = useState('heart-icon');
  const [heartFill, setHeartFill] = useState('fa-regular fa-heart');
  const [previewImageClass, setPreviewImageClass] = useState('preview-image-gray');
  const [imageUrl, setImageUrl] = useState(false);

  const {
    name,
    previewImage,
    city,
    state,
    price,
    avgRating,
    description,
  } = spot;




  useEffect(() => {
    avgRating !== 'NaN' ? setRating(avgRating) : setRating('New!');
    name.length > 35
      ? setDisplayName(name.slice(0, 33) + '...')
      : setDisplayName(name);
    setTileDescription(description.slice(0, 50) + '...');

    if (previewImage !== null) {
      setImageUrl(previewImage);
      setPreviewImageClass('spot-tile-spot-image');
    }
  }, []);

  const setFav = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setFavorite(!favorite);
    setHeartFill(
      !favorite ? 'fa-regular fa-heart large' : 'fa-solid fa-heart large'
    );
  };

  const handleFavHover = (e) => {
    setHeartFill(
      favorite ? 'fa-regular fa-heart large' : 'fa-solid fa-heart large'
    );
  };

  const handleFavLeave = (e) => {
    setHeartFill(favorite ? 'fa-regular fa-heart' : 'fa-solid fa-heart');
  };

  return (
    <div>
      <Link to={`/spots/${spot.id}`} className="spot-tile-link">
        <div className="spot-tile">
          <div
            className={heartIcon}
            onClick={setFav}
            onMouseMove={handleFavHover}
            onMouseLeave={handleFavLeave}
          >
            <div className={heartFill}></div>
          </div>

          <div className="spot-tile-image-container">
            {!imageUrl && <div className={previewImageClass}></div>}
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Spot preview"
                className={previewImageClass}
              />
            )}
          </div>

          <div className="spot-tile-spot-info">
            <div className="spot-tile-location">
              {city}, {state}
            </div>
            <div className="spot-tile-avg-rating-container">
              <div className="spot-tile-avg-rating-star">
                <i className="fa-solid fa-star" />
              </div>
              <div className="spot-tile-avg-rating">{rating}</div>
            </div>
            <div className="spot-tile-price-night-container">
              <div className="spot-tile-price">${price.toFixed(2)}</div>
              <div className="spot-tile-night"> night</div>
            </div>
          </div>
          <p className="spot-tile-short-description">{tileDescription}</p>

          <div className="tooltip tooltiptext">{displayName}</div>
        </div>
      </Link>
    </div>
  );
};

export default SpotTile;
