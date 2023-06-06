

export function Review({ stay }) {


    return (
        <section className="review-container">
            {!!stay.reviews.length && <div className="rating-container flex align-center">
                <img src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685704841/star_p6pdqw.svg" alt="Star" />
                <h2> {`${stay.rating} · ${stay.reviews.length} reviews`} </h2>
            </div>}
            <div className="review-content">
                {stay.reviews.map(review =>
                    <article key={review._id} className="review">
                        <div className="user-details flex align-center">
                            <img src={review.by.imgUrl} alt="" />
                            <h3> {review.by.fullname} </h3>
                        </div>
                        <p> {review.txt} </p>
                    </article>
                )}
            </div>
        </section>
    )
}