import React, { useEffect, useRef, useState } from 'react';
import logo from '../../public/logo.png';

import './ImageTile.css';

const ImageTile = ({
  spotImages,
  setSpotImages,
  removeImage,
  selectImage,
  type,
}) => {
  if (type === 'spotView') {
    return (
      <div className="spot-view-image-thumbnail-container">
        {spotImages &&
          spotImages.map((file, index) => (
            <div
              key={index}
              className="spot-view-image-thumbnail"
              onClick={() => {
                selectImage(file);
              }}
            >
              {!file.url && (
                <div className="default-image">
                  <div className="logo-container">
                    <img src={logo} alt="Airbnb logo"></img>
                  </div>
                </div>
              )}
              {file.url && (
                <img src={file.url} alt={`Thumbnail ${spotImages[0].id}`} />
              )}
            </div>
          ))}
      </div>
    );
  }

  // { source && <img src={source} alt={`Thumbnail ${spotImages[0].id}`}  />}

  return (
    <div>
      <div className="image-thumbnail-container">
        {spotImages &&
          spotImages.map((file, index) => (
            <div
              key={index}
              className="image-thumbnail"
              onClick={() => {
                selectImage(file);
              }}
            >
              <img src={URL.createObjectURL(file)} alt={`Thumbnail ${index}`} />
              <button className="button" onClick={() => removeImage(file)}>
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ImageTile;
