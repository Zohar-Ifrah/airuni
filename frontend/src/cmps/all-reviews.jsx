import { StatisticsReviews } from "./statistics-reviews";



export function AllReviews({ stay }) {


    return (
        <section className="all-reviews-container">
            <StatisticsReviews stay={stay} />

            <div className="all-reviews-inner-container">
                {stay.reviews.map(review =>
                    <article key={review._id} className="review">

                        <div className="user-details flex align-center">
                            <img src={review.by.imgUrl} alt="" onError={ev => ev.target.src = 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1686066256/user_jsqpzw.png'} />
                            <h3> {review.by.fullname} </h3>
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