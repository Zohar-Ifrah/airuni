import React from 'react'
import { showSuccessMsg } from '../services/event-bus.service'

export const ShareModal = ({ setIsShareModalOpen, stay }) => {
    function handleCloseModal() {
        setIsShareModalOpen(false)
    }

    function handleCopyLink() {
        const link = `${window.location.origin}/details/${stay._id}`

        // Copy the link to the clipboard
        navigator.clipboard
            .writeText(link)
            .then(() => {
                showSuccessMsg('Link copied succesfully')
                console.log('Link copied to clipboard!')
            })
            .catch((error) => {
                console.error('Failed to copy link: ', error)
            })
    }

    function handleEmail() {
        const emailSubject = 'Check out this place!'
        const emailBody = `I found this amazing place and thought you might be interested: ${window.location.origin}/details/${stay._id}`
        const mailtoLink = `mailto:?subject=${encodeURIComponent(
            emailSubject
        )}&body=${encodeURIComponent(emailBody)}`

        // open the user's default email client
        window.location.href = mailtoLink
    }

    function handleWhatsApp() {
        const message = 'Check out this place: '
        const link = `${window.location.origin}/details/${stay._id}`
        const whatsappLink = `https://wa.me/?text=${encodeURIComponent(
            message + link
        )}`

        // Open WhatsApp with pre-filled message and link
        window.open(whatsappLink, '_blank')
    }

    return (
        <div className="share-modal-container details-main-layout">
            <div className="share-modal-content">
                <div className="close-btn">
                    <img
                        onClick={handleCloseModal}
                        className="img-close"
                        src="/static/media/exit.1613670bda75ad67062739301b4cf941.svg"
                        alt="exit"
                    />
                </div>
                <h3>Share this place</h3>
                <div>
                    {/* {`${stay.type} in ${stay.loc.city}`} TO ADD HERE STAY DETAILS */}
                    <div className="content">
                        <div className="inner-content flex align-center">
                            <div className="stay-details flex align-center">
                                <img
                                    className="stay-mini-img"
                                    src={stay.imgUrls[0]}
                                    alt="stay-img"
                                />
                                <span className="inner-content-details">
                                    {stay.type} in {stay.loc.city}
                                    <span>{` · ${stay.bedrooms} ${
                                        stay.bedrooms > 1
                                            ? 'bedrooms'
                                            : 'bedroom'
                                    } 
                · ${(stay.capacity / 2).toFixed(0)} ${
                                        (stay.capacity / 2).toFixed(0) > 1
                                            ? 'beds'
                                            : 'bed'
                                    } 
                · ${stay.bathrooms} ${
                                        stay.bathrooms > 1 ? 'baths' : 'bath'
                                    } `}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* options */}
                <div className="options-container">
                    <div onClick={handleCopyLink}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                            role="presentation"
                            focusable="false"
                            style={{
                                display: 'block',
                                height: '25px',
                                width: '25px',
                                fill: 'currentcolor',
                            }}
                        >
                            <path d="M25 5a4 4 0 0 1 4 4v17a5 5 0 0 1-5 5H12a5 5 0 0 1-5-5V10a5 5 0 0 1 5-5h13zm0 2H12a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V9a2 2 0 0 0-2-2zm-3-6v2H11a6 6 0 0 0-6 5.78V22H3V9a8 8 0 0 1 7.75-8H22z" />
                        </svg>
                        <span>Copy Link</span>
                    </div>
                    <div onClick={handleEmail}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                            role="presentation"
                            focusable="false"
                            style={{
                                display: 'block',
                                fill: 'none',
                                height: '25px',
                                width: '25px',
                                stroke: 'currentcolor',
                                strokeWidth: '2',
                                overflow: 'visible',
                            }}
                        >
                            <g fill="none">
                                <rect
                                    width="28"
                                    height="24"
                                    x="2"
                                    y="4"
                                    rx="4"
                                />
                                <path d="m3 6 10.42 8.81a4 4 0 0 0 5.16 0L29 6" />
                            </g>
                        </svg>
                        <span>Email</span>
                    </div>
                    <div onClick={handleWhatsApp}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                            role="presentation"
                            focusable="false"
                            style={{
                                borderRadius: '3px',
                                display: 'block',
                                height: '25px',
                                width: '25px',
                            }}
                        >
                            <path fill="#25d366" d="M32 0v32H0V0z" />
                            <path
                                fill="#FFF"
                                d="m4 28 1.7-6.16a11.82 11.82 0 0 1-1.6-5.95C4.1 9.33 9.46 4 16.05 4a11.9 11.9 0 0 1 8.45 3.49A11.8 11.8 0 0 1 28 15.9a11.94 11.94 0 0 1-17.66 10.45zm6.63-3.8a9.93 9.93 0 0 0 15.35-8.3A9.9 9.9 0 0 0 16.05 6a9.92 9.92 0 0 0-9.93 9.9c0 2.22.65 3.88 1.75 5.63l-1 3.64 3.76-.98zm11.36-5.52c-.07-.13-.27-.2-.57-.35-.3-.15-1.75-.86-2.03-.96-.27-.1-.46-.15-.66.15s-.77.96-.94 1.15-.35.23-.65.08c-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.04s-.02-.46.13-.6l.44-.52c.15-.17.2-.3.3-.5.1-.2.05-.36-.02-.51-.08-.15-.67-1.6-.92-2.2-.24-.57-.48-.5-.66-.5l-.57-.01a1.09 1.09 0 0 0-.8.37c-.27.3-1.03 1.01-1.03 2.46s1.06 2.86 1.2 3.06c.16.2 2.1 3.18 5.08 4.45.7.3 1.26.5 1.69.63.7.22 1.36.19 1.87.11.57-.08 1.75-.71 2-1.4s.25-1.28.17-1.4z"
                            />
                        </svg>
                        <span>WhatsApp</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
