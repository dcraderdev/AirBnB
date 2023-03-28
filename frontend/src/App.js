import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Spots from './components/Spots';
import * as sessionActions from './store/session';
import * as spotActions from './store/spots';
import Navigation from './components/Navigation';
import CreateSpot from './components/CreateSpot';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const spots = useSelector((state) => {
    console.log(state);
    return state.spots.spots;
  });

  useEffect(() => {
    dispatch(sessionActions.restoreUser());
    dispatch(spotActions.getAllSpotsThunk());
    setIsLoaded(true);
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <Switch>

        <Route exact path="/">
          <div className="spots-wrapper">
            <Spots spots={spots} />
          </div>
          <LoginFormPage />
        </Route>

        <Route path="/login">
          <LoginFormPage />
        </Route>

        <Route path="/signup">
          <SignupFormPage />
        </Route>

        <Route exact path="/host">
          <CreateSpot />
        </Route>
        
      </Switch>
    </>
  );
}

export default App;
