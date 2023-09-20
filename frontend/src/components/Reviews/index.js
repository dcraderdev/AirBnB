import React, { useEffect, useRef, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalContext } from '../../context/ModalContext';
import * as spotActions from '../../store/spots';

import './Reviews.css';
import UserReview from '../UserReview';
import ReviewStat from '../ReviewStat';

const Reviews = ({ currentSpot, isMobileView }) => {
  const { modal, openModal, closeModal, render, needsRerender } =
    useContext(ModalContext);
  const [spotHasReviews, setSpotHasReviews] = useState(true);

  const user = useSelector((state) => state.session.user);

  const [reviews, setReviews] = useState([]);
  const [isSpotOwner, setIsSpotOwner] = useState(true);
  const [hasReview, setHasReview] = useState(true);

  useEffect(() => {
    if (currentSpot) {
      setReviews(currentSpot.Reviews);
      if(!user) return
      setIsSpotOwner(currentSpot.ownerId === user.id);
    }
  }, [user, currentSpot]);

  useEffect(() => {
    if (reviews && user) {
      const hasReview = reviews.find((review) => {
        return review.User.id === user.id;
      });
      setHasReview(hasReview ? true : false);
    }
  }, [reviews, user]);


  return (
    <>
      {isMobileView && (
        <div className="review-component-container-mobile">

        <div className="review-component-review-stat-mobile">
            <ReviewStat currentSpot={currentSpot} />

            {!hasReview && !isSpotOwner && user && (
              <button
                className="review-component-post-review button"
                onClick={() => {
                  openModal('review');
                }}
              >
                Post Your Review
              </button>
            )}
          </div>

          

          <div className="review-component-post-review-container-mobile">


          {!currentSpot.Reviews.length && (
            <div className="review-component-be-first-review">
              Be the first to post a review!
            </div>
          )}


          {spotHasReviews &&



            reviews.map((review, index) => (
              <div key={index} className="review-container-mobile">
                <UserReview review={review} isMobileView={isMobileView} />
              </div>




            ))}

          </div>


        </div>
      )}



      {!isMobileView && (
        <div className="review-component-container">
          <div className="review-component-review-stat">
            <ReviewStat currentSpot={currentSpot} />

            {!hasReview && !isSpotOwner && user && (
              <button
                className="review-component-post-review button"
                onClick={() => {
                  openModal('review');
                }}
              >
                Post Your Review
              </button>
            )}
          </div>

          <div className="review-component-post-review-container"></div>

          {!currentSpot.Reviews.length && (
            <div className="review-component-be-first-review">
              Be the first to post a review!
            </div>
          )}

          {spotHasReviews &&
            reviews.map((review, index) => (
              <div key={index} className="review-component-review">
                <UserReview review={review} />
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default Reviews;
