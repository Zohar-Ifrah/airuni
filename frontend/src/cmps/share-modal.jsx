import React from 'react'

export const ShareModal = ({ setIsShareModalOpen, stay }) => {

  function handleCloseModal() {
    setIsShareModalOpen(false)
  }

  function handleCopyLink() {

    const link = `${window.location.origin}/details/${stay._id}`

    // Copy the link to the clipboard
    navigator.clipboard.writeText(link)
      .then(() => {
        console.log('Link copied to clipboard!')
      })
      .catch((error) => {
        console.error('Failed to copy link: ', error)
      })
  }

  function handleEmail() {
    const emailSubject = 'Check out this place!'
    const emailBody = `I found this amazing place and thought you might be interested: ${window.location.origin}/details/${stay._id}`
    const mailtoLink = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`

    // open the user's default email client
    window.location.href = mailtoLink
  }


  function handleWhatsApp() {
    const message = 'Check out this place: '
    const link = `${window.location.origin}/details/${stay._id}`
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message + link)}`

    // Open WhatsApp with pre-filled message and link
    window.open(whatsappLink, '_blank')
  }

  return (
    <div className="share-modal-container">
      <div className="share-modal-content">
        <div className="close-btn" onClick={handleCloseModal}>
          <img class="img-close" src="/static/media/exit.1613670bda75ad67062739301b4cf941.svg" alt="exit" />
        </div>
        <p>Share this place</p>
        <div>
          {/* {`${stay.type} in ${stay.loc.city}`} TO ADD HERE STAY DETAILS */}
          <div className="content">
            <div className="inner-content flex align-center">
              {<div className="rating-container flex align-center">
                <img className="stay-mini-img" src={stay.imgUrls[0]} alt="stay-img" />
                {stay.type} in {stay.loc.city}
                <img src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685704841/star_p6pdqw.svg" alt="Star" />
                <span>{` · ${stay.bedrooms} ${stay.bedrooms > 1 ? 'bedrooms' : 'bedroom'} 
                · ${(stay.capacity / 2).toFixed(0)} ${(stay.capacity / 2).toFixed(0) > 1 ? 'beds' : 'bed'} 
                · ${(stay.bathrooms)} ${stay.bathrooms > 1 ? 'baths' : 'bath'} `}</span>
              </div>}
              {/* <p>
                <span> <span> · </span> <span> {`${stay.reviews.length} reviews`} </span>  <span> · </span> <span className="super-host"> {stay.host.isSuperhost && <img src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1686494614/super-host-new_pfwzko.svg" alt="super-host" />} {stay.host.isSuperhost && 'Superhost'} </span>
                  {stay.host.isSuperhost && <span> · </span>}  </span>
                <span className="city-country"> {`${stay.loc.city}, ${stay.loc.country}`}</span>
              </p> */}
            </div>
          </div>
        </div>
        {/* options */}
        <div className='options-container'>
          <div onClick={handleCopyLink}>Copy Link</div>
          <div onClick={handleEmail}>Email</div>
          <div onClick={handleWhatsApp}>WhatsApp</div>
        </div>
      </div>
    </div>
  )
}