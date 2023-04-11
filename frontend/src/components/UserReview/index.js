import React from 'react'
import './UserReview.css'
import { useDispatch, useSelector } from 'react-redux';


const UserReview = ({review}) => {

  function getMonthName(index) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[index]
  }

  let dateString = new Date(review.createdAt)
  const month = dateString.getMonth();

  const monthName = getMonthName(month);
  const year = review.createdAt.slice(0,4)

  

  return (
    <div className='user-review-container'>
      
      <div className='user-review-name'>{review.User.firstName}</div>

      <div className='user-review-month-year'>{monthName} {year}</div>
      <div className='user-review'>{review.review}</div>
    </div>
  )
}
export default UserReview