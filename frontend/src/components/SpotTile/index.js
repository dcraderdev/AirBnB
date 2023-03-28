import React from 'react'
import './SpotTile.css'


const SpotTile = ({ spot }) => {
  
  const { previewImage, city, state, country, lat, lng, price } = spot;

  return (
    <div className="spot-tile">
      <div className='imageContainer'>
        <img src={previewImage} alt="Spot preview" className="spot-image" />
      </div>
      <div className="spot-info">
        <div className="location">
          {city}, {state}
        </div>
        <div className="country">{country}</div>
        <div className="coordinates">
          Lat: {lat.toFixed(2)}, Lng: {lng.toFixed(2)}
        </div>
        <div className="price">${price} per night</div>
      </div>
    </div>
  );
};

export default SpotTile;

