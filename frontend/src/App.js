import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import CreateSpot from './components/CreateSpot';
import ManageSpots from './components/ManageSpots';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import ReviewModal from './components/ReviewModal';
import ProfileButtonModal from './components/ProfileButtonModal';
import SpotView from './components/SpotView';
import Home from './components/Home';
import * as sessionActions from './store/session';
import * as spotActions from './store/spots';
import { ModalContext } from './context/ModalContext';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  const { modal, closeModal} = useContext(ModalContext);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(()=>{
      setIsLoaded(true);
    });
  }, [dispatch]);





  return (
    <>
      {isLoaded && <Navigation />}

      {modal && (
        <div className={
          modal === 'profileMenu' || 'review' ? 'modal-container-transparent': 'modal-container' }>
             
          {modal === 'login' && <LoginModal closeModal={closeModal} />}
          {modal === 'signup' && <SignupModal closeModal={closeModal} />}
          {modal === 'profileMenu' && <ProfileButtonModal closeModal={closeModal} />}
          {modal === 'review' && <ReviewModal closeModal={closeModal} />}
        </div>


      )}



      <Switch>

        <Route path="/spots/:spotId">
          <SpotView />
        </Route>
        
        <Route exact path="/host">
          <CreateSpot />
        </Route>

        <Route exact path="/manage">
          <ManageSpots />
        </Route>

        <Route exact path="/">
            <Home />
        </Route>


        
      </Switch>
    </>
  );
}

export default App;
