import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
// import { DateRangePicker } from 'react-date-range'

export function OrderForm({ stay }) {
    const navigate = useNavigate()
    // eslint-disable-next-line
    // const [selectionRange, setSelectionRange] = useState({
    //     startDate: stay.availableDates[0].startDate,
    //     endDate: stay.availableDates[0].endDate,
    //     key: 'selection',
    // })

    function calculateNumberOfNights() {
        const endDate = new Date('1/1/2024')
        const startDate = new Date('1/1/2025')
        const timeDifference = endDate.getTime() - startDate.getTime()
        const numberOfNights = Math.ceil(timeDifference / (1000 * 3600 * 24))
        return numberOfNights
    }

    // function handleSelect(ranges) {
    //     setSelectionRange(ranges.selection)
    // }

    function onSubmitOrder(ev) {
        ev.preventDefault()
        navigate(`/details/${stay._id}/confirm`)
    }

    return (
        <section className="order-form-container">
            <div className="price-rating-container flex space-between">
                <div className="price-container flex align-center">
                    <h2>${stay.price}</h2>
                    <p>night</p>
                </div>
                <div className="rating-review-container flex align-center">
                    {!!stay.reviews.length && (
                        <div className="rating-container flex align-center">
                            <img
                                src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685704841/star_p6pdqw.svg"
                                alt="Star"
                            />
                            {/* {!!stay.reviews.length && <p>
                                {`${(Math.floor(calculateAvgReviews() * 100) / 100)
                                    .toLocaleString('en-US', {
                                        minimumFractionDigits: 1,
                                        maximumFractionDigits: 2
                                    })
                                    .replace(/(\.\d)0$/, '$1')
                                    .replace(/\.00$/, '')
                                    }`}
                            </p>} */}
                            <p> {stay.rating} </p>
                        </div>
                    )}
                    <p>{` · ${stay.reviews.length} reviews`}</p>
                </div>
            </div>

            <form className="flex column align-center" onSubmit={onSubmitOrder}>
                <div className="dates-guests-container flex column align-center space-between">
                    <div className="dates-container flex align-center">
                        <div className="check-in-container">
                            <span> check-in </span>
                            <div className='date-check-in'> 1/1/2024 </div>
                        </div>
                        <div className="check-out-container">
                            <span> checkout </span>
                            <div className='date-check-out'> 1/1/2025 </div>
                        </div>
                    </div>
                    <div className="guests flex column justify-center">
                        <span> guests </span>
                        <div className='guests-count'> 1 guest </div>
                    </div>
                </div>
                {/* <div className="date-picker-container">
                    <DateRangePicker
                        ranges={[selectionRange]}
                        onChange={handleSelect}
                        months={2}
                        minDate={new Date()}
                        rangeColors={['#FF5E3A']}
                    />
                </div> */}

                {/* <label htmlFor="guests">guests</label>
                <select name="guests" id="guests">
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                </select> */}

                <button>Reserve</button>
            </form>

            <p className='txt-charged'>You won't be charged yet</p>

            <div className='nights-sum flex align-center space-between'>
                <p> {`$${stay.price} x ${calculateNumberOfNights()} nights`} </p>
                <div className='total-price-container flex align-center'>
                    <h3> total </h3>
                    <p> {`$${stay.price * calculateNumberOfNights()}`} </p>
                </div>
            </div>
        </section>
    )
}





// import { useNavigate } from 'react-router-dom';


// export function OrderForm({ stay }) {

//     const navigate = useNavigate();

//     function calculateAvgReviews() {
//         let count = 0
//         const sum = stay.reviews.reduce((acc, review) => {
//             count++
//             return acc + review.rate
//         }, 0)

//         return sum / count
//     }

//     function onSubmitOrder(ev) {
//         ev.preventDefault()
//         navigate(`/details/${stay._id}/confirm`)
//     }

//     return (
//         <section className="order-form-container">

//             <div className="price-rating-container flex space-between">
//                 <div className="price-container flex align-center">
//                     <h2> ${stay.price} </h2>
//                     <p> night </p>
//                 </div>
//                 <div className="rating-review-container flex align-center">
//                     {!!stay.reviews.length && <div className="rating-container flex align-center">
//                         <img src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685704841/star_p6pdqw.svg" alt="Star" />
//                         <p> {`${calculateAvgReviews().toFixed(2)}`} </p>
//                     </div>}
//                     <p>
//                         {` · ${stay.reviews.length} reviews`}
//                     </p>
//                 </div>
//             </div>

//             <form className="flex column align-center" onSubmit={onSubmitOrder}>
//                 <label htmlFor="check-in"> check-in </label>
//                 <input type="date" name="check-in" id="check-in" required />

//                 <label htmlFor="check-out"> check-out </label>
//                 <input type="date" name="check-out" id="check-out" required />

//                 <label htmlFor="guests"> guests </label>
//                 <select name="guests" id="guests">
//                     <option value=""> 1 </option>
//                     <option value=""> 2 </option>
//                     <option value=""> 3 </option>
//                 </select>

//                 <button> Reserve </button>
//             </form>

//             <p> You won't be charged yet </p>

//         </section>
//     )
// }