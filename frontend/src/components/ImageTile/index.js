import React, { useEffect, useRef, useState } from 'react';

import './ImageTile.css';


const ImageTile = ({ spotImages, setSpotImages, removeImage, selectImage }) => {

  //first image in list should be the default image
  // create list object of all image names
  // have delete button next to each name to remove them from the spotImages array




  console.log(spotImages.map((file, index) => {console.log('file',file);}));

  return (
    <div>
      <div className="image-thumbnail-container">
        {spotImages && spotImages.map((file, index) => (
          <div key={index} className="image-thumbnail" onClick={()=>{selectImage(file)}}>
            <img src={URL.createObjectURL(file)} alt={`Thumbnail ${index}`}  />
            <button className='button' onClick={() => removeImage(file)}>Delete</button>
          </div>
        ))}
        
      </div>
    </div>
  );
};

export default ImageTile;