import React from 'react';

export function DetailsFullGallery({ stay, onClose }) {
  return (
      <div className="full-gallery ">
      
        
        <div className='grid-item large-image'>
        <img src={stay.imgUrls[0].url} alt="" />
        </div>
        <div className="grid-item">
          <img src={stay.imgUrls[0].url} alt="" />
        </div>
        <div className="grid-item">
          <img src={stay.imgUrls[0].url} alt="" />
        </div>
        <div className="grid-item large-image">
          <img src={stay.imgUrls[0].url} alt="" />
        </div>
        <div className="grid-item">
          <img src={stay.imgUrls[0].url} alt="" />
        </div>
        <div className="grid-item">
          <img src={stay.imgUrls[0].url} alt="" />
        </div>
      
        <button onClick={onClose}>Close</button>
     </div> 
     
  );
}

