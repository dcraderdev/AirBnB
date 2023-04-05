import React, { useEffect, useRef, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './CreateSpot.css';
import * as spotActions from '../../store/spots';
import ImageTile from '../ImageTile'

// country,address,city,state,lat,lng,description,spotTitle,spotPrice,spotPreviewImage

const CreateSpot = () => {
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [spotPreviewImage, setSpotPreviewImage] = useState('');
  const [spotPreviewImageLoaded, setSpotPreviewImageLoaded] = useState(false);
  const [spotImages, setSpotImages] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const fileTypes = ["pdf", "png", "jpg", "jpeg", "gif"];

console.log('--->',spotPreviewImage);
 


  const handleSubmit = async (e) => {
    e.preventDefault();

    const latValue = lat === '' ? null : lat;
    const lngValue = lng === '' ? null : lng;

    try {
      const { data, response } = await dispatch(
      spotActions.createSpotThunk(
        country,
        address,
        city,
        state,
        lat,
        lng,
        description,
        name,
        price,
        spotImages,
      ))

    if(data) history.push(`/spots/${data.id}`)
      
    } catch (error) {
      console.error(error);
      console.log(error.data);
      console.log(error.status);
    };
  };


  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(URL.createObjectURL(file));

      if (file && !fileTypes.includes(`${file.type.split("/")[1]}`)){
        console.log('doesnt include');
      }


      console.log('Selected file:', file);
      setSpotPreviewImage(URL.createObjectURL(file))
      setSpotPreviewImageLoaded(true)

      setSpotImages(()=>[...spotImages,file.name])

      
    }
  }


  return (



    <div className="host-form-page">





      <div className="host-form-page-container">
        <div className="host-header">Host an Airbnb</div>

        <div className="hostDiv">

          <form onSubmit={handleSubmit}>

            <div className='host-form-loc-header'>Where's your place located?</div>
            <div className='host-form-loc-memo'>Guests will only get your exact address once they booked a reservation.</div>

            <label className="country">
              Country
              <input
                className="country-field"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                />
            </label>

            <label className="address">
              Street Address
              <input
                className="address-field"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </label>

            <label className="city">
              City
              <input
                className="city-field"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </label>

            <label className="state">
              State
              <input
                className="state-field"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </label>

            <label className="lat">
              Latitude (optional)
              <input
                className="lat-field"
                type="text"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
              />
            </label>

            <label className="lng">
              Longitude (optional)
              <input
                className="lng-field"
                type="text"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
              />
            </label>






            <div className='host-form-desc-header'>Describe your place to guests</div>
            <div  className='host-form-desc-memo'>
              Mention the best features of your space, any special amentities likefast wif or parking, and what you love about the neighborhood.
            </div>

            <label className="description">
              <textarea
                className="description-field"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>

            <div className='host-form-title-header'>
              Create a title for your spot
            </div>

            <div className='host-form-title-memo'>
              Catch guests' attention with a spot title that highlights what makesyour place special.
            </div>


            <label className="host-form-spot-title">
              <input
                className="host-form-spot-title-field"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

            <div className='host-form-price-header'>
              Set a base price for your spot
            </div>

            <div className='host-form-price-memo'>
              Competitive pricing can help your listing stand out and rank higher in search results.
            </div>

            <label className="host-form-spot-price">
              <input
                className="host-form-spot-price-field"
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </label>

            <div className="host-form-spot-preview-image-header">
              Liven up your spot with photos
            </div>

            <div className="host-form-spot-preview-image-memo">
              Choose a file or submit a link to at least one photo to publish your spot.
            </div>

            <label className="host-form-spot-preview-image">
              Spot Preview Image
              <input
                className="host-form-spot-preview-image-field"
                type="text"
                value={spotPreviewImage}
                onChange={(e) => setSpotPreviewImage(e.target.value)}
                required

              />
              <button 
                className='host-form-add-spot-image-button'
                onClick={() => document.getElementById('fileInput').click()}
                >
                  Add Image
              </button>
            </label>






            <button className='host-form-submit-button' type="submit">Host</button>
          </form>
        </div>
      </div>
      <div className='image-container'>

        <div className='image-main-container'>
          <div className='image-main'>{spotPreviewImageLoaded && <img src={spotPreviewImage} alt='preview'></img>}</div>
        </div>

        <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleFileSelect}
        />

        <div className='image-main-buttons'>
          <button 
          className='image-main-button-add'
          onClick={() => document.getElementById('fileInput').click()}
          >
            Add Image
          </button>
          <button className='image-main-button-crop'>Crop Image</button>
          <button className='image-main-button-delete'>Delete Image</button>
        </div>


        <div className='image-thumbnail-container'>
        {spotImages.map((image,index) => (
          <div key={index} className='image-thumbnail'>
            <ImageTile image={image} />
          </div>
        ))}
      </div>

      </div>
    </div>
  );
};

export default CreateSpot;


//    /Users/donovancrader/Documents/github/AirBnB/frontend/src/public/logo.png
//   // URL.createObjectURL(image)
// https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
