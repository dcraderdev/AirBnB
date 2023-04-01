import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import CreateSpot from './components/CreateSpot';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import SpotView from './components/SpotView';
import Home from './components/Home';
import * as sessionActions from './store/session';
import * as spotActions from './store/spots';
import { ModalContext } from './context/ModalContext';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  const { modal, closeModal } = useContext(ModalContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser());
    dispatch(spotActions.getAllSpotsThunk());
    setIsLoaded(true);
  }, [dispatch]);


  useEffect(() => {
    if (location.pathname === '/login') {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [location]);



  return (
    <>


      <Navigation isLoaded={isLoaded} />

      {modal && (
        <div className="modal-container">
          {modal === 'login' && <LoginModal closeModal={closeModal} />}
          {modal === 'signup' && <SignupModal closeModal={closeModal} />}
        </div>
      )}



      <Switch>

        <Route path="/spots/:spotId">
          <SpotView />
        </Route>
        
        <Route exact path="/host">
          <CreateSpot />
        </Route>

        <Route exact path="/">
            <Home />
        </Route>


        
      </Switch>
    </>
  );
}

export default App;
