import { csrfFetch } from './csrf';

const GET_SPOTS = 'spots/all';

const getSpots = (spots) => {
  return {
    type: GET_SPOTS,
    payload: spots,
  };
};




export const getAllSpotsThunk = () => async (dispatch) => {

  const response = await csrfFetch('/api/spots', {
    method: 'GET',
  });
  const data = await response.json();
  console.log(data);
  dispatch(getSpots(data));
  return response;
};




const initialState = {spots: []};

const spotsReducer = (state = initialState, action) => {

  console.log('action',action);


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