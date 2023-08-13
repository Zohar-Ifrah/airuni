export function DetailsContentMobile({ stay, setIsOpenReviews }) {
    function onOpenReviews() {
        setIsOpenReviews(true)

        setTimeout(() => {
            setIsOpenReviews(false)
        }, 300)
    }

    return (
        <section className="details-content-mobile">
            <div className="content">
                <h2> {stay.name} </h2>
                <div className="inner-content flex align-center">
                    {!!stay.reviews.length && (
                        <div className="rating-container flex align-center">
                            <img
                                src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685704841/star_p6pdqw.svg"
                                alt="Star"
                            />
                            {!!stay.reviews.length && (
                                <span> {stay.rating} </span>
                            )}
                        </div>
                    )}
                    <p>
                        <span>
                            {' '}
                            <span> · </span>{' '}
                            <span
                                onClick={() => onOpenReviews()}
                                className="reviews-count"
                            >
                                {' '}
                                {`${stay.reviews.length} reviews`}{' '}
                            </span>{' '}
                            <span> · </span>{' '}
                            <span className="super-host">
                                {' '}
                                {stay.host.isSuperhost && (
                                    <img
                                        src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1686494614/super-host-new_pfwzko.svg"
                                        alt="super-host"
                                    />
                                )}{' '}
                                {stay.host.isSuperhost && 'Superhost'}{' '}
                            </span>{' '}
                            {stay.host.isSuperhost && <span> · </span>}{' '}
                        </span>
                        <span className="city-country">
                            {' '}
                            {`${stay.loc.city}, ${stay.loc.country}`}
                        </span>
                    </p>
                </div>
            </div>
        </section>
    )
}
