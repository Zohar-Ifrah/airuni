export function StayAmenities({ stay }) {

    return (
        <div className="stay-amenities">
            <h2> What this place offers </h2>
            <div className="amenitis-content">
                {stay.amenities.map((amenity, idx) =>
                    <div className="amenty-container flex align-center" key={idx}>
                        <img src={amenity.url} alt={amenity.name} />
                        <p> {amenity.name} </p>
                    </div>
                )}
            </div>
        </div>
    )
}