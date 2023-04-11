import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ReviewStat.css';

const ReviewStat = () => {
  const currentSpot = useSelector((state) => {
    return state.spots.currentSpot;
  });


  const reviewsText =
    currentSpot && currentSpot.numReviews == 1 ? ' Review' : ' Reviews';
  const rating =
    currentSpot && currentSpot.avgStarRating !== 'NaN'
      ? currentSpot.avgStarRating
      : 'New!';

  return (
    <>
      {!currentSpot.numReviews && (
        <div>
          <div className="review-stat-container-0">
          <i className="fa-solid fa-star" />{rating}
          </div>
        </div>
      )}

      {currentSpot.numReviews > 0 && (
        <div>
          <div className="review-stat-container">
          <i className="fa-solid fa-star" />{rating}
            <i className="fa-solid fa-circle"></i>
            {currentSpot.numReviews} {reviewsText}
          </div>
        </div>
      )}
    </>
  );
};
export default ReviewStat;
