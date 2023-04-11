import React, { useEffect, useRef, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalContext } from '../../context/ModalContext';

import './Reviews.css'
import UserReview from '../UserReview'
import ReviewStat from '../ReviewStat'


const Reviews = () => {
  const [userHasReview, setUserHasReview] = useState(false)
  const [spotHasReviews, setSpotHasReviews] = useState(false)
  const [isSpotOwner, setIsSpotOwner] = useState(false)
  const [reviews, setReviews] = useState([])
  const { modal, openModal } = useContext(ModalContext);


  const user = useSelector((state) => state.session.user);
  const currentSpot = useSelector((state) => state.spots.currentSpot);

  console.log(currentSpot);
  console.log(reviews);

  useEffect(() => {

    if(currentSpot) setReviews(currentSpot.Reviews)
    if (user) setIsSpotOwner(currentSpot.ownerId===user.id)
    setSpotHasReviews(currentSpot.Reviews.length > 0 ? true : false)

  }, [user, currentSpot]);


  useEffect(() => {

    if (user && reviews) {
      const checkHasReview = reviews.find((review) => {
        return review.User.id === user.id;
      });

    setUserHasReview(checkHasReview ? true : false);
    setIsSpotOwner(currentSpot.ownerId===user.id)
    }



  }, [reviews]);










  return (
    <div className='review-component-container'>

      <div className='review-component-review-stat'><ReviewStat /></div>

      <div className='review-component-post-review-container'>
        {!userHasReview && !isSpotOwner && user && <button className='review-component-post-review button' onClick={()=>{openModal('review')}}>Post Your Review</button>}
      </div>


      {!spotHasReviews && !isSpotOwner && user && (

        <div className='review-component-be-first-review'>
          Be the first to post a review!
        </div>

      )}

      
      {spotHasReviews && reviews.map((review,index)=>(
        <div key={index} className='review-component-review'><UserReview review={review}/></div>
      ))}

    </div>
  )
}


export default Reviews