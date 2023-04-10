import React from 'react'
import './UserReview.css'

const UserReview = ({review}) => {

  return (
    <div className='user-review-container'>
      
      <div className='user-review-name'>name</div>

      <div className='user-review-month-year'>month/year</div>
      <div className='user-review'>UserReview</div>
    </div>
  )
}
export default UserReview