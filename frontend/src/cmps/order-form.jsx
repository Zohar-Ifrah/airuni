import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { AddGuests } from './add-guests'
import { CalendarPicker } from './calendar-picker'
import { PriceDetails } from './price-details'
import { orederService } from '../services/order.service'
import { useDispatch } from 'react-redux'
import { SET_DETAILS_UNSHOWN } from '../store/system.reducer'
import { ShowAllReviews } from './show-all-reviews'


export function OrderForm({ stay, checkInAndOutDate, setIsOpenReviews, filterBy }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isAddGuestsOpen, setIsAddGuestsOpen] = useState(false)
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)
    const [checksDates, setChecksDates] = useState(
        checkInAndOutDate ? checkInAndOutDate :
            {
                checkIn: filterBy.checkIn, checkOut: filterBy.checkOut
            })
    const [guestsAmount, setGuestsAmount] = useState(filterBy.adults + filterBy.children)
    const isFromOrderForm = useRef(true)
    const maxCapacity = useRef(stay.capacity).current
    const [capacityToEdit, setCapacityToEdit] = useState({
        adults: filterBy.adults,
        children: filterBy.children,
        infants: filterBy.infants,
        pets: filterBy.pets
    })


    useEffect(() => {
        setChecksDates({checkIn: filterBy.checkIn, checkOut: filterBy.checkOut})
        // setChecksDates(checkInAndOutDate)
    }, [checkInAndOutDate])

    function calculateNumberOfNights(start, end) {
        const startDate = new Date(start)
        const endDate = new Date(end)
        const timeDifference = endDate.getTime() - startDate.getTime()
        const numberOfNights = Math.ceil(timeDifference / (1000 * 3600 * 24))
        return numberOfNights
    }

    // function handleSelect(ranges) {
    //     setSelectionRange(ranges.selection)
    // }

    function onSubmitOrder(ev) {
        ev.preventDefault()

        if (!guestsAmount && !checksDates) return setIsCalendarOpen(true)
        const formDetails = orederService.getEmptyOrder()
        formDetails.info = {
            checkin: checksDates.checkIn,
            checkout: checksDates.checkOut,
            guests: guestsAmount,
            price: (stay.price * calculateNumberOfNights(checksDates.checkIn, checksDates.checkOut)) + 20
        }
        formDetails.stayId = stay._id
        formDetails.hostId = stay.host._id

        // SET params:
        const params = new URLSearchParams({ order: JSON.stringify(formDetails) })
        dispatch({ type: SET_DETAILS_UNSHOWN })
        navigate(`/confirm/?${params}`)
    }

    function onOpenGuestsModal() {
        // if (isCalendarOpen) setIsCalendarOpen(false)
        setIsAddGuestsOpen(prevIsAddGuestsOpen => !prevIsAddGuestsOpen)
    }

    function guestsMsg() {
        return guestsAmount > 1 ? guestsAmount + ' guests' : guestsAmount + ' guest'
    }

    function onUpdateCapacity(capacity) {
        console.log('capacity: ', capacity)
        setGuestsAmount(capacity.adults + capacity.children)
        setCapacityToEdit(capacity)
        // setCapacityToEdit({
        //     ...capacityToEdit,
        //     adults: capacity.adults,
        //     children: capacity.children,
        //     infants: capacity.infants,
        //     pets: capacity.pets,
        //   })
    }

    function ontoggleCalendar() {
        setIsCalendarOpen(!isCalendarOpen)
    }

    function onCheckInClick(isClicked) {
        // console.log(isClicked)
    }
    function onSetDates(startDate, endDate) {
        console.log('onSetDates')
        setIsCalendarOpen(!isCalendarOpen)
        setChecksDates({ checkIn: startDate, checkOut: endDate })

    }

    function formatDate(timestamp) {
        const date = new Date(timestamp)
        const day = date.getDate()
        const month = date.getMonth() + 1 // Adding 1 because getMonth() returns zero-based month
        const year = date.getFullYear()
        return `${month}/${day}/${year} `
    }

    function onOpenReviews() {
        setIsOpenReviews(true)

        setTimeout(() => {
            setIsOpenReviews(false)
        }, 300);
    }

    return (
        <section className="order-form-container">
            {console.log(checksDates)}
            <div className="price-rating-container flex space-between">

                <div className="price-container flex">
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
                            <p> {stay.rating} </p>
                            <span> · </span>
                        </div>
                    )}
                    <p className='reviews-amount' onClick={onOpenReviews}>{`${stay.reviews.length} reviews`}</p>

                </div>
            </div>

            <form className="flex column align-center" onSubmit={onSubmitOrder}>

                <div className="dates-guests-container flex column align-center space-between">
                    <div onClick={() => { ontoggleCalendar() }} className="dates-container flex align-center">
                        <div className="check-in-container">
                            <span> check-in </span>
                            {console.log(checkInAndOutDate)}
                            {console.log(checksDates)}
                            <div className='date-check-in'>{checksDates ? formatDate(checksDates.checkIn) : 'Add date'} </div>
                        </div>

                        <div className="check-out-container">
                            <span> checkout </span>
                            <div className='date-check-out'>{checksDates ? formatDate(checksDates.checkOut) : 'Add date'} </div>
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
                            maxCapacity={maxCapacity}
                            onOpenGuestsModal={onOpenGuestsModal}
                            isFromOrderForm={isFromOrderForm}
                            capacity={capacityToEdit} />}
                    </div>
                </div>
                <button>Reserve</button>
            </form>

            <p className='txt-charged'>You won't be charged yet</p>

            {checksDates && !!guestsAmount &&
                <PriceDetails price={stay.price} checksDates={checksDates} calculateNumberOfNights={calculateNumberOfNights} isFromConfirmOrder={false} />
            }

        </section>
    )
}