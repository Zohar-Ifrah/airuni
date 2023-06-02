import { ShareSave } from "./share-save";

export function DetailsHeader({ stay }) {

    function calculateAvgReviews() {
        let count = 0
        const sum = stay.reviews.reduce((acc, review) => {
            count++
            return acc + review.rate
        }, 0)

        return sum / count
    }


    return (
        <div className="details-header flex space-between align-center">
            <div className="content">
                <h2> {stay.name} </h2>
                <div className="inner-content flex align-center">
                    {!!stay.reviews.length && <div className="rating-container flex align-center">
                        <img src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685704841/star_p6pdqw.svg" alt="Star" />
                        <span> {`${calculateAvgReviews().toFixed(2)}`} </span>
                    </div>}
                    <p>
                        <span> {` · ${stay.reviews.length} reviews ·`} </span>
                        <span> {`${stay.loc.city}, ${stay.loc.country}`}</span>
                    </p>
                </div>
            </div>
            <ShareSave />
        </div>
    )
}