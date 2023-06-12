import { StatisticsReviews } from "./statistics-reviews"
import exit from "../assets/img/exit.svg"




export function AllReviews({ stay, onOpenModalShowMore }) {

    function getConvertedDate(timestamp) {
        const date = new Date(timestamp)
        const month = date.toLocaleString('en-us', { month: 'long' })
        const year = date.getFullYear()
        return `${month} ${year}`
    }


    return (
        <section className="all-reviews-container">
            <img className="img-close" onClick={() => onOpenModalShowMore(false)} src={exit} alt="exit" />


            <StatisticsReviews stay={stay} />

            <div className="all-reviews-inner-container">
                {stay.reviews.map(review =>
                    <article key={review._id} className="review">

                        <div className="user-details flex align-center">
                            <img src={review.by.imgUrl} alt="" onError={ev => ev.target.src = 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1686066256/user_jsqpzw.png'} />
                            <div className="name-date-container">
                                <h3> {review.by.fullname} </h3>
                                <p> {getConvertedDate(review.at)} </p>
                            </div>
                        </div>

                        <div className="txt-container">
                            <p>{review.txt}</p>
                        </div>

                    </article>
                )}
            </div>
        </section>
    )
}