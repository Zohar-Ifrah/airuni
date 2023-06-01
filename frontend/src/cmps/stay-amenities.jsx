


export function StayAmenities({ stay }) {
    // amenitiesIcons = [
    //     {'TV': ICONurl},
    //     {'Wifi': iconURL}
    // ]
    return (
        <div className="stay-amenities">
            <h2> What this place offers </h2>
            {stay.amenities.map((amenity, idx) =>
                <div className="amenty-container flex align-center" key={idx}>
                    <img src={require(`../assets/img/url.png`)} alt="url" />
                    <p> {amenity} </p>

                </div>
            )}
        </div>
    )
}