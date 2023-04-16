import React, { useEffect, useRef, useState, useContext } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import './EditSpot.css';
import * as spotActions from '../../store/spots';
import ImageTile from '../ImageTile';
import ImageSlider from '../ImageSlider';
import { ModalContext } from '../../context/ModalContext';

// country,address,city,state,lat,lng,description,spotTitle,spotPrice,spotPreviewImage

const EditSpot = () => {
  const { spotId } = useParams();

  const fileTypes = ['.png', '.jpg', 'jpeg'];
  const [imageUrl, setImageUrl] = useState('');
  const [imageUrlClass, setImageUrlClass] = useState('');
  const [imageUrlText, setImageUrlText] = useState('');
  const [spotPreviewImage, setSpotPreviewImage] = useState('');
  const [spotPreviewImageFile, setSpotPreviewImageFile] = useState('');
  const [spotPreviewImageLoaded, setSpotPreviewImageLoaded] = useState(false);
  const [spotImages, setSpotImages] = useState([]);
  const [spotImageFiles, setSpotImageFiles] = useState([]);

  const [defaultImage, setDefaultImage] = useState('');
  const [originalDefaultImage, setOriginalDefaultImage] = useState([]);
  const [defaultImageObject, setDefaultImageObject] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();
  const [loaded, isLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

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
  const [buttonClass, setButtonClass] = useState('host-form-submit-button button');
  const [buttonText, setButtonText] = useState('Update Spot');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { modal, openModal, closeModal, needsRerender, setNeedsRerender } = useContext(ModalContext);
  let timeoutId;
  const user = useSelector((state) => state.session.user);
  const currentSpot = useSelector((state) => state.spots.currentSpot);



  // first load in current spot
  useEffect(() => {
    dispatch(spotActions.getSpotThunk(spotId)).then(() => {
      setImagesLoaded(true)
    })

  }, [dispatch, spotId, user]);



  //load in current images
  useEffect(() => {
    if(loaded) return
    if(imagesLoaded){
      
      let images = currentSpot.SpotImages;


      console.log(images);


          images.map((image, index) => {
            if(image.preview){
              setDefaultImage(image.url)
              setOriginalDefaultImage(image.url)
              setSpotPreviewImage(image.url);
              setSpotPreviewImageLoaded(true);
              setSpotImages((prevSpotImages) => [image.url, ...prevSpotImages]);
            } else {
              setSpotImages((prevSpotImages) => [...prevSpotImages, image.url]);
            }
          })
            isLoaded(true)
        }

  }, [imagesLoaded, currentSpot,loaded]);



//check if spotImages changes, first picture is default image
  useEffect(()=>{
    if(loaded){
      if(!spotImages.length) {
        setDefaultImage(false);
        return
      }
      if (spotImages && spotImages[0]) {
        setDefaultImage(spotImages[0])
      }
    }
  },[spotImages])


// load in spot info to text fields
  useEffect(() => {
    if(loaded){
    if (currentSpot) {
      setCountry(currentSpot.country);
      setAddress(currentSpot.address);
      setCity(currentSpot.city);
      setState(currentSpot.state);
      setLat(currentSpot.lat);
      setLng(currentSpot.lng);
      setDescription(currentSpot.description);
      setName(currentSpot.name);
      setPrice(currentSpot.price);
      setLatText(currentSpot.lat);
      setLngText(currentSpot.lng);
      setDescriptionText(currentSpot.description);
      setNameText(currentSpot.name);
      setPriceText(currentSpot.price);
    }}
  }, [loaded]);

// validation and error handling - form
  useEffect(() => {
    const errors = {};

    if (!country.length) errors['country'] = 'Please enter a country';
    if (!address.length) errors['address'] = 'Please enter an address';
    if (!city.length) errors['city'] = 'Please enter a city';
    if (!state.length) errors['state'] = 'Please enter a state';
    if (!description.length) errors['description'] = 'Please enter a description';
    if (!name.length) errors['name'] = 'Please enter a spot name';
    if (!price) errors['price'] = 'Please enter a price';
    if (!defaultImage) errors['defaultImage'] = 'Please enter URL or Add Image from local files';

    if (!spotImages.length) errors['spotImages'] = 'Please enter URL or Add Image from local files';
      
    
    setValidationErrors(errors);
  }, [country,address,city,state,description,name,price,defaultImage,spotImages]);


// validation and error handling - button
  useEffect(() => {

    if (Object.keys(validationErrors).length > 0) {
      setButtonClass('host-form-submit-button disabled');
      setDisabledButton(true);
    } else {
      setButtonClass('host-form-submit-button button');
      setDisabledButton(false);
    }
  }, [validationErrors]);

 // Check if the current default is different from the original default
 // Check if it's a blob
 // Set the defaultImageObject state variable
 useEffect(() => {
  if (loaded) {

    if (originalDefaultImage === defaultImage) {
      setDefaultImageObject(null)
    }

    if (originalDefaultImage !== defaultImage) {
      if (defaultImage.toString().slice(0, 4) === "blob") {
        let name

        spotImageFiles.map((file)=>{
          if(file.img === defaultImage){
            name = file.name
          }
        })



        setDefaultImageObject({ defaultImage: spotImages[0], isBlob: true, defaultId: null, name:name });

      } else {     
        let defaultId 
        currentSpot.SpotImages.map((image)=>{
          if(image.url === defaultImage){
            defaultId = image.id
          }
        })

        setDefaultImageObject({ defaultImage: defaultImage, isBlob: false, defaultId });
      }
    }
  }
}, [defaultImage, originalDefaultImage,loaded]);
    

//  // Check the defaultImageObject state
//  useEffect(() => {
//   console.log('defaultImageObject',defaultImageObject);
// }, [defaultImageObject]);



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (disabledButton) return

    // which to add...
    // spotImageFiles get added
    let imagesToAdd = spotImageFiles.map((obj)=>obj.file)


    // which to delete...
    //anything thats not still in our spotImages stateArray
    const getRemovedImageIds = () => {
      if (currentSpot && loaded) {
        const removedImageIds = [];
    
        for (let i = 0; i < currentSpot.SpotImages.length; i++) {
          const image = currentSpot.SpotImages[i];
          const imageUrl = image.url;
    
          // Check if imageUrl is not in the spotImages array
          if (!spotImages.includes(imageUrl)) {
            // If not, add the image ID to the removedImageIds array
            removedImageIds.push(image.id);
          }
        }
    
        return removedImageIds;
      }
      return [];
    };

    let imagesToRemove = getRemovedImageIds()

    console.log(imagesToRemove);
    console.log(imagesToAdd);
    console.log(defaultImageObject);


    console.log(country);
    console.log(address);
    console.log(city);
    console.log(state);
    console.log(lat);
    console.log(lng);
    console.log(description);
    console.log(name);
    console.log(price);
    console.log(imagesToRemove);
    console.log(imagesToAdd);
    console.log(defaultImageObject);
  

    let spotId = currentSpot.id
    console.log(spotId);

      try {
        const { data, response } = await dispatch(
          spotActions.editSpotThunk(
            spotId,
            country,
            address,
            city,
            state,
            lat,
            lng,
            description,
            name,
            price,
            imagesToRemove,
            imagesToAdd,
            defaultImageObject
          )
        );

        if (data) {
          setFormSubmitted(true);
          history.push(`/spots/${data.id}`);
        }
      } catch (error) {

        console.log('yes error');
        console.log('yes error');

        console.log(error);

        setDisabledButton(true);
        setButtonClass('host-form-submit-button disabled');

        if(error.data){
          if(error.data.errors){

        if (error.data.errors.lat) {
          setLat('Latitude must be a number');
          setLatClass('lat-field red-font');
        }
        if (error.data.errors.lng) {
          setLng('Longitude must be a number');
          setLngClass('lng-field red-font');
        }
        if (error.data.errors.price) {
          setPrice('Price must be a number');
          setPriceClass('host-form-spot-price-field red-font');
        }
        if (error.data.errors.description) {
          setDescription('Tell us more! (30 char min)');
          setDescriptionClass('description-field red-font');
        }

        if (error.data.errors.name) {
          setName('Name must be less than 50 characters');
          setNameClass('host-form-spot-title-field red-font');
        }
      }
    }
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
    
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
  };

  
  const addImageFromUrl = async () => {
    console.log('click');
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

      console.log(imageUrl);

      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], 'image_from_url', { type: blob.type });
        
        setSpotPreviewImage(imageUrl);
        setSpotImages((prevSpotImages) => [...prevSpotImages, imageUrl]);
        setSpotImageFiles((prevSpotImageFiles) => [...prevSpotImageFiles, {img: imageUrl,file}]);
        setImageUrl('');


      } catch (error) {

        // if error, pop up modal to show that user needs to download the picture and upload
        // host server doesnt allow image sharing


        console.error('Error fetching image from URL:', error);
      }
    }
  };

  const deleteImage = () => {
    const newImages = spotImages.filter((currentImage) => currentImage !== spotPreviewImage);
    const newFiles = spotImageFiles.filter((currentImage) => currentImage.img !== spotPreviewImage);
    setSpotImages(newImages);
    setSpotImageFiles(newFiles);
  };


  const removeImage = (image) => {
    const newImages = spotImages.filter((currentImage) => currentImage !== image);
    const newFiles = spotImageFiles.filter((currentImage) => currentImage.img !== image);
    setSpotImages(newImages);
    setSpotImageFiles(newFiles);
  };


