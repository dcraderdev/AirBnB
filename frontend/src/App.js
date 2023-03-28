import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Spots from "./components/Spots";
import * as sessionActions from "./store/session";
import * as spotActions from "./store/spots";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const spots = useSelector(state=>{
    return state.spots.spots
  })


  useEffect(() => {
    dispatch(sessionActions.restoreUser())
    dispatch(spotActions.getAllSpotsThunk())
    setIsLoaded(true)
    },[dispatch])


  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <div className="spots-wrapper">
        <Spots spots={spots} />
      </div>
      <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
    </>
  );
}

export default App;
