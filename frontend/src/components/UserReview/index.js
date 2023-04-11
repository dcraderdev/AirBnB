import React, {useState, useEffect} from 'react'
import './UserReview.css'
import { useDispatch, useSelector } from 'react-redux';
import * as spotActions from '../../store/spots';


const UserReview = ({review, setUpdate}) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.session.user);
  const [isCreator, setIsCreator] = useState(false)

  function getMonthName(index) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[index]
  }

  let dateString = new Date(review.createdAt)
  const month = dateString.getMonth();

  const monthName = getMonthName(month);
  const year = review.createdAt.slice(0,4)

  useEffect(()=>{ 
    if(user){
      setIsCreator(user.id === review.User.id ? true : false)
    }

  },[])






  const deleteReview = async () => {
      let reviewId = review.id
      try {
        const { response } = await dispatch(
          spotActions.deleteReviewThunk(reviewId)
        );
  
        if (response.ok) {
          setUpdate(true)
          return
        }
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <div className='user-review-container'>
      
      <div className='user-review-name'>{review.User.firstName}</div>

      <div className='user-review-month-year'>{monthName} {year}
      
      {isCreator && <button
            className="image-main-button-delete button"
            onClick={()=>{
              deleteReview()
            }
          }
          >
            Delete Review
          </button>}
      </div>
      <div className='user-review'>{review.review}</div>
    </div>
  )
}
export default UserReview