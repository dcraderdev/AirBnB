import { csrfFetch } from './csrf';
import {REMOVE_USER } from './session'


const GET_SPOTS = 'spots/all';
const getSpots = (spots) => {
  return {
    type: GET_SPOTS,
    payload: spots,
  };
};

const GET_SPOT = 'spot/get';
const getSpot = (spot) => {
  return {
    type: GET_SPOT,
    payload: spot,
  };
};

const USER_SPOTS = 'spot/user';
const userSpots = (spots) => {
  return {
    type: USER_SPOTS,
    payload: spots,
  };
};



const CREATE_SPOT = 'spots/create';
const createSpot = (spot) => {

  return {
    type: CREATE_SPOT,
    payload: spot,
  };
};

const EDIT_SPOT = 'spots/edit';
const editSpot = (spot) => {

  return {
    type: EDIT_SPOT,
    payload: spot,
  };
};

const DELETE_SPOT = 'spots/delete';
const deleteSpot = (spot) => {

  return {
    type: DELETE_SPOT,
    payload: spot,
  };
};



const CREATE_REVIEW = 'review/create';
const createReview = (review) => {

  return {
    type: CREATE_REVIEW,
    payload: review,
  };
};


export const getAllSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots', {
    method: 'GET',
  });

  const data = await response.json();

  dispatch(getSpots(data));
  return {data,response};
};


export const getSpotThunk = (spotId) => async (dispatch) => {

  if(spotId === null) dispatch(getSpot(null))
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'GET',
  });
  const data = await response.json();
  dispatch(getSpot(data));
  return response;
};

export const getUsersSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/current`, {
    method: 'GET',
  });
  const data = await response.json();
  dispatch(userSpots(data));
  return response;
};


export const createSpotThunk = (       
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
  ) => async (dispatch) => {

    const formData = new FormData();
    formData.append("country", country);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    if (lat) formData.append("lat", lat);
    if (lng) formData.append("lng", lng);
    formData.append("description", description);
    formData.append("name", name);
    formData.append("price", price);
    // if(spotImages) formData.append("spotImages", spotImages);
    if (spotImages) {
      for (let i = 0; i < spotImages.length; i++) {
        formData.append("spotImages", spotImages[i]);
      }
    }
    

  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    body: formData
  });
  const data = await response.json();

  dispatch(createSpot(data));
  return {data,response};
};



export const editSpotThunk = (spotId, country, address, city, state, lat, lng, description, name, price, imagesToRemove, imagesToAdd, defaultImageObject) => async (dispatch) => {
    

  const formData = new FormData();
  formData.append("country", country);
  formData.append("address", address);
  formData.append("city", city);
  formData.append("state", state);
  if (lat) formData.append("lat", lat);
  if (lng) formData.append("lng", lng);
  formData.append("description", description);
  formData.append("name", name);
  formData.append("price", price);
  formData.append("imagesToRemove", imagesToRemove);
  // if(spotImages) formData.append("spotImages", spotImages);
  if (imagesToAdd) {
    for (let i = 0; i < imagesToAdd.length; i++) {
      formData.append("spotImages", imagesToAdd[i]);
    }
  }
  if(defaultImageObject){
    formData.append("stringifiedDefaultImageObject", JSON.stringify(defaultImageObject));
  }

const response = await csrfFetch(`/api/spots/${spotId}`, {
  method: 'PUT',
  body: formData
});



const data = await response.json();

// dispatch(editSpot(data));
if(data) return {data,response};
};


export const deleteSpotThunk = (spotId) => async (dispatch) => {

  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE',
  });
  const data = await response.json();

  dispatch(deleteSpot(data));
  return {data,response};
};

export const createReviewThunk = (review, stars, spotId) => async (dispatch) => {

  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    body:JSON.stringify({  
      review,
      stars
    })
  });
  const data = await response.json();
  dispatch(createReview(data));
  return {data, response};
};



export const deleteReviewThunk = (reviewId) => async (dispatch) => {

  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  return {data, response};
};



const initialState = { spots:[], reviews:[], userSpots: [] };
const spotsReducer = (state = initialState, action) => {


  let newState = {...state};
  switch (action.type) {
    case GET_SPOTS:
      return {
        ...newState,
        spots: action.payload.Spots,
      };
    case GET_SPOT:
      return {
        ...newState,
        currentSpot: action.payload,
      };
    case USER_SPOTS:
      return {
        ...newState,
        userSpots: action.payload,
      };

    case CREATE_SPOT:
      return {
        ...newState,
        spots: [...newState.spots, action.payload.spot],
      };

    case DELETE_SPOT:
      return {
        ...newState,
        deletedSpot: action.payload.spot,
      };

    case REMOVE_USER:
      return {
        ...newState,
        currentSpot: null,
        userSpots: []
      }
    case CREATE_REVIEW:
      return {
        ...newState,
        reviews: [...newState.reviews, action.payload],
      };

    default:
      return newState;
  }
};

export default spotsReducer;