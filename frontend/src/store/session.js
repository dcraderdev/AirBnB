const SIGN_IN = 'session/login'
const signIn = (user) => {
  user
}

const session = (state = initialState, action) =>{
  const newState = { ...state}

  switch (action.type) {
    case SIGN_IN:
      return { ...newState, user: action.payload };
    default:
      return newState;
  }

}


export default userReducer;