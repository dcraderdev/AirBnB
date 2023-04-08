import React, { useEffect, useRef, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './CreateSpot.css';
import * as spotActions from '../../store/spots';
import ImageTile from '../ImageTile';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

// country,address,city,state,lat,lng,description,spotTitle,spotPrice,spotPreviewImage

const CreateSpot = () => {
  const fileTypes = ['.png', '.jpg', '.jpeg'];
  const [imageUrl, setImageUrl] = useState('');
  const [imageUrlClass, setImageUrlClass] = useState('');
  const [imageUrlText, setImageUrlText] = useState('');
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
  const [latText, setLatText] = useState('');
  const [lngText, setLngText] = useState('');
  const [priceText, setPriceText] = useState('');
  const [lngClass, setLngClass] = useState('');
  const [latClass, setLatClass] = useState('');
  const [priceClass, setPriceClass] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  const [descriptionClass, setDescriptionClass] = useState('');
  const [nameText, setNameText] = useState('');
  const [name, setName] = useState('');
  const [nameClass, setNameClass] = useState('');
  const [price, setPrice] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [disabledButton, setDisabledButton] = useState(false);
  const [antiSpam, setAntiSpam] = useState(false);

  const [buttonClass, setButtonClass] = useState(
    'host-form-submit-button button'
  );
  const [buttonText, setButtonText] = useState('Create Spot');

  const [formSubmitted, setFormSubmitted] = useState(false);
  let timeoutId;

  useEffect(() => {
    const errors = {};

    if (!country.length) errors['country'] = 'Please enter a country';
    if (!address.length) errors['address'] = 'Please enter an address';
    if (!city.length) errors['city'] = 'Please enter a city';
    if (!state.length) errors['state'] = 'Please enter a state';
    if (!description.length)
      errors['description'] = 'Please enter a description';
    if (!name.length) errors['name'] = 'Please enter a spot name';
    if (!price.length) errors['price'] = 'Please enter a price';
    if (!spotPreviewImageFile)
      errors['spotPreviewImageFile'] = 'Please select at least one photo';

    setValidationErrors(errors);
  }, [
    country,
    address,
    city,
    state,
    description,
    name,
    price,
    spotPreviewImageFile,
  ]);

  useEffect(() => {
    if (Object.keys(validationErrors).length > 0) {
      setButtonClass('host-form-submit-button disabled');
      setDisabledButton(true);
    } else {
      setButtonClass('host-form-submit-button button');
      setDisabledButton(false);
    }
  }, [validationErrors]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);

    if (!disabledButton) {
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
            spotImages
          )
        );

        if (data) {
          setFormSubmitted(true);
          history.push(`/spots/${data.id}`);
        }
      } catch (error) {
        setAntiSpam(true);
        setDisabledButton(true);
        setButtonClass('host-form-submit-button disabled');

        console.error(error);
        console.log(error.data);
        console.log(error.status);

        if (error.data.errors.lat) {
          console.log('lat is messed up');
          setLat('Latitude must be a number');
          setLatClass('lat-field red-font');
        }
        if (error.data.errors.lng) {
          console.log('lng is messed up');
          setLng('Longitude must be a number');
          setLngClass('lng-field red-font');
        }
        if (error.data.errors.price) {
          console.log('price is messed up');
          setPrice('Price must be a number');
          setPriceClass('host-form-spot-price-field red-font');
        }
        if (error.data.errors.description) {
          console.log('description is messed up');
          setDescription('Tell us more! (30 char min)');
          setDescriptionClass('description-field red-font');
        }

        if (error.data.errors.name) {
          console.log('name is messed up');
          setName('Name must be less than 50 characters');
          setNameClass('host-form-spot-title-field red-font');
        }

        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setAntiSpam(false);
          setLat(latText);
          setLng(lngText);
          setLngClass('');
          setLatClass('');
          setPrice(priceText);
          setPriceClass('');
          setDescriptionClass('');
          setDescription(descriptionText);
          setNameClass('');
          setName(nameText);
          setDisabledButton(false);
          setButtonClass('host-form-submit-button button');
        }, 3000);
      }
    }
  };

  
  const addImage = async () => {
    if (imageUrl) {
      
      if (!fileTypes.includes(imageUrl.slice(-4))) {
        setImageUrl('Image must be .png .jpg or .jpeg format')
        setImageUrlClass('host-form-spot-preview-image-field red-font')
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setImageUrl(imageUrlText)
          setImageUrlClass('')
        }, 3000);
        return
      }
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], 'image_from_url', { type: blob.type });

        setSpotPreviewImage(URL.createObjectURL(file));
        setSpotPreviewImageFile(file);
        setSpotPreviewImageLoaded(true);
        setSpotImages((prevSpotImages) => [...prevSpotImages, file]);
        setImageUrl('');
      } catch (error) {
        console.error('Error fetching image from URL:', error);
      }
    }
  };

  const deleteImage = () => {
    const newImages = spotImages.filter(
      (currentImage) => currentImage !== spotPreviewImageFile
    );
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
    const newImages = spotImages.filter(
      (currentImage) => currentImage !== image
    );
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
    setSpotPreviewImage(URL.createObjectURL(file));
    setSpotPreviewImageFile(file);
  };

  const makeDefault = (file) => {
    const index = spotImages.findIndex(
      (currFile) => currFile === spotPreviewImageFile
    );
    if (index > 0) {
      const newImages = [
        spotImages[index],
        ...spotImages.slice(0, index),
        ...spotImages.slice(index + 1),
      ];
      setSpotImages(newImages);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file && !fileTypes.includes(`${file.type.split('/')[1]}`)) {
        console.log('doesnt include');
      }

      // console.log('Selected file:', file);
      setSpotPreviewImage(URL.createObjectURL(file));
      setSpotPreviewImageFile(file);
      setSpotPreviewImageLoaded(true);
      setSpotImages(() => [...spotImages, file]);
    }
  };

  const getErrorClass = (field) => {
    return formSubmitted && validationErrors[field] ? `${field}-red-font` : ``;
  };

  return (
    <div className="host-form-page">
      <div className="host-form-page-container">
        <div className="host-header">
          <div className="host-header-text">Host an Airbnb</div>
        </div>
        <div className="hostDiv">
          <form onSubmit={handleSubmit}>
            <div className="host-form-loc-header">
              Where's your place located?
            </div>
            <div className="host-form-loc-memo">
              Guests will only get your exact address once they booked a
              reservation.
            </div>

            <label className="country">
              Country
              <input
                className={`country-field ${getErrorClass('country')}`}
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder={
                  validationErrors['country']
                    ? validationErrors['country']
                    : country
                }
              />
            </label>

            <label className="address">
              Street Address
              <input
                className={`address-field ${getErrorClass('address')}`}
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={
                  validationErrors['address']
                    ? validationErrors['address']
                    : address
                }
              />
            </label>

            <label className="city">
              City
              <input
                className={`city-field ${getErrorClass('city')}`}
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder={
                  validationErrors['city'] ? validationErrors['city'] : city
                }
              />
            </label>

            <label className="state">
              State
              <input
                className={`state-field ${getErrorClass('state')}`}
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder={
                  validationErrors['state'] ? validationErrors['state'] : state
                }
              />
            </label>

            <label className="lat">
              Latitude (optional)
              <input
                className={latClass === '' ? 'lat-field' : latClass}
                type="text"
                value={lat || ''}
                onChange={(e) => {
                  setLat(e.target.value);
                  setLatText(e.target.value);
                }}
              />
            </label>

            <label className="lng">
              Longitude (optional)
              <input
                className={lngClass === '' ? 'lng-field' : lngClass}
                type="text"
                value={lng || ''}
                onChange={(e) => {
                  setLng(e.target.value);
                  setLngText(e.target.value);
                }}
              />
            </label>

            <div className="host-form-desc-header">
              Describe your place to guests
            </div>
            <div className="host-form-desc-memo">
              Mention the best features of your space, any special amentities
              likefast wif or parking, and what you love about the neighborhood.
            </div>

            <label className="description">
              <textarea
                className={
                  descriptionClass === ''
                    ? `description-field ${getErrorClass('description')}`
                    : descriptionClass
                }
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setDescriptionText(e.target.value);
                }}
                placeholder={
                  validationErrors['description']
                    ? validationErrors['description']
                    : description
                }
              />
            </label>

            <div className="host-form-title-header">
              Create a title for your spot
            </div>

            <div className="host-form-title-memo">
              Catch guests' attention with a spot title that highlights what
              makesyour place special.
            </div>

            <label className="host-form-spot-title">
              <input
                className={ nameClass === '' ? `host-form-spot-title-field ${getErrorClass('name')}` : nameClass}
                type="text"
                value={name}
                onChange={(e) => {
                  setNameText(e.target.value) 
                  setName(e.target.value)
                }}
                placeholder={
                  validationErrors['name'] ? validationErrors['name'] : name
                }
              />
            </label>

            <div className="host-form-price-header">
              Set a base price for your spot
            </div>

            <div className="host-form-price-memo">
              Competitive pricing can help your listing stand out and rank
              higher in search results.
            </div>

            <label className="host-form-spot-price">
              <input
                className={
                  priceClass === ''
                    ? `host-form-spot-price-field ${getErrorClass('price')}`
                    : priceClass
                }
                type="text"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                  setPriceText(e.target.value);
                }}
                placeholder={
                  validationErrors['price'] ? validationErrors['price'] : price
                }
              />
            </label>

            <div className="host-form-spot-preview-image-header">
              Liven up your spot with photos
            </div>

            <div className="host-form-spot-preview-image-memo">
              Choose a file or submit a link to at least one photo to publish
              your spot.
            </div>

            <label className="host-form-spot-preview-image">
              Add image from URL (.png .jpg .jpeg format only)
              <input
                className={ imageUrlClass === '' ? `host-form-spot-preview-image-field ${getErrorClass('spotPreviewImageFile')}` : imageUrlClass}
                type="text"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setImageUrlText(e.target.value)
                }}
                placeholder={
                  validationErrors['spotPreviewImageFile']
                    ? validationErrors['spotPreviewImageFile']
                    : spotPreviewImageFile.name
                }
              />
              <button
                className="add-image-from-url button"
                type="button"
                onClick={addImage}
              >
                Add From URL
              </button>
            </label>

            <button className={buttonClass} type="submit" disabled={antiSpam}>
              {buttonText}
            </button>
          </form>

          <button
            className="host-form-add-spot-image-button button"
            onClick={() => document.getElementById('fileInput').click()}
          >
            Add Image
          </button>
        </div>
      </div>
      <div className="image-container">
        <div className="image-main-container">
          <div className="image-main">
            {spotPreviewImageLoaded && (
              <img src={spotPreviewImage} alt="preview"></img>
            )}
          </div>
        </div>

        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleFileSelect}
        />

        <div className="image-main-buttons">
          <button
            className="image-main-button-add button"
            onClick={() => document.getElementById('fileInput').click()}
          >
            Add Image
          </button>
          <button
            className="image-main-button-default button"
            onClick={makeDefault}
          >
            Make Default
          </button>
          <button
            className="image-main-button-delete button"
            onClick={deleteImage}
          >
            Delete Image
          </button>
        </div>

        <div className="image-tile-container">
          <ImageTile
            spotImages={spotImages}
            setSpotImages={setSpotImages}
            removeImage={removeImage}
            selectImage={selectImage}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateSpot;

//    /Users/donovancrader/Documents/github/AirBnB/frontend/src/public/logo.png
//   // URL.createObjectURL(image)
// https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
