import { utilService } from "../services/util.service";

export function StayAmenities({ stay }) {

    return (
        <div className="stay-amenities">
            <h2> What this place offers </h2>
            <div className="amenitis-content">
                {stay.amenities.map((amenity, idx) =>
                    <div className="amenty-container flex align-center" key={amenity + idx}>
                        <img src={utilService.getIcon()} alt={amenity} />
                        <p> {amenity} </p>
                    </div>
                )}
            </div>
        </div>
    )
}