import { useState } from "react"
import { useEffect } from "react"


export function Review({ stay }) {

    const [slicedReviews, setSlicedReviews] = useState([])

    useEffect(() => {
        if (stay.reviews.length > 6) {
            setSlicedReviews((prevSlicedReviews) => stay.reviews.slice(0, 6))
        }
    }, [])


    return (
        <section id="reviews" className="review-container">

            {!!stay.reviews.length && <div className="rating-container flex align-center">
                <img src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685704841/star_p6pdqw.svg" alt="Star" />
                <h2> {`${stay.rating} · ${stay.reviews.length} reviews`} </h2>
            </div>}

            <div className="review-content">

                {!!slicedReviews.length && slicedReviews.map(review =>
                    <article key={review._id} className="review">

                        <div className="user-details flex align-center">
                            <img src={review.by.imgUrl} alt="" onError={ev => ev.target.src = 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1686066256/user_jsqpzw.png'} />
                            <h3> {review.by.fullname} </h3>
                        </div>

                        {review.txt.length > 185 &&
                            <div className="substringed-txt-container">
                                <p>{`${review.txt.substring(0, 186)} ...`}</p>
                                <div className="showmore-container flex align-center">
                                    <button className="btn-showmore"> Show more </button>
                                    <img src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685990897/arrow-right-bold_flbszq.svg" alt="show more" />
                                </div>
                            </div>
                        }

                        {review.txt.length <= 185 && <p> {review.txt} </p>}

                    </article>
                )}

                {!slicedReviews.length && stay.reviews.map(review =>
                    <article key={review._id} className="review">

                        <div className="user-details flex align-center">
                            <img src={review.by.imgUrl} alt="" onError={ev => ev.target.src = 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1686066256/user_jsqpzw.png'} />
                            <h3> {review.by.fullname} </h3>
                        </div>

                        {review.txt.length > 185 &&
                            <div className="substringed-txt-container">
                                <p>{`${review.txt.substring(0, 186)} ...`}</p>
                                <div className="showmore-container flex align-center">
                                    <button className="btn-showmore"> Show more </button>
                                    <img src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685990897/arrow-right-bold_flbszq.svg" alt="show more" />
                                </div>
                            </div>
                        }

                        {review.txt.length <= 185 && <p> {review.txt} </p>}

                    </article>
                )}

                {!!slicedReviews.length &&
                    <button className="btn-show-all-reviews"> {`Show all ${stay.reviews.length} reviews`} </button>
                }

            </div>

        </section>
    )
}