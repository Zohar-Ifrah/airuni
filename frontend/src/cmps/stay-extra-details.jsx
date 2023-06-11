import { useState, useEffect } from 'react'
import { utilService } from '../services/util.service'


export function StayExrtaDetails({ stay }) {

    const [slicedAmenities, setSlicedAmenties] = useState(null)

    useEffect(() => {
        setSlicedAmenties({ mainAmenities: stay.amenities.slice(0, 3), secondaryAmenities: stay.amenities.slice(3, 6) })
        // eslint-disable-next-line
    }, [])

    function getSentence() {
        const sentences = [
            'Our stay will always take care of the highest level.',
            'We advocate quality and fast service without compromise.',
            'We will take care of everything for you, you just try to enjoy yourself.',
            'We are known for a high level of services of all kinds.',
            'You always have someone to turn to for professional help.'
        ]

        return sentences[utilService.getRandomIntInclusive(0, sentences.length - 1)]
    }

    if (!slicedAmenities) return

    return (
        <div className="stay-extra-details">
            <div className="stay-host-by flex space-between align-center">
                <h2> {`${stay.type} host by ${stay.host.fullname}`} </h2>
                <img src={stay.host.imgUrl} alt="host" onError={ev => ev.target.src = 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1686066256/user_jsqpzw.png'} />
            </div>
            <div className="main-amenities flex align-center  space-between">
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
                        <div key={amenity + idx} className="secondary-amenity-container flex">
                            <img src={utilService.getIcon(amenity)} alt={amenity} />
                            <div className="secondary-amenity-content-container">
                                <h4> {amenity} </h4>
                                <p>{getSentence()}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="summary">
                <h2> About this place </h2>
                <p> {stay.summary} </p>
            </div>
        </div>
    )
}