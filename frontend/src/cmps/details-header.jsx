import { ShareSave } from "./share-save";

export function DetailsHeader({ stay }) {

    return (
        <div id="photos" className="details-header flex space-between">
            <div className="content">
                <h2> {stay.name} </h2>
                <div className="inner-content flex align-center">
                    {!!stay.reviews.length && <div className="rating-container flex align-center">
                        <img src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685704841/star_p6pdqw.svg" alt="Star" />
                        {!!stay.reviews.length && <span> {stay.rating} </span>}
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