// sets main image
  const selectImage = (image) => {
    console.log(image);
    setSpotPreviewImage(image);
  };




  // reorders spotImage preview and sets default image for backend processing
  const makeDefault = (file) => {
    const index = spotImages.findIndex(
      (currFile) => currFile === spotPreviewImage
    );
    if (index > 0) {
      const newImages = [
        spotImages[index],
        ...spotImages.slice(0, index),
        ...spotImages.slice(index + 1),
      ];
      setSpotImages(newImages);
      setDefaultImage(file)
    }
  };


// creates img src for new image, adds image to spotImageFiles to be backend processed 
  const handleFileSelect = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSpotPreviewImage(URL.createObjectURL(file));
      let tempImage = URL.createObjectURL(file)
      setSpotImages(() => [...spotImages, tempImage]);
      setSpotImageFiles((prevSpotImageFiles) => [...prevSpotImageFiles, {img: tempImage, file, name:file.name}]);
    }
  };
  




  const getErrorClass = (field) => {
    return formSubmitted && validationErrors[field] ? `${field}-red-font` : ``;
  };


  return (
    <div className="host-form-page">
      <div className="host-form-page-container">
        <div className="host-header">
          <div className="host-header-text">Update your Spot</div>
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
                className={ imageUrlClass === '' ? `host-form-spot-preview-image-field ${getErrorClass('defaultImage')}` : imageUrlClass}
                type="text"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setImageUrlText(e.target.value)
                }}
                placeholder={
                  validationErrors['defaultImage']
                    ? validationErrors['defaultImage']
                    : spotPreviewImageFile.name
                }
              />
              <button
                className="add-image-from-url button"
                type="button"
                onClick={addImageFromUrl}
              >
                Add From URL
              </button>
            </label>

            <button className={buttonClass} type="submit" disabled={disabledButton}>
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
              {/* <img src={'https://airbnb-clone-spot-photos.s3.amazonaws.com/public/1681687214144.png'} alt="preview"></img> */}

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
            type={'spotUpdate'}
          />
        </div>
      </div>
    </div>
  );
};

export default EditSpot;
