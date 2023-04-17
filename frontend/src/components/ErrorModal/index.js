import React, { useEffect, useRef, useState, useContext } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, renderMatches, useHistory, useLocation } from 'react-router-dom';
import { ModalContext } from '../../context/ModalContext';
import * as spotActions from '../../store/spots';
import './ErrorModal.css'


const ErrorModal = ({type}) => {
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

  const handleDelete = async (e) =>{
    e.stopPropagation();
    e.preventDefault();
    if(updateObj.address){
      let spotId = updateObj.id
      try {
        const { response } = await dispatch(
          spotActions.deleteSpotThunk(spotId)
        );
  
        if (response.ok) {
          e.preventDefault();
          render()
          closeModal()
    
        }
      } catch (error) {
        console.error(error);
      }
    }

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
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <div className="error-modal-container" ref={formRef}>
      <h1 className="error-modal-header">Oops! We couldn't add your image</h1>
      <div className="error-modal-memo">It looks like the image you tried to add is private. Please either select a public image or upload one from your own computer.</div>
      <div className="error-modal-memo-thanks">Thanks!</div>
      <button className="error-modal-close-button close-button" onClick={closeModal} >
        X
      </button>



      <button className="error-modal-confirm-button button button2" onClick={closeModal} >
        Ok
      </button>
      

    </div>
  );
}
export default ErrorModal