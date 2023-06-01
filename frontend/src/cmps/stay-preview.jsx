import { Link } from "react-router-dom"

export function StayPreview({ stay, onRemoveStay, onUpdateStay }) {
    return (


        <div>
            <Link title="Details" to={`/stay/details/${stay._id}`}>

                <img src={stay.imgUrls[0]} alt="" />
            </Link>
            <p>Price: <span>${stay.price.toLocaleString()}</span></p>
            
            <div>
                <button onClick={() => { onRemoveStay(stay._id) }}>x</button>
                <button onClick={() => { onUpdateStay(stay) }}>Edit</button>
            </div>
            
            {/* <button onClick={() => { onAddStayMsg(stay) }}>Add stay msg</button>
            <button className="buy" onClick={() => { onAddToCart(stay) }}>Add to cart</button> */}
        </div>
    )
}
