import React, { useEffect, useRef, useState } from 'react';

import './ImageTile.css';


const ImageTile = ({ spotImages, setSpotImages, removeImage, selectImage }) => {


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