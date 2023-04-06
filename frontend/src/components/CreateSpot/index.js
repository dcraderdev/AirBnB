import React, { useEffect, useRef, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './CreateSpot.css';
import * as spotActions from '../../store/spots';
import ImageTile from '../ImageTile'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

// country,address,city,state,lat,lng,description,spotTitle,spotPrice,spotPreviewImage

const CreateSpot = () => {

  const fileTypes = ["pdf", "png", "jpg", "jpeg", "gif"];
  const [spotPreviewImage, setSpotPreviewImage] = useState('');
  const [spotPreviewImageFile, setSpotPreviewImageFile] = useState('');
  const [spotPreviewImageLoaded, setSpotPreviewImageLoaded] = useState(false);
  const [spotImages, setSpotImages] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();


  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [disabledButton, setDisabledButton] = useState(false);
  const [buttonClass, setButtonClass] = useState('host-form-submit-button button');
  const [buttonText, setButtonText] = useState('Host');
 

  useEffect(() => {
    const errors = {};

    if (!country.length)              errors['country'] = 'Please enter a country';
    if (!address.length)              errors['address'] = 'Please enter a address';
    if (!city.length)                 errors['city'] = 'Please enter a city';
    if (!state.length)                errors['state'] = 'Please enter a state';
    if (!description.length)          errors['description'] = 'Please enter a description';
    if (!name.length)                 errors['name'] = 'Please enter a name';
    if (!price.length)                errors['price'] = 'Please enter a price';
    if (!spotPreviewImageFile) errors['spotPreviewImageFile'] = 'Please select at least one photo';

    setValidationErrors(errors);
  }, [country, address, city, state, description, name, price, spotPreviewImageFile]);

  
  useEffect(() => {

    if (Object.keys(validationErrors).length > 0) {
      setButtonClass('host-form-submit-button disabled');
      setDisabledButton(true);
    }
    else {
      setButtonClass('host-form-submit-button button');
      setDisabledButton(false);
    }


  }, [validationErrors]);




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
        spotPreviewImageFile,
      ))

    if(data) history.push(`/spots/${data.id}`)
      
    } catch (error) {
      setDisabledButton(true);

      console.error(error);
      console.log(error.data);
      console.log(error.status);


      setTimeout(() => {
        setDisabledButton(false);
        setButtonClass('host-form-submit-button disabled');
      }, 3000);
    };
  };



  const deleteImage = () => {
  
    const newImages = spotImages.filter((currentImage) => currentImage !== spotPreviewImageFile);
    setSpotImages(newImages);
    if (newImages && newImages[0]) {
      setSpotPreviewImageFile(newImages[0]);
      setSpotPreviewImage(URL.createObjectURL(newImages[0]));
    } else {
      setSpotPreviewImageFile('');
      setSpotPreviewImage('');
      setSpotPreviewImageLoaded(false);
    }
  };
  

  const removeImage = (image) => {
    const newImages = spotImages.filter((currentImage) => currentImage !== image);
    setSpotImages(newImages);
    if (newImages && newImages[0]) {
      setSpotPreviewImageFile(newImages[0]);
      setSpotPreviewImage(URL.createObjectURL(newImages[0]));
    } else {
      setSpotPreviewImageFile('');
      setSpotPreviewImage('');
      setSpotPreviewImageLoaded(false);
    }
  };

  const selectImage = (file) => {
    setSpotPreviewImage(URL.createObjectURL(file))
    setSpotPreviewImageFile(file);
  };


  const makeDefault = (file) => {

    const index = spotImages.findIndex((currFile) => currFile === spotPreviewImageFile);
    if (index > 0) {
      const newImages = [
        spotImages[index],
        ...spotImages.slice(0, index),
        ...spotImages.slice(index + 1),
      ];
      setSpotImages(newImages);
    }

  console.log(spotImages);

  };

  

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {

      if (file && !fileTypes.includes(`${file.type.split("/")[1]}`)){
        console.log('doesnt include');
      }


      // console.log('Selected file:', file);
      setSpotPreviewImage(URL.createObjectURL(file))
      setSpotPreviewImageFile(file)
      setSpotPreviewImageLoaded(true)

      setSpotImages(()=>[...spotImages,file])

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
                placeholder={validationErrors['country'] ? validationErrors['country'] : country}
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
                placeholder={validationErrors['address'] ? validationErrors['address'] : address}

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
                placeholder={validationErrors['city'] ? validationErrors['city'] : city}

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
                placeholder={validationErrors['state'] ? validationErrors['state'] : state}

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
                placeholder={validationErrors['description'] ? validationErrors['description'] : description}

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
                placeholder={validationErrors['name'] ? validationErrors['name'] : name}

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
                placeholder={validationErrors['price'] ? validationErrors['price'] : price}

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
                value={spotPreviewImageFile.name ? spotPreviewImageFile.name : '' }
                onChange={(e) => setSpotPreviewImage(e.target.value)}
                required
                placeholder={validationErrors['spotPreviewImageFile'] ? validationErrors['spotPreviewImageFile'] : spotPreviewImageFile.name}
              />

            </label>

            <button 
             className={buttonClass}
             type="submit"
             disabled={Object.keys(validationErrors).length > 0 || disabledButton}>
             {buttonText}
            </button>

          </form>

      <button 
                className='host-form-add-spot-image-button button'
                onClick={() => document.getElementById('fileInput').click()}
                >
                  Add Image
              </button>

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
          className='image-main-button-add button'
          onClick={() => document.getElementById('fileInput').click()}
          >
            Add Image
          </button>
          <button className='image-main-button-default button' onClick={makeDefault}>Make Default</button>
          <button className='image-main-button-delete button' onClick={deleteImage}>Delete Image</button>
        </div>


        <div className='image-tile-container'>
          <ImageTile spotImages={spotImages} setSpotImages={setSpotImages} removeImage={removeImage} selectImage={selectImage} />
        </div>


      </div>
    </div>
  );
};

export default CreateSpot;


//    /Users/donovancrader/Documents/github/AirBnB/frontend/src/public/logo.png
//   // URL.createObjectURL(image)
// https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
