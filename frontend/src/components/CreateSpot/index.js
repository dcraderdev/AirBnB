import React, { useEffect,useRef, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './CreateSpot.css';
import * as spotActions from '../../store/spots';



// country,address,city,state,lat,lng,description,spotTitle,spotPrice,spotPreviewImage

const CreateSpot = () => {

  const [country, setCountry ] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [description, setDescription] = useState('')
  const [spotTitle, setSpotTitle] = useState('')
  const [spotPrice, setSpotPrice] = useState('')
  const [spotPreviewImage, setSpotPreviewImage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(spotActions.login({ country,address,city,state,lat,lng,description,spotTitle,spotPrice,spotPreviewImage }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }


  return (
    <div className="host-form-page">
    <div className="host-form-page-container">
    <div className="hostHeader">Host an Airbnb</div>


    <div className="logInDiv">
              <form onSubmit={handleSubmit}>
                <ul>
                  {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                </ul>


<label className='country'>
  Country
  <input
    className='countryField'
    type="text"
    value={country}
    onChange={(e) => setCountry(e.target.value)}
    required
  />
</label>

<label className='address'>
  Address
  <input
    className='addressField'
    type="text"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    required
  />
</label>

<label className='city'>
  City
  <input
    className='cityField'
    type="text"
    value={city}
    onChange={(e) => setCity(e.target.value)}
    required
  />
</label>

<label className='state'>
  State
  <input
    className='stateField'
    type="text"
    value={state}
    onChange={(e) => setState(e.target.value)}
    required
  />
</label>

<label className='lat'>
  Latitude
  <input
    className='latField'
    type="text"
    value={lat}
    onChange={(e) => setLat(e.target.value)}
    required
  />
</label>

<label className='lng'>
  Longitude
  <input
    className='lngField'
    type="text"
    value={lng}
    onChange={(e) => setLng(e.target.value)}
    required
    />
    </label>
    <label className='description'>
  Description
  <input
    className='descriptionField'
    type="text"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    required
  />
</label>

<label className='spotTitle'>
  Spot Title
  <input
    className='spotTitleField'
    type="text"
    value={spotTitle}
    onChange={(e) => setSpotTitle(e.target.value)}
    required
  />
</label>

<label className='spotPrice'>
  Spot Price
  <input
    className='spotPriceField'
    type="text"
    value={spotPrice}
    onChange={(e) => setSpotPrice(e.target.value)}
    required
  />
</label>

<label className='spotPreviewImage'>
  Spot Preview Image
  <input
    className='spotPreviewImageField'
    type="text"
    value={spotPreviewImage}
    onChange={(e) => setSpotPreviewImage(e.target.value)}
    required
  />
</label>
</form>
</div>



    </div>
    </div>

  )
}

export default CreateSpot