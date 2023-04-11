import React, { useEffect, useRef, useState, useContext } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import './ReviewModal.css';
import { ModalContext } from '../../context/ModalContext';
import * as spotActions from '../../store/spots';

const ReviewModal = ({ closeModal, onReviewAdded}) => {
  const formRef = useRef(null);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [starIndex, setStarIndex] = useState(-1);
  const [validationErrors, setValidationErrors] = useState({});
  const [createReviewErrors, setCreateReviewErrors] = useState({});

  const [disabledButton, setDisabledButton] = useState(false);
  const [buttonClass, setButtonClass] = useState('post-review-button button button2 ');
  const [buttonText, setButtonText] = useState('Submit Your Review');

  const currentSpot = useSelector((state) => state.spots.currentSpot);
  const dispatch = useDispatch();
  const { modal, openModal } = useContext(ModalContext);


  useEffect(() => {

    setRating(starIndex+1)

    const errors = {};
    const reviewErrors = {};

    if (!review.length) errors['review'] = 'Please enter a review';
    if (rating < 1) {
      errors['rating'] = 'Please enter at least 1 star';
      reviewErrors['rating'] = 'Please enter at least 1 star';
    }

    if (review.length < 10) {
      reviewErrors['review'] = 'Review must be at least 10 characters';
    }

    setValidationErrors(errors);
    setCreateReviewErrors(reviewErrors);
  }, [review, rating, starIndex]);



  useEffect(() => {
    if (Object.keys(createReviewErrors).length > 0) {
      setButtonClass('post-review-button disabled disabled2');
    } else {
      setButtonClass('post-review-button button button2 ');
    }
  }, [createReviewErrors]);




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





  const fillStars=(index)=>{
    // deselect star if selected
    if(starIndex === index) setStarIndex(index-1)

    // select star
    if(starIndex !== index) setStarIndex(index)

    setRating(starIndex+1)
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    let spotId = currentSpot.id
    try {
      const { response } = await dispatch(
        spotActions.createReviewThunk(review, rating, spotId)
      );

    if (response.ok) {
      closeModal();
    }

    } catch (error) {
      console.error(error);

    }
  };


  return (
    <div className='review-modal-container' ref={formRef}>
    
      <div className='review-modal-header'>How was your stay?</div>
      <button className="close-button" onClick={closeModal} >
        X
      </button>
      <form onSubmit={handleSubmit} className="review-modal-form">

      <div className='review-modal-star-selection'>
      {[...Array(5)].map((el, index) => (
        <i
          key={index}
          className={`${index > starIndex ? 'fa-star fa-regular' : 'fa-star fa-solid'}`}
          onClick={() => fillStars(index)}
        />
      ))}
      </div>


      <label>
      Leave your review here
          <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
          placeholder={validationErrors['review'] || ''}
        
        />
      </label>



        <button
          type="submit"
          className={buttonClass}
          disabled={Object.keys(createReviewErrors).length > 0 || disabledButton}
        >
          {buttonText}
        </button>


      </form>
    
    </div>
  )
}
export default ReviewModal