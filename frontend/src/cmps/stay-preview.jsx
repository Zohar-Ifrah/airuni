import { useNavigate } from "react-router-dom"
import { CarouselComponent } from "./img-preview-carousel"

export function StayPreview({ stay, onRemoveStay, onUpdateStay }) {

    const navigate = useNavigate()
    return (
        <div>
            <li className="stay-preview" key={stay._id} onClick={() => navigate(`/details/${stay._id}`)}>
                <CarouselComponent images={stay.imgUrls} onClick={(ev) => ev.stopPropagation()} />
                <h4> {`${stay.loc.city}, ${stay.loc.country}`} </h4>
                <p> {`Stay with ${stay.host.fullname}`} </p>
                <p> <span> ${stay.price.toLocaleString()} </span> night </p>

                {/* <button onClick={() => { onAddStayMsg(stay) }}>Add stay msg</button>
            <button className="buy" onClick={() => { onAddToCart(stay) }}>Add to cart</button> */}
            </li>
            <div>
                <button onClick={() => { onRemoveStay(stay._id) }}>x</button>
                <button onClick={() => { onUpdateStay(stay) }}>Edit</button>
            </div>
        </div>
    )
}
