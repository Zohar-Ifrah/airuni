import { stayService } from "../services/stay.service.local"
import { useState, useEffect } from 'react'


export function StayExrtaDetails() {

    const [stay, setStay] = useState(null)

    useEffect(() => {
        test()
    }, [])

    async function test() {
        setStay(await stayService.getById('Lp7OPj'))
    }

    if (!stay) return
    return (
        <div className="stay-extra-details">
            <h3> {`${stay.type} host by ${stay.host.fullname}`} </h3>
            <div className="stay-ementies">
                {stay.amenities.map(ementy => {
                    return (
                        <div className="ementy-container flex align-center">
                            <img src={require(`../assets/img/url.png`)} alt="url" />
                            <div className="ementy-content-container">
                                <h4> {ementy} </h4>
                                <p> lorem ipsum lorem ipsum lorem ipsum </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}