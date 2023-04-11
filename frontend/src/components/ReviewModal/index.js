import React, { useEffect, useRef, useState, useContext } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import './ReviewModal.css';
import { ModalContext } from '../../context/ModalContext';

const ReviewModal = ({ closeModal }) => {
  const formRef = useRef(null);
  const [review, setReview] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

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
    <div className='review-modal-container' ref={formRef}>
      ReviewModal
    
      <div className='review-modal-header'>How was your stay?</div>
      <form>
      <label>
      Leave your review here
          <textarea

          className='review-modal-review-input'
          type="text"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
          placeholder={validationErrors['review'] || ''}
        
        />
      </label>

      </form>
    
    </div>
  )
}
export default ReviewModal