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

      console.log(response);
      console.log(data.id);
      console.log(`/spots/${data.id}`);
      // if (response.ok){
      //   console.log('-=-=-=');
      //   console.log(response);
      //   console.log('-=-=-=');
// if(data) history.push(`/spots/${data.id}`)
      
      // }
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


            <label className="country">
              Country
              <input
                className="countryField"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </label>

            <label className="address">
              Street Address
              <input
                className="addressField"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </label>

            <label className="city">
              City
              <input
                className="cityField"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </label>

            <label className="state">
              State
              <input
                className="stateField"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </label>

            <label className="lat">
              Latitude (optional)
              <input
                className="latField"
                type="text"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
              />
            </label>

            <label className="lng">
              Longitude (optional)
              <input
                className="lngField"
                type="text"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
              />
            </label>












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

            <label className="spotPreviewImage">
              Spot Preview Image
              <input
                className="spotPreviewImageField"
                type="text"
                value={spotPreviewImage}
                onChange={(e) => setSpotPreviewImage(e.target.value)}
                required
              />
            </label>
            <button type="submit">Host</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateSpot;
