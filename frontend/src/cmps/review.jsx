

export function Review({ stay }) {


    function calculateAvgReviews() {
        let count = 0
        const sum = stay.reviews.reduce((acc, review) => {
            count++
            return acc + review.rate
        }, 0)

        return sum / count
    }

    return (
        <section className="review-container">
            {!!stay.reviews.length && <div className="rating-container flex align-center">
                <img src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685704841/star_p6pdqw.svg" alt="Star" />
                <h2> {`${calculateAvgReviews().toFixed(2)} · ${stay.reviews.length} reviews`} </h2>
            </div>}
            <div className="review-content">
                {stay.reviews.map(review =>
                    <article key={review.id} className="review">
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