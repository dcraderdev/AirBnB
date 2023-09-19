//SpotTileSkeleton
import React, { useState, useRef, useEffect } from 'react';

import './SpotTileSkeleton.css';
import { Link } from 'react-router-dom';

const SpotTileSkeleton = ({ spot }) => {




  return (
    <div>
        <div className="spottileskeleton">


          <div className="spottileskeleton-image-container shimmer">

          </div>

          <div className="spottileskeleton-spot-info">
            <div className="spottileskeleton-location shimmer"></div>

            
            <div className="spottileskeleton-avg-rating-container shimmer"></div>

              
            
            <div className="spottileskeleton-price-night-container shimmer "></div>
            
          </div>


        </div>
    </div>
  );
};

export default SpotTileSkeleton;
