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
          x
        </div>
        <p>Share this place</p>
        <div>
          <img src={stay.imgUrls[0]} alt="stay-img" />
          {`${stay.type} in ${stay.loc.city}`} TO ADD HERE STAY DETAILS
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