import { stayService } from "../services/stay.service.local"
import { useState, useEffect } from 'react'


export function StayExrtaDetails({ stay }) {

    const [slicedAmenities, setSlicedAmenties] = useState(null)

    useEffect(() => {

        setSlicedAmenties({ mainAmenities: stay.amenities.slice(0, 3), secondaryAmenities: stay.amenities.slice(3) })

    }, [])

    if (!slicedAmenities) return

    return (
        <div className="stay-extra-details">
            <div className="stay-host-by flex space-between align-center">
                <h2> {`${stay.type} host by ${stay.host.fullname}`} </h2>
                <img src={require(`../assets/img/url.png`)} alt="url" />
            </div>
            <div className="main-amenities flex align-center">
                {slicedAmenities.mainAmenities.map((amenity, idx) => {
                    return (
                        <div key={idx} className="main-amenity flex align-center">
                            <img src={require(`../assets/img/url.png`)} alt="url" />
                            {amenity}
                        </div>
                    )
                })}
            </div>
            <div className="secondary-amenities">
                {slicedAmenities.secondaryAmenities.map((amenity, idx) => {
                    return (
                        <div key={idx} className="secondary-amenity-container flex align-center">
                            <img src={require(`../assets/img/url.png`)} alt="url" />
                            <div className="secondary-amenity-content-container">
                                <h4> {amenity} </h4>
                                <p> lorem ipsum lorem ipsum lorem ipsum ...</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}