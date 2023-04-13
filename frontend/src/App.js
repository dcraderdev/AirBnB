import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import CreateSpot from './components/CreateSpot';
import Spots from './components/Spots';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import ReviewModal from './components/ReviewModal';
import DeleteModal from './components/DeleteModal';
import ProfileButtonModal from './components/ProfileButtonModal';
import SpotView from './components/SpotView';
import * as sessionActions from './store/session';
import * as spotActions from './store/spots';
import { ModalContext } from './context/ModalContext';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  const { modal} = useContext(ModalContext);

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
          modal === 'profileMenu' ? 'modal-container-transparent': 'modal-container' }>
             
          {modal === 'login' && <LoginModal />}
          {modal === 'signup' && <SignupModal />}
          {modal === 'profileMenu' && <ProfileButtonModal />}
          {modal === 'review' && <ReviewModal />}
          {modal === 'delete' && <DeleteModal />}
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
          <Spots page={'manage'}/>
        </Route>

        <Route exact path="/">
          <Spots page={'home'}/>
        </Route>


        
      </Switch>
    </>
  );
}

export default App;
