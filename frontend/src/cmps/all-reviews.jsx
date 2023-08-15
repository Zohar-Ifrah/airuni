import { StatisticsReviews } from './statistics-reviews'
import exit from '../assets/img/exit.svg'

export function AllReviews({ stay, onOpenModalShowMore }) {
    function getConvertedDate(timestamp) {
        const date = new Date(timestamp)
        const month = date.toLocaleString('en-us', { month: 'long' })
        const year = date.getFullYear()
        return `${month} ${year}`
    }

    return (
        <section className="all-reviews-container">
            <button
                className="img-close"
                onClick={() => onOpenModalShowMore(false)}
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
                        height: '12px',
                        width: '12px',
                        stroke: 'currentcolor',
                        strokeWidth: 3.33333,
                        overflow: 'visible',
                    }}
                >
                    <path d="m6 6 20 20M26 6 6 26"></path>
                </svg>
            </button>

            <StatisticsReviews stay={stay} />

            <div className="all-reviews-inner-container">
                {stay.reviews.map((review) => (
                    <article key={review._id} className="review">
                        <div className="user-details flex align-center">
                            <img
                                src={review.by.imgUrl}
                                alt=""
                                onError={(ev) =>
                                    (ev.target.src =
                                        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1686066256/user_jsqpzw.png')
                                }
                            />
                            <div className="name-date-container">
                                <h3> {review.by.fullname} </h3>
                                <p> {getConvertedDate(review.at)} </p>
                            </div>
                        </div>

                        <div className="txt-container">
                            <p>{review.txt}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}
