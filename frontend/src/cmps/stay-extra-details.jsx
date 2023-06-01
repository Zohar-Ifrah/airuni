import { stayService } from "../services/stay.service.local"
import { useState, useEffect } from 'react'


export function StayExrtaDetails({ stay }) {

    const [slicedAmenties, setSlicedAmenties] = useState(null)

    useEffect(() => {

        setSlicedAmenties({ mainAmenties: stay.amenities.slice(0, 3), secondaryAmenties: stay.amenities.slice(3) })

    }, [])

    if (!slicedAmenties) return

    return (
        <div className="stay-extra-details">
            <div className="stay-host-by flex space-between align-center">
                <h3> {`${stay.type} host by ${stay.host.fullname}`} </h3>
                <img src={require(`../assets/img/url.png`)} alt="url" />
            </div>
            <div className="main-amenties flex align-center">
                {slicedAmenties.mainAmenties.map((amenty, idx) => {
                    return (
                        <div key={idx} className="main-amenty flex align-center">
                            <img src={require(`../assets/img/url.png`)} alt="url" />
                            {amenty}
                        </div>
                    )
                })}
            </div>
            <div className="secondary-amenties">
                {slicedAmenties.secondaryAmenties.map((amenty, idx) => {
                    return (
                        <div key={idx} className="secondary-amenty-container flex align-center">
                            <img src={require(`../assets/img/url.png`)} alt="url" />
                            <div className="secondary-amenty-content-container">
                                <h4> {amenty} </h4>
                                <p> lorem ipsum lorem ipsum lorem ipsum ...</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}