import React from 'react'
import './SpotTile.css'
import { Link } from 'react-router-dom';



const SpotTile = ({ spot }) => {
  let rating
  console.log(spot);
  
  const { previewImage, city, state, country, lat, lng, price,avgRating } = spot;

  if(!avgRating) rating = 5
  if(avgRating) rating = avgRating

  return (
    
    <Link key={spot.id} to={`/spots/${spot.id}`}>
    <div className="spot-tile">




      <div className='imageContainer'>
        <img src={previewImage} alt="Spot preview" className="spot-image" />
      </div>



      <div className="spot-info">

        <div className="location">
          {city}, {state}
        <div className="price">${price} per night</div>
        <div className="avg-rating">{rating} ⭐️</div>
        </div>
        <div className="country">{country}</div>
        <div className="coordinates">
          Lat: {lat.toFixed(2)}, Lng: {lng.toFixed(2)}
        </div>


      </div>





    </div>
    </Link>

  );
};

export default SpotTile;

