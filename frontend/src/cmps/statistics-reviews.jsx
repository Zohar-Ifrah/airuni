


export function StatisticsReviews({ stay }) {


    return (
        <section className="statistics-reviews-main-container">

            <div className="statistics-reviews-inner-container">
                {!!stay.reviews.length && <div className="rating-container flex align-center">
                    <img src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685704841/star_p6pdqw.svg" alt="Star" />
                    <h2> {`${stay.rating} · ${stay.reviews.length} reviews`} </h2>
                </div>}

                <section className="statistics-reviews-container">

                    <div className="stat-main cleanliness-container flex align-center space-between">
                        <p> Cleanliness </p>

                        <div className="stat cleanliness-rating-container flex align-center">
                            <div className="bar cleanliness"></div>
                            <span className="rating cleanliness"> 4.6 </span>
                        </div>
                    </div>

                    <div className="stat-main communication-container  flex align-center space-between">
                        <p> Communication </p>

                        <div className="stat communication-rating-container flex align-center">
                            <div className="bar communication"></div>
                            <span className="rating communication"> 4.4 </span>
                        </div>
                    </div>

                    <div className="stat-main check-in-container  flex align-center space-between">
                        <p> Check-in </p>

                        <div className="stat check-in-rating-container flex align-center">
                            <div className="bar check-in"></div>
                            <span className="rating check-in"> 4.8 </span>
                        </div>
                    </div>

                    <div className="stat-main accuracy-container  flex align-center space-between">
                        <p> Accuracy </p>

                        <div className="stat accuracy-rating-container flex align-center">
                            <div className="bar accuracy"></div>
                            <span className="rating accuracy"> 4.7 </span>
                        </div>
                    </div>

                    <div className="stat-main location-container  flex align-center space-between">
                        <p> Location </p>

                        <div className="stat location-rating-container flex align-center">
                            <div className="bar location"></div>
                            <span className="rating location"> 4.9 </span>
                        </div>
                    </div>

                    <div className="stat-main value-container  flex align-center space-between">
                        <p> Value </p>

                        <div className="stat value-rating-container flex align-center">
                            <div className="bar value"></div>
                            <span className="rating value"> 5.0 </span>
                        </div>
                    </div>

                </section>
            </div>

        </section>
    )
}