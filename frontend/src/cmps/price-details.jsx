import React, { useState } from "react"
// import { SmallInfoMsg } from "./small-info-msg"

export function PriceDetails({ price, checksDates, calculateNumberOfNights, isFromConfirmOrder = true, stay }) {
    // const feeMsg = 'This helps us run our platform and offer services like 24/7 support on your trip. This includes VAT.'
    const [isFromConfirmOrderUpdated] = useState(isFromConfirmOrder)


    return (
        checksDates && <>
            <div className='price-details'>
                {isFromConfirmOrder && <div className="stay-order-details flex">
                    <img src={stay.imgUrls[0]} alt="" />
                    <div className="stay-order-details-content">
                        <p> {stay.roomType} </p>
                        <p> {stay.type} </p>

                        <div className="stay-order-details-content-inner-container flex align-center">
                            <img src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685704841/star_p6pdqw.svg" alt="star" />
                            <span> {stay.rating} <span> {`(${stay.reviews.length} reviews)`} </span> </span>
                        </div>
                    </div>
                </div>
                }

                <div className="price-details-inner-container">
                    {isFromConfirmOrderUpdated && <h2> Price Details </h2>}
                    <div className='nights-price-container flex space-between'>
                        <p>{`$${price.toLocaleString()} x ${calculateNumberOfNights(checksDates.checkIn, checksDates.checkOut)} nights`}</p>
                        <p>{`$${(price * calculateNumberOfNights(checksDates.checkIn, checksDates.checkOut)).toLocaleString()} `}</p>
                    </div>
                    <div className='nights-price-container flex space-between'>
                        <p>Cleaning fee</p>
                        <p>$6</p>
                    </div>
                    <div className='nights-price-container flex space-between'>
                        <p>Airbbb service fee</p>
                        {/* <SmallInfoMsg
                            message={feeMsg} /> */}
                        <p>$14</p>
                    </div>
                </div>

                <div className='total-price-container nights-sum flex space-between'>
                    <h3> Total </h3>
                    <p> {`$${(price * calculateNumberOfNights(checksDates?.checkIn, checksDates?.checkOut) + 20).toLocaleString()} `} </p>
                </div>
            </div>
        </>
    )
}