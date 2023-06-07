import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { AddGuests } from './add-guests'
import { CalendarPicker } from './calendar-picker'
// import { DateRangePicker } from 'react-date-range'

export function OrderForm({ stay }) {
    const navigate = useNavigate()
    const [isAddGuestsOpen, setIsAddGuestsOpen] = useState(false)
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)
    const [guestsAmount, setGuestsAmount] = useState(0)
    // const guestsAmount = useRef(0)
    const maxCapacity = useRef(stay.capacity).current
    // eslint-disable-next-line
    // const [selectionRange, setSelectionRange] = useState({
    //     startDate: stay.availableDates[0].startDate,
    //     endDate: stay.availableDates[0].endDate,
    //     key: 'selection',
    // })

    // useEffect(() => {
       
    // }, [guestsAmount.current])

    function calculateNumberOfNights() {
        const endDate = new Date('8/1/2023')
        const startDate = new Date('8/10/2023')
        const timeDifference = endDate.getTime() - startDate.getTime()
        const numberOfNights = Math.ceil(timeDifference / (1000 * 3600 * 24))
        console.log('numberOfNights', numberOfNights);
        return numberOfNights * -1
    }

    // function handleSelect(ranges) {
    //     setSelectionRange(ranges.selection)
    // }

    function onSubmitOrder(ev) {
        ev.preventDefault()
        navigate(`/details/${stay._id}/confirm`)
    }

    function onOpenGuestsModal() {
        // if (isCalendarOpen) setIsCalendarOpen(false)
        setIsAddGuestsOpen(!isAddGuestsOpen)
    }

    function guestsMsg() {
        return guestsAmount > 1 ? guestsAmount + ' guests' : guestsAmount + ' guest'
    }

    function onUpdateCapacity({ capacity }) {
        console.log(capacity)
        setGuestsAmount(capacity.adults + capacity.children)
        console.log(guestsAmount)

        // setFilterByToEdit({
        //   ...filterByToEdit,
        //   adults: capacity.adults,
        //   children: capacity.children,
        //   infants: capacity.infants,
        //   pets: capacity.pets,
        // })
    }

    function ontoggleCalendar(from) {
        console.log(from)
        setIsCalendarOpen(!isCalendarOpen)
        // if ((from === 'checkIn' && !isCheckIn) ||
        //     (from === 'checkOut' && isCheckIn)) {
        //     // console.log('enter')
        //     setIsAddGuestsOpen(false)
        //     setIsSearchOpen(false)
        //     setIsCalendarOpen(!isCalendarOpen)
        //     from === 'checkOut' && setIsCheckIn(false)
        // } else from === 'checkIn' ? setIsCheckIn(false) : setIsCheckIn(true)
    }

    function onCheckInClick(isClicked) {
        console.log(isClicked)
        // setIsCheckIn(isClicked)
        // isCheckInRef.current = isClicked
    }
    function onSetDates(startDate, endDate) {
        console.log('startDate: ', startDate)
        console.log('endDate: ', endDate)

        // checkInAndOutDate.current = { checkIn: getMonth(startDate), checkOut: getMonth(endDate) }
        // setFilterByToEdit({
        //     ...filterByToEdit,
        //     checkIn: startDate,
        //     checkOut: endDate
        // })
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

                    <div onClick={() => { ontoggleCalendar() }} className="dates-container flex align-center">
                        <div className="check-in-container">
                            <span> check-in </span>
                            <div className='date-check-in'> 8/1/2023 </div>
                        </div>

                        <div className="check-out-container">
                            <span> checkout </span>
                            <div className='date-check-out'> 8/10/2023 </div>
                        </div>
                    </div>

                    <div className="show-contents">

                        {isCalendarOpen && <CalendarPicker
                            onSetDates={onSetDates}
                            onCheckInClick={onCheckInClick} />}
                    </div>

                    <div onClick={() => { onOpenGuestsModal() }} className="guests flex column justify-center">
                        <span> guests </span>
                        <div className='guests-count'> {guestsAmount ? guestsMsg() : 'Add guests'} </div>
                    </div>

                    <div className="show-contents">
                        {isAddGuestsOpen && <AddGuests
                            onUpdateCapacity={onUpdateCapacity}
                            maxCapacity={maxCapacity} />}
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