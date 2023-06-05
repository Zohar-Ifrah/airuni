import { useNavigate } from "react-router-dom"
import { CarouselComponent } from "./img-preview-carousel"

export function StayPreview({ stay, onRemoveStay, onUpdateStay }) {

    const navigate = useNavigate()

    function calculateAvgReviews() {
        let count = 0
        const sum = stay.reviews.reduce((acc, review) => {
            count++
            return acc + review.rate
        }, 0)

        return sum / count
    }


    return (

        <li className="stay-preview" key={stay._id} onClick={() => navigate(`/details/${stay._id}`)}>
            <CarouselComponent images={stay.imgUrls} />
            <div className="location-rating-container flex space-between">
                <h4> {`${stay.loc.city}, ${stay.loc.country}`} </h4>
                {!!stay.reviews.length && <div className="rating-container flex align-center">
                    <img src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685704841/star_p6pdqw.svg" alt="Star" />
                    <span>
                        {`${(Math.floor(calculateAvgReviews() * 100) / 100)
                            .toLocaleString('en-US', {
                                minimumFractionDigits: 1,
                                maximumFractionDigits: 2
                            })
                            .replace(/(\.\d)0$/, '$1')
                            .replace(/\.00$/, '')
                            }`}
                    </span>
                </div>}
            </div>
            <p> {`Stay with ${stay.host.fullname}`} </p>
            <p> <span> ${stay.price.toLocaleString('en-US')} </span> night </p>

            {/* <div>
                <button onClick={() => { onRemoveStay(stay._id) }}>x</button>
                <button onClick={() => { onUpdateStay(stay) }}>Edit</button>
            </div> */}

            {/* <button onClick={() => { onAddStayMsg(stay) }}>Add stay msg</button>
            <button className="buy" onClick={() => { onAddToCart(stay) }}>Add to cart</button> */}
        </li>
    )
}
