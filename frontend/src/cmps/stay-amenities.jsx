import { utilService } from "../services/util.service";

export function StayAmenities({ stay }) {

    return (
        <div id="amenities" className="stay-amenities">
            <h2> What this place offers </h2>
            <div className="amenitis-content">
                {stay.amenities.slice(7, 17).map((amenity, idx) =>
                    <div className="amenty-container flex align-center" key={amenity + idx}>
                        <img src={utilService.getIcon(amenity)} alt={amenity} />
                        <p> {amenity} </p>
                    </div>
                )}
            </div>
        </div>
    )
}