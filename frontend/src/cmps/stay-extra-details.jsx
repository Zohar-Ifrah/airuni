import { useState, useEffect } from 'react'
import { utilService } from '../services/util.service'


export function StayExrtaDetails({ stay }) {

    const [slicedAmenities, setSlicedAmenties] = useState(null)

    useEffect(() => {

        setSlicedAmenties({ mainAmenities: stay.amenities.slice(0, 3), secondaryAmenities: stay.amenities.slice(3) })
        // eslint-disable-next-line
    }, [])

    if (!slicedAmenities) return

    return (
        <div className="stay-extra-details">
            <div className="stay-host-by flex space-between align-center">
                <h2> {`${stay.type} host by ${stay.host.fullname}`} </h2>
                <img src={stay.host.imgUrl} alt="url" />
            </div>
            <div className="main-amenities flex align-center">
                {slicedAmenities.mainAmenities.map((amenity, idx) => {
                    return (
                        <div key={amenity + idx} className="main-amenity flex align-center">
                            <img src={utilService.getIcon(amenity)} alt={amenity} />
                            {amenity}
                        </div>
                    )
                })}
            </div>
            <div className="secondary-amenities">
                {slicedAmenities.secondaryAmenities.map((amenity, idx) => {
                    return (
                        <div key={amenity + idx} className="secondary-amenity-container flex align-center">
                            <img src={utilService.getIcon(amenity)} alt={amenity} />
                            <div className="secondary-amenity-content-container">
                                <h4> {amenity} </h4>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="summary">
                <p> {stay.summary} </p>
            </div>
        </div>
    )
}