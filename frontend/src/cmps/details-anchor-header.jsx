import React from 'react';

export function DetailsAnchorHeader() {

  function handleClick(event, id) {
    event.preventDefault()
    const element = document.getElementById(id)

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="anchor-header full details-main-layout">
      <div className="anchor-container">
        <a className="anchor-link" href="#photos" onClick={(event) => handleClick(event, 'photos')}>
          Photos
        </a>
        <a className="anchor-link" href="#amenities" onClick={(event) => handleClick(event, 'amenities')}>
          Amenities
        </a>
        <a className="anchor-link" href="#reviews" onClick={(event) => handleClick(event, 'reviews')}>
          Reviews
        </a>
        <a className="anchor-link" href="#locations" onClick={(event) => handleClick(event, 'locations')}>
          Location
        </a>
      </div>
    </div>
  );
}