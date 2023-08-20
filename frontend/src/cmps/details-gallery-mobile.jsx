import { useState } from 'react'

export function DetailsGalleryMobile({ stay }) {
    const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false)

    return (
        <section className="details-gallery-mobile full">
            <article
                className="details-gallery-mobile-inner-container"
                onClick={() =>
                    setIsGalleryModalOpen(
                        (prevIsGalleryOpen) => !prevIsGalleryOpen
                    )
                }
            >
                <img src={stay.imgUrls[0]} alt="stay-img" />
                <span>{`1/${stay.imgUrls.length}`}</span>
            </article>
            {isGalleryModalOpen && (
                <div className="full-gallery-mobile">
                    <button
                        className="btn-close"
                        onClick={() =>
                            setIsGalleryModalOpen(
                                (prevIsGalleryOpen) => !prevIsGalleryOpen
                            )
                        }
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                            role="presentation"
                            focusable="false"
                            style={{
                                display: 'block',
                                fill: 'none',
                                height: '17px',
                                width: '17px',
                                stroke: 'currentcolor',
                                strokeWidth: '3.33333',
                                overflow: 'visible',
                            }}
                        >
                            <path d="m6 6 20 20M26 6 6 26"></path>
                        </svg>
                    </button>
                    {stay.imgUrls.map((imgUrl) => (
                        <img key={imgUrl} src={imgUrl} alt="img" />
                    ))}
                </div>
            )}
        </section>
    )
}
