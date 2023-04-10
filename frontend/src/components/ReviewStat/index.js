import React from 'react'

const ReviewStat = ({currentSpot}) => {

  const reviewsText = currentSpot && currentSpot.numReviews == 1 ? ' Review' : ' Reviews'
  const rating = currentSpot && currentSpot.avgStarRating !== 'NaN' ? currentSpot.avgStarRating : 'New!'

  
  return (
    <div>
    {currentSpot.price.toFixed(2)}Night ⭐️{rating} {currentSpot.numReviews} {reviewsText}
  </div>
  )
}
export default ReviewStat