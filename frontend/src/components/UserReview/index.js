import React, {useState, useEffect, useContext} from 'react'
import './UserReview.css'
import { useDispatch, useSelector } from 'react-redux';
import { ModalContext } from '../../context/ModalContext';



const UserReview = ({review, setUpdate}) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.session.user);
  const [isCreator, setIsCreator] = useState(false)
  const { modal, openModal, closeModal,render,needsRerender,setNeedsRerender, updateObj, setUpdateObj } = useContext(ModalContext);

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
  },[user,review])




  return (
    <div className='user-review-container'>
      
      <div className='user-review-name'>{review.User.firstName}</div>

      <div className='user-review-month-year'>{monthName} {year}
      
      {isCreator && <button
            className="image-main-button-delete button"
            onClick={()=>{
              openModal('delete')
              setUpdateObj(review)
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