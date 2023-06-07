import { useState } from "react";
import { useLocation } from "react-router-dom";



export function PriceDetails({ price, checksDates, calculateNumberOfNights, isFromConfirmOrder = true }) {

    const location = useLocation()
    const currentPath = location.pathname

    const [isFromConfirmOrderUpdated] = useState(isFromConfirmOrder)


    return (
        <div className='price-details'>
            <div>
                {isFromConfirmOrderUpdated && <h2> Price Details </h2>}
                <div className='nights-price-container flex space-between'>
                    <p>{`$${price} x ${calculateNumberOfNights(checksDates?.checkIn, checksDates?.checkOut)} nights`}</p>
                    <p>{`$${price * calculateNumberOfNights(checksDates?.checkIn, checksDates?.checkOut)} `}</p>
                </div>
                <div className='nights-price-container flex space-between'>
                    <p>Cleaning fee</p>
                    <p>$6</p>
                </div>
                <div className='nights-price-container flex space-between'>
                    <p>Airbbb service fee</p>
                    <p>$14</p>
                </div>
            </div>

            <div className='total-price-container nights-sum flex space-between'>
                <h3> total </h3>
                <p> {`$${price * calculateNumberOfNights(checksDates?.checkIn, checksDates?.checkOut) + 20} `} </p>
            </div>
        </div>
    )
}