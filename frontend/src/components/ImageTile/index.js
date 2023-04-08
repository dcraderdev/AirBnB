import React, { useEffect, useRef, useState } from 'react';

import './ImageTile.css';


const ImageTile = ({ spotImages, setSpotImages, removeImage, selectImage, type }) => {

let source
if(spotImages && spotImages[0]){
  console.log(spotImages[0].url);
  source = spotImages[0].url
}


if(type==='spotView'){
  return (
    <div className="spot-view-image-thumbnail-container">
    {spotImages && spotImages.map((file, index) => (
      <div key={index} className="spot-view-image-thumbnail" onClick={()=>{selectImage(file)}}>
        { source && <img src={file.url} alt={`Thumbnail ${spotImages[0].id}`}  />}
      </div>
    ))}
    
  </div>
  )
}

// { source && <img src={source} alt={`Thumbnail ${spotImages[0].id}`}  />}


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