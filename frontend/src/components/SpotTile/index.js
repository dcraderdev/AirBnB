//SpotTile
import React, { useState, useRef, useEffect } from 'react';

import './SpotTile.css';
import { Link } from 'react-router-dom';
import logo from "../../public/logo.png";

const SpotTile = ({ spot, setFavorites }) => {

  const [tooltip, setTooltip] = useState({ x: -3000, y: 40 });
  const [tooltipDisplay, setTooltipDisplay] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [rating, setRating] = useState('');
  const [tileDescription, setTileDescription] = useState('');
  const [favorite, setFavorite] = useState([false]);
  const [heartIcon, setHeartIcon] = useState("heart-icon");
  const [heartFill, setHeartFill] = useState('fa-regular fa-heart');
  const [previewImageClass, setPreviewImageClass] = useState('preview-image-gray')
  const [imageUrl, setImageUrl] = useState(false)


  const { name, previewImage, city, state, country, lat, lng, price, avgRating, description,
  } = spot;



  useEffect(()=>{
    avgRating !== 'NaN' ? setRating(avgRating) : setRating('New!')
    name.length > 35 ? setDisplayName((name).slice(0, 33) + '...')  : setDisplayName(name)
    setTileDescription((description).slice(0, 50) + '...')  
    
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
    // setTooltip({ x: e.clientX, y: e.clientY - 90});

    // var rect = e.target.getBoundingClientRect();
    // var x = e.clientX - rect.left; //x position within the element.
    // var y = e.clientY - rect.top;  //y position within the element.
    // console.log("Left? : " + x + " ; Top? : " + y + ".");



    // var x = (evt.pageX - $('#element').offset().left) + $(window).scrollLeft();
    // var y = (evt.pageY - $('#element').offset().top) + $(window).scrollTop();


    // Screen X/Y: ${e.screenX}, ${e.screenY}
    // Client X/Y: ${e.clientX}, ${e.clientY}`;


    // const x = e.pageX
    // const y = e.pageY




    function getRelativeCoordinates (event, referenceElement) {

      const position = {
        x: event.pageX,
        y: event.pageY
      };
    
      const offset = {
        left: referenceElement.offsetLeft,
        top: referenceElement.offsetTop
      };
    
      let reference = referenceElement.offsetParent;
    
      while(reference){
        offset.left += reference.offsetLeft;
        offset.top += reference.offsetTop;
        reference = reference.offsetParent;
      }
    
      return { 
        x: position.x - offset.left,
        y: position.y - offset.top,
      }; 
    
    }


    let coords = getRelativeCoordinates(e, e.target)

    var x = (e.pageX)
    var y  = (e.pageY)
    // let x = coords.x
    // let y = coords.y

    setTooltip({ x: x, y: y});
    // setTooltip({ x: e.clientX + 10, y: e.clientY + 10});
    // setTooltip({ x: e.screenX, y: e.screenY});

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
          {!imageUrl && <div className={previewImageClass}></div>}
          {imageUrl && <img src={imageUrl} alt="Spot preview" className={previewImageClass} />}
        </div>
        
        <div className="spot-tile-spot-info">
          <div className="spot-tile-location">{city}, {state}</div>
          <div className="spot-tile-avg-rating-container">
            <div className="spot-tile-avg-rating-star"><i className="fa-solid fa-star" /></div>
            <div className="spot-tile-avg-rating">{rating}</div>
          </div>
          <div className="spot-tile-price-night-container">
            <div className="spot-tile-price">${price.toFixed(2)}</div>
            <div className="spot-tile-night"> night</div>
          </div>
        </div>
        <p className="spot-tile-short-description">{tileDescription}</p>


      {tooltipDisplay && (
        <div className={"tooltip tooltiptext"}
             >
          {displayName}
        </div>
      )}

      </div>



    </Link>
    </div>
  );
};

export default SpotTile;


        // style={{ top: tooltip.y + 'px', left: tooltip.x + 'px' }}