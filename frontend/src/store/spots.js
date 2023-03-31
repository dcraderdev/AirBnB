import { csrfFetch } from './csrf';

const GET_SPOTS = 'spots/all';
const getSpots = (spots) => {
  return {
    type: GET_SPOTS,
    payload: spots,
  };
};



const CREATE_SPOT = 'spots/create';
const createSpot = (spot) => {

  console.log(spot);


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
  return response;
};


const initialState = {spots: []};
const spotsReducer = (state = initialState, action) => {


  let newState = {...state};
  switch (action.type) {
    case GET_SPOTS:
      return {
        ...newState,
        spots: action.payload,
      };


    default:
      return newState;
  }
};

export default spotsReducer;