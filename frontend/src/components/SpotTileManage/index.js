import React, { useState, useEffect, useContext } from 'react';

import './SpotTileManage.css';
import { Link, useHistory } from 'react-router-dom';
import { ModalContext } from '../../context/ModalContext';
const SpotTileManage = ({ spot }) => {
  const [displayName, setDisplayName] = useState('');
  const [rating, setRating] = useState('');
  const [tileDescription, setTileDescription] = useState('');
  const [previewImageClass, setPreviewImageClass] = useState('preview-image-gray');
  const [imageUrl, setImageUrl] = useState(false);
  const {modal, openModal, setUpdateObj} = useContext(ModalContext)

  const {name,previewImage,city,state,price,avgRating,description} = spot;


  const history = useHistory()

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


  return (
    <div>
      <Link to={`/spots/${spot.id}`} className="spot-tile-link">
        <div className="spot-tile">
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

      <div className='spot-tile-manage-buttons-container'> 
        <button className="spot-tile-manage-update-button button" onClick={()=>{
          history.push(`/manage/${spot.id}`)
         }} >

          Update
        </button>

        <button className="spot-tile-manage-delete-button button" onClick={()=>{
          openModal('delete')
          setUpdateObj(spot)
          }} >
              Delete
        </button>
      </div>

    </div>
  );
};

export default SpotTileManage;
