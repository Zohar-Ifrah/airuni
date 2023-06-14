import { Link } from 'react-router-dom'

export function SkeletonStayDetails() {
    return (
        <div className="stay-details skeleton-stay-details">
            <div
                id="photos"
                className="details-header flex space-between"
            >
                <div className="content">
                    <h2 className="skeleton">stay name</h2>
                    <div className="inner-content flex ">
                        <ul className="flex align-center ">
                            <li className="skeleton">some</li>
                            <li className="skeleton">rating</li>
                            <li className="skeleton">and</li>
                            <li className="skeleton">price</li>
                        </ul>
                    </div>
                </div>
                <div className="share-save-container flex align-center">
                    <Link to="#">
                        <div className="share-container flex align-center">
                            <span className="skeleton">share</span>
                        </div>
                    </Link>
                    <Link to="#">
                        <div className="like-container flex align-center">
                            <span className="skeleton"> Save </span>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="details-gallery">
                {Array.from({ length: 5 }).map((_, i) => {
                    return (
                        <div key={i} className="skeleton">image</div>
                    )
                })}
            </div>

            <section className="stay-details-content">
                <div className="stay-details-content-column1">
                    <div className="stay-extra-details">
                        <div className="stay-host-by flex space-between align-center">
                            <h2 className="skeleton">
                                {' '}
                                room' host by zohar & gil{' '}
                            </h2>
                            <div className="profile-img skeleton"></div>
                        </div>
                        <div className="main-amenities flex align-center  space-between">
                            {Array.from({ length: 3 }).map((_, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="main-amenity flex align-center skeleton"
                                    >
                                        breakfast
                                    </div>
                                )
                            })}
                        </div>
                        <div className="secondary-amenities">
                            {Array.from({ length: 5 }).map((_, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="secondary-amenity-container flex"
                                    >
                                        <div className="profile-img skeleton"></div>
                                        <div className="secondary-amenity-content-container">
                                            <h4 className="skeleton">
                                                pool and shawarma
                                            </h4>
                                            <p className="skeleton">
                                                some more ameneties details
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="stay-details-content-column2">
                    <section className="order-form-container">
                        <div className="price-rating-container flex space-between">
                            <div className="price-container flex align-center">
                                <h2 className="skeleton">450</h2>
                                <p className="skeleton">night</p>
                            </div>

                            <div className="rating-review-container flex align-center">
                                <div className="rating-container flex align-center">
                                    <p className="skeleton"> 4.7</p>
                                </div>

                                <p className="skeleton"> · 80 reviews</p>
                            </div>
                        </div>

                        <form className="flex column align-center">
                            <div className="dates-guests-container flex column align-center space-between">
                                <div className="dates-container flex align-center">
                                    <div className="check-in-container">
                                        <span className="skeleton">
                                            {' '}
                                            check-in{' '}
                                        </span>
                                        <div className="date-check-in skeleton">
                                            dec 04
                                        </div>
                                    </div>

                                    <div className="check-out-container">
                                        <span className="skeleton">
                                            {' '}
                                            checkout{' '}
                                        </span>
                                        <div className="date-check-out skeleton">
                                            dec 08
                                        </div>
                                    </div>
                                </div>

                                <div className="show-contents"></div>

                                <div className="guests flex column justify-center">
                                    <span className="skeleton"> guests </span>
                                    <div className="guests-count skeleton">
                                        {' '}
                                        'Add guests'{' '}
                                    </div>
                                </div>

                                <div className="show-contents"></div>
                            </div>
                            <button className="skeleton">Reserve</button>
                        </form>

                        <p className="txt-charged skeleton">
                            You won't be charged yet
                        </p>

                        <div className="price-details">
                            <div>
                                <h2 className="skeleton"> Price Details </h2>

                                <div className="nights-price-container flex space-between">
                                    <p className="skeleton">$450 x 5 nights</p>
                                    <p className="skeleton">5000</p>
                                </div>
                                <div className="nights-price-container flex space-between">
                                    <p className="skeleton">Cleaning fee</p>
                                    <p className="skeleton">$6</p>
                                </div>
                                <div className="nights-price-container flex space-between">
                                    <p className="skeleton">
                                        Airbbb service fee
                                    </p>
                                    <p className="skeleton">$14</p>
                                </div>
                            </div>

                            <div className="total-price-container nights-sum flex space-between">
                                <h3 className="skeleton"> Total </h3>
                                <p className="skeleton"> 5000 </p>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    )
}