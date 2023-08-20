import { useState } from 'react'
import { useEffect } from 'react'
import { StatisticsReviews } from './statistics-reviews'
import { AllReviews } from './all-reviews'
import { ShowAllReviews } from './show-all-reviews'

export function Review({ stay, isOpenReviews }) {
    const [slicedReviews, setSlicedReviews] = useState([])
    const [isModalShowMoreOpen, setIsModalShowMoreOpen] = useState(false)

    useEffect(() => {
        if (stay.reviews.length > 6) {
            setSlicedReviews((prevSlicedReviews) => stay.reviews.slice(0, 6))
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        isOpenReviews && setIsModalShowMoreOpen(true)
    }, [isOpenReviews])

    function getDate(timestamp) {
        const date = new Date(timestamp)
        const formattedDate = date.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
        })

        return formattedDate
    }

    function onOpenModalShowMore(isOpen = true) {
        setIsModalShowMoreOpen(isOpen)
    }

    return (
        <section id="reviews" className="review-container">
            <StatisticsReviews stay={stay} />
            <div className="review-content-container">
                <div className="review-content">
                    {!!slicedReviews.length &&
                        slicedReviews.map((review) => (
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
                                    <div className="review-fullname-date-container">
                                        <h3> {review.by.fullname} </h3>
                                        <p> {getDate(review.at)} </p>
                                    </div>
                                </div>

                                {review.txt.length > 185 && (
                                    <div className="substringed-txt-container">
                                        <p>{`${review.txt.substring(
                                            0,
                                            186
                                        )} ...`}</p>
                                        <div className="showmore-container flex align-center">
                                            <button
                                                className="btn-showmore"
                                                onClick={onOpenModalShowMore}
                                            >
                                                {' '}
                                                Show more{' '}
                                            </button>
                                            <img
                                                src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685990897/arrow-right-bold_flbszq.svg"
                                                alt="show more"
                                            />
                                        </div>
                                    </div>
                                )}

                                {review.txt.length <= 185 && (
                                    <p> {review.txt} </p>
                                )}
                            </article>
                        ))}

                    {!slicedReviews.length &&
                        stay.reviews.map((review) => (
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
                                    <h3> {review.by.fullname} </h3>
                                </div>

                                {review.txt.length > 185 && (
                                    <div className="substringed-txt-container">
                                        <p>{`${review.txt.substring(
                                            0,
                                            186
                                        )} ...`}</p>
                                        <div className="showmore-container flex align-center">
                                            <button
                                                className="btn-showmore"
                                                onClick={onOpenModalShowMore}
                                            >
                                                {' '}
                                                Show more{' '}
                                            </button>
                                            <img
                                                src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685990897/arrow-right-bold_flbszq.svg"
                                                alt="show more"
                                            />
                                        </div>
                                    </div>
                                )}

                                {review.txt.length <= 185 && (
                                    <p> {review.txt} </p>
                                )}
                            </article>
                        ))}

                    {!!slicedReviews.length && (
                        <button
                            onClick={onOpenModalShowMore}
                            className="btn-show-all-reviews"
                        >
                            {' '}
                            {`Show all ${stay.reviews.length} reviews`}{' '}
                        </button>
                    )}
                </div>
            </div>

            <button
                onClick={onOpenModalShowMore}
                className="btn-show-all-reviews-mobile"
            >
                {' '}
                {`Show all ${stay.reviews.length} reviews`}{' '}
            </button>

            {isModalShowMoreOpen && (
                <div>
                    <section className="show-all-reviews-main-container">
                        <div className="show-all-reviews-container details-main-layout">
                            <ShowAllReviews
                                stay={stay}
                                onOpenModalShowMore={onOpenModalShowMore}
                            />
                        </div>
                    </section>
                    <div
                        onClick={() => onOpenModalShowMore(false)}
                        className="blur all"
                    ></div>
                </div>
            )}

            {/* {isModalShowMoreOpen && <AllReviews stay={stay} />} */}
        </section>
    )
}

// import { useState } from "react"
// import { useEffect } from "react"
// import { StatisticsReviews } from "./statistics-reviews"

// export function Review({ stay }) {

//     const [slicedReviews, setSlicedReviews] = useState([])
//     const [isModalShowMoreOpen, setIsModalShowMoreOpen] = useState(false)

//     useEffect(() => {
//         if (stay.reviews.length > 6) {
//             setSlicedReviews((prevSlicedReviews) => stay.reviews.slice(0, 6))
//         }
//         // eslint-disable-next-line
//     }, [])

//     function getDate(timestamp) {
//         const date = new Date(timestamp)
//         const formattedDate = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

//         return formattedDate
//     }

//     function onOpenModalShowMore() {
//         setIsModalShowMoreOpen(true)
//     }

//     return (
//         <section id="reviews" className="review-container">

//             <StatisticsReviews stay={stay} />

//             <div className="review-content">

//                 {!!slicedReviews.length && slicedReviews.map(review =>
//                     <article key={review._id} className="review">

//                         <div className="user-details flex align-center">
//                             <img src={review.by.imgUrl} alt="" onError={ev => ev.target.src = 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1686066256/user_jsqpzw.png'} />
//                             <div className="review-fullname-date-container">
//                                 <h3> {review.by.fullname} </h3>
//                                 <p> {getDate(review.at)} </p>
//                             </div>
//                         </div>

//                         {review.txt.length > 185 &&
//                             <div className="substringed-txt-container">
//                                 <p>{`${review.txt.substring(0, 186)} ...`}</p>
//                                 <div className="showmore-container flex align-center">
//                                     <button className="btn-showmore" onClick={onOpenModalShowMore()}> Show more </button>
//                                     <img src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685990897/arrow-right-bold_flbszq.svg" alt="show more" />
//                                 </div>
//                             </div>
//                         }

//                         {review.txt.length <= 185 && <p> {review.txt} </p>}

//                     </article>
//                 )}

//                 {!slicedReviews.length && stay.reviews.map(review =>
//                     <article key={review._id} className="review">

//                         <div className="user-details flex align-center">
//                             <img src={review.by.imgUrl} alt="" onError={ev => ev.target.src = 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1686066256/user_jsqpzw.png'} />
//                             <h3> {review.by.fullname} </h3>
//                         </div>

//                         {review.txt.length > 185 &&
//                             <div className="substringed-txt-container">
//                                 <p>{`${review.txt.substring(0, 186)} ...`}</p>
//                                 <div className="showmore-container flex align-center">
//                                     <button className="btn-showmore" onClick={onOpenModalShowMore()}> Show more </button>
//                                     <img src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685990897/arrow-right-bold_flbszq.svg" alt="show more" />
//                                 </div>
//                             </div>
//                         }

//                         {review.txt.length <= 185 && <p> {review.txt} </p>}

//                     </article>
//                 )}

//                 {!!slicedReviews.length &&
//                     <button className="btn-show-all-reviews"> {`Show all ${stay.reviews.length} reviews`} </button>
//                 }

//             </div>

//         </section>
//     )
// }
