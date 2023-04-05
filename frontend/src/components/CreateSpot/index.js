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
  const [spotImages, setSpotImages] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

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
        spotPreviewImage,
      ))

    if(data) history.push(`/spots/${data.id}`)
      
    } catch (error) {
      console.error(error);
    };
  };
  


  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Selected file:', file);
      setSpotPreviewImage(file.name)
      setSpotImages(()=>[...spotImages,file.name])
    }
  }


  return (



    <div className="host-form-page">



<div className='image-container'>

  <div className='image-main-container'>
    <div className='image-main'>Image goes here</div>
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

      <div className="host-form-page-container">
        <div className="hostHeader">Host an Airbnb</div>

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

            {/* <label className="lat">
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
            </label> */}







{/* 

            <div>Describe your place to guests</div>
            <div>
              Mention the best features of your space, any special amentities likefast wif or parking, and what you love about the neighborhood.
            </div>

            <label className="description">
              Description
              <input
                className="descriptionField"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>

            <div>
              Create a title for your spot
            </div>

            <div>
              Catch guests' attention with a spot title that highlights what makesyour place special.
            </div>


            <label className="spotTitle">
              Spot Name
              <input
                className="spotTitleField"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

            <div>
              Set a base price for your spot
            </div>

            <div>
              Competitive pricing can help your listing stand out and rank higher in search results.
            </div>

            <label className="spotPrice">
              Spot Price
              <input
                className="spotPriceField"
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </label>

            <div>
              Liven up your spot with photos
            </div>

            <div>
              Choose a file or submit a link to at least one photo to publish your spot.
            </div> */}

            {/* <label className="spotPreviewImage">
              Spot Preview Image
              <input
                className="spotPreviewImageField"
                type="text"
                value={spotPreviewImage}
                onChange={(e) => setSpotPreviewImage(e.target.value)}
                required
              />
            </label>



            <button type="submit">Host</button> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateSpot;
