import React from 'react'
import './Reviews.css'
import UserReview from '../UserReview'
import ReviewStat from '../ReviewStat'

const Reviews = ({currentSpot}) => {


  console.log(currentSpot);
  const reviews = currentSpot.Reviews
  console.log(reviews);




  return (
    <div className='review-component-container'>

      <div className='review-component-review-stat'><ReviewStat currentSpot={currentSpot} /></div>

      <button className='review-component-post-review'>Post Your Review</button>

      {reviews.map((review,index)=>(
        <div key={index} className='review-component-review'><UserReview review={review}/></div>
      ))}

    
    
    
    </div>
  )
}


export default Reviews