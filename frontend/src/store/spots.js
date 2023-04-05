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


const CREATE_SPOT = 'spots/create';
const createSpot = (spot) => {

  return {
    type: CREATE_SPOT,
    payload: spot,
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

  if(spotId === null){
    dispatch(getSpot(null))
  }

  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'GET',
  });
  const data = await response.json();

  dispatch(getSpot(data));
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
  spotPreviewImage
  ) => async (dispatch) => {
  
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    body:JSON.stringify({  
      country,
      address,
      city,
      state,
      lat,
      lng,
      description,
      name,
      price,
      spotPreviewImage
    })
  });
  const data = await response.json();
  console.log(data);
  dispatch(createSpot(data));
  return {data,response};
};


const initialState = { spots:[] };
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
    case CREATE_SPOT:

      return {
        ...newState,
        spots: [...newState.spots, action.payload.spot],
      };
    case REMOVE_USER:
      return {
        ...newState,
        currentSpot: null
      }

    default:
      return newState;
  }
};

export default spotsReducer;