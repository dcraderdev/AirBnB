import React, { useState, useRef, useEffect } from 'react';
import ImageTile from '../ImageTile';
import './ImageSlider.css';




const ImageSlider = ({ spotImages, selectImage, isMobileView }) => {
  const [images1, setImages1] = useState([]);
  const [images2, setImages2] = useState([]);
  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);


  const [currentSlide, setCurrentSlide] = useState(0);

  let clonedEnd = spotImages.slice(0, 1);
  let loopedImages = spotImages % 2 === 0 ? [...spotImages] : [ ...spotImages, ...clonedEnd];



  const swipeContainerRef = useRef(null);
  let touchStartX = 0;

  const handleTouchStart = event => {
    touchStartX = event.touches[0].clientX;
  };

  const handleTouchEnd = event => {
    const touchEndX = event.changedTouches[0].clientX;
    const diffX = touchStartX - touchEndX;

    // If swiped left and there are more images to show
    if (diffX > 50 && currentSlide < loopedImages.length / 2 - 1) {
      setCurrentSlide(prev => prev + 1);
    }

    // If swiped right and there are previous images
    if (diffX < -50 && currentSlide > 0) {

      setCurrentSlide(prev => prev - 1);
    }
  };



  const mobileImageSlideBack = () => {
    if ( currentSlide < loopedImages.length / 2 - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const mobileImageSlideForward = () => {

    if ( currentSlide > 0) {

      setCurrentSlide(prev => prev - 1);
    }
  };






  useEffect(() => {
    const container = swipeContainerRef.current;
    if(!container) return
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);
     
    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSlide]);

  const sliderStyle = {
    transform: `translateX(-${currentSlide * window.innerWidth}px)`,
    transition: 'transform 0.3s ease',
  };












  useEffect(() => {

    if(isMobileView) return
    let set1 = [];
    let set2 = [];
    if(spotImages.length < 6){
      let imagesNeeded = 6 - spotImages.length
      for(let i = 0; i < imagesNeeded; i++){
        spotImages.push({})
      }
    }

    spotImages.map((image, i) => {
      if (i % 2 === 0) set1.push(image);
      if (i % 2 === 1) set2.push(image);
    });
    setImages1(set1);
    setImages2(set2);
  }, []);


  const imageSlideBack = (slider) => {
    if (slider === 1 && currentIndex1 > 0) {
      setCurrentIndex1(currentIndex1 - 1);
    }
    if (slider === 2 && currentIndex2 > 0) {
      setCurrentIndex2(currentIndex2 - 1);
    }
  };

  const imageSlideForward = (slider) => {

    if (slider === 1 && currentIndex1 < images1.length - 2) {
      setCurrentIndex1(currentIndex1 + 1);
    }
    if (slider === 2 && currentIndex2 < images2.length - 2) {
      setCurrentIndex2(currentIndex2 + 1);
    }
  };

  const imageTileStyle1 = {
    transform: `translateX(-${currentIndex1 * 200}px)`,
  };

  const imageTileStyle2 = {
    transform: `translateX(-${currentIndex2 * 200}px)`,
  };;





  return (

    <>
    
    
{!isMobileView &&            <div>
      <div className="slider1">
        <div className="back-button slider-button" onClick={() => imageSlideBack(1)}>
          <i className="fa-solid fa-angles-left"></i>
        </div>
        <div className="images-container" style={imageTileStyle1}>
          <ImageTile spotImages={images1} type={'spotView'} selectImage={selectImage} />
        </div>
        <div className="forward-button slider-button" onClick={() => imageSlideForward(1)}>
          <i className="fa-solid fa-angles-right"></i>
        </div>
      </div>

      <div className="slider2">
        <div className="back-button slider-button" onClick={() => imageSlideBack(2)}>
          <i className="fa-solid fa-angles-left"></i>
        </div>

        <div className="images-container" style={imageTileStyle2}>
          <ImageTile spotImages={images2} type={'spotView'} selectImage={selectImage} />
        </div>

        <div className="forward-button slider-button" onClick={() => imageSlideForward(2)}>
          <i className="fa-solid fa-angles-right"></i>
        </div>
      </div>
    </div>}





{isMobileView && (
        <div className="carousel-container" ref={swipeContainerRef}>


        <div className="back-button-mobile slider-button-mobile" onClick={() => mobileImageSlideForward()}>
          <i className="fa-solid fa-angles-left"></i>
        </div>

          <div className="carousel-slides" style={sliderStyle}>
            {loopedImages.map((image, index) => (
              <div key={index} className="carousel-image" onClick={() => selectImage(image)}>
                <img src={image.url} alt={`Slide ${index}`} />
              </div>
            ))}
          </div>


          <div className="forward-button-mobile slider-button-mobile" onClick={() => mobileImageSlideBack()}>
          <i className="fa-solid fa-angles-right"></i>
        </div>
        </div>
      )}

</>



  );
};
export default ImageSlider;
