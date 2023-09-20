import React, { useState, useRef, useEffect, useContext } from 'react';
import ImageTile from '../ImageTile';
import './ImageSlider.css';

import { WindowContext } from '../../context/WindowContext';




const ImageSlider = ({ spotImages, selectImage, isMobileView }) => {
  const [images1, setImages1] = useState([]);
  const [images2, setImages2] = useState([]);
  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);
  
  const {windowWidth} = useContext(WindowContext)
  
  
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const swipeContainerRef = useRef(null);
  const carouselRef = useRef(null);
  
  
  //MOBILE EFFECTS
  
  const [maxSwipes, setMaxSwipes] = useState(0);
  const [currentSwipes, setCurrentSwipes] = useState(0);


  useEffect(() => {

      let numImages = spotImages.length
      let numImagesToSpan = windowWidth / 200

      setMaxSwipes(numImages - numImagesToSpan > 0 ? Math.ceil(numImages - numImagesToSpan) : 0)

  }, [windowWidth]);






//DESKTOP EFFECTS

  useEffect(() => {

    if(isMobileView) {
      setImages1(spotImages);
      return
    }


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

    if (slider === 3 && currentSwipes > 0) {
        setCurrentSwipes(currentSwipes - 1)
      setCurrentIndex1(currentIndex1 - 1);
    }
  };

  const imageSlideForward = (slider) => {


    if (slider === 1 && currentIndex1 < images1.length - 2) {
      setCurrentIndex1(currentIndex1 + 1);
    }
    if (slider === 2 && currentIndex2 < images2.length - 2) {
      setCurrentIndex2(currentIndex2 + 1);
    }

    if (slider === 3 && currentSwipes < maxSwipes) {
      setCurrentSwipes(currentSwipes + 1)

      setCurrentIndex1(currentIndex1 + 1);
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
        <div 
        className="carousel-container"

        
        ref={swipeContainerRef}
        
        >


          <div className="back-button-mobile slider-button-mobile" onClick={() => imageSlideBack(3)}>
            <i className="fa-solid fa-angles-left"></i>
          </div>


          <div className="images-container" style={imageTileStyle1}>
            <ImageTile spotImages={spotImages} type={'spotView'} selectImage={selectImage} />
          </div>
 

          <div className="forward-button-mobile slider-button-mobile" onClick={() => imageSlideForward(3)}>
            <i className="fa-solid fa-angles-right"></i>
          </div>


        </div>
      )}

</>



  );
};
export default ImageSlider;
