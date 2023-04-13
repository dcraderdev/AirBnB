import React, { useEffect, useRef, useState, useContext } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, renderMatches, useHistory, useLocation } from 'react-router-dom';
import { ModalContext } from '../../context/ModalContext';
import * as spotActions from '../../store/spots';
import './DeleteModal.css'


const DeleteModal = ({}) => {
  const { modal, openModal, closeModal, render, updateObj, setUpdateObj } = useContext(ModalContext);
  const formRef = useRef()
  const dispatch = useDispatch();
  const history = useHistory()
  const [memo, setMemo] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [cancelText, setCancelText] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [setting, setSetting] = useState(false);


  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/spots/')) {
      setSetting('review');
    }
    if (location.pathname === '/manage') {
      setSetting('spot');
    }
}, [location.pathname]);

  
  useEffect(() => {
    if (setting === 'spot') {
      setMemo('Are you sure you want to remove this spot from the listings?');

      setConfirmText('Yes (Delete Spot)');
      setCancelText('No (Keep Spot)');
      setLoaded(true);
    }
    if (setting === 'review') {
      setMemo('Are you sure you want to delete this review?');
      setConfirmText('Yes (Delete Review)');
      setCancelText('No (Keep Review)');
      setLoaded(true);
    }
  }, [setting]);

  const handleDelete = async () =>{
    console.log(updateObj);

    // console.log('its a spot');
    if(updateObj.address){
      let spotId = updateObj.id
      try {
        const { response } = await dispatch(
          spotActions.deleteSpotThunk(spotId)
        );
  
        if (response.ok) {
        
          render()
          closeModal()
    
        }
      } catch (error) {
        console.error(error);
      }
    }


    // console.log('its a review');
    if(updateObj.review){
      let reviewId = updateObj.id
      try {
        const { response } = await dispatch(
          spotActions.deleteReviewThunk(reviewId)
        );
  
        if (response.ok) {
        
          render()
          closeModal()
    
        }
      } catch (error) {
        console.error(error);
      }
 
    }
  }



  // if (!loaded) {
  //   return <div>Loading...</div>;
  // }
  return (
    <div className="delete-modal-container" ref={formRef}>
      <div className="delete-modal-header">Confirm Delete</div>
      <div className="delete-modal-memo">{memo}</div>
      <button className="delete-modal-close-button close-button" onClick={closeModal} >
        X
      </button>

      <button className="delete-modal-confirm-button button button2" onClick={handleDelete} >
        {confirmText}
      </button>

      <button className="delete-modal-cancel-button button button2" onClick={closeModal} >
        {cancelText}
      </button>
      

    </div>
  );
}
export default DeleteModal