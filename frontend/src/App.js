import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import * as sessionActions from './store/session';
import * as spotActions from './store/spots';
import Navigation from './components/Navigation';
import CreateSpot from './components/CreateSpot';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);



  useEffect(() => {
    dispatch(sessionActions.restoreUser());
    dispatch(spotActions.getAllSpotsThunk());
    setIsLoaded(true);
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <Switch>
        
        <Route exact path="/host">
          <CreateSpot />
        </Route>

        <Route path="/">
            <Home />
        </Route>


        
      </Switch>
    </>
  );
}

export default App;
