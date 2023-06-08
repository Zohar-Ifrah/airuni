import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { AddGuests } from './add-guests'
import { CalendarPicker } from './calendar-picker'
import { useSelector } from 'react-redux'
import { PriceDetails } from './price-details'
import { orederService } from '../services/order.service'
// import { DateRangePicker } from 'react-date-range'

export function OrderForm({ stay, checkInAndOutDate }) {
    const navigate = useNavigate()
    const [isAddGuestsOpen, setIsAddGuestsOpen] = useState(false)
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)
    const [checksDates, setChecksDates] = useState(checkInAndOutDate)
    const [guestsAmount, setGuestsAmount] = useState(0)
    const [searchParams, setSearchParams] = useSearchParams()
    const isFromOrderForm = useRef(true)

    const [orderDetails, setOrderDetails] = useState(orederService.getEmptyOrder())

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

    useEffect(() => {
        setChecksDates(checkInAndOutDate)
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

        if (!guestsAmount && !checksDates) return console.log('NOP!!!!')
        const formDetails = orederService.getEmptyOrder()
        formDetails.info = {
            checkin: checksDates.checkIn,
                checkout: checksDates.checkOut,
                guests: guestsAmount,
                price: stay.price
        }
        // const formDetails = {
        //     checkIn: checksDates.checkIn,
        //     checkOut: checksDates.checkOut,
        //     guests: guestsAmount,
        //     price: stay.price,
            
        // }
        // order  {
            
        //     stayId: '',
        //     hostId: '',
        //     buyerId: '',
        //     info: {
        //         checkin: -1,
        //         checkout: -1,
        //         price: -1,
        //         guests: -1,
        //     },
        //     createdAt: -1,
        //     isAproved: false,
        //     }

        // SET params:
        const params = new URLSearchParams({order:JSON.stringify(formDetails)})

        navigate(`/confirm/?${params}`)
    }

    function onOpenGuestsModal() {
        // if (isCalendarOpen) setIsCalendarOpen(false)
        setIsAddGuestsOpen(prevIsAddGuestsOpen => !prevIsAddGuestsOpen)
    }

    function guestsMsg() {
        return guestsAmount > 1 ? guestsAmount + ' guests' : guestsAmount + ' guest'
    }

    function onUpdateCapacity({ capacity }) {
        setGuestsAmount(capacity.adults + capacity.children)

        // setFilterByToEdit({
        //   ...filterByToEdit,
        //   adults: capacity.adults,
        //   children: capacity.children,
        //   infants: capacity.infants,
        //   pets: capacity.pets,
        // })
    }

    function ontoggleCalendar(from) {
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
        // setIsCheckIn(isClicked)
        // isCheckInRef.current = isClicked
    }
    function onSetDates(startDate, endDate) {
        // console.log('startDate: ', startDate)
        // console.log('endDate: ', endDate)

        setChecksDates({ checkIn: startDate, checkOut: endDate })
        // setFilterByToEdit({
        //     ...filterByToEdit,
        //     checkIn: startDate,
        //     checkOut: endDate
        // })
    }

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month
        const year = date.getFullYear();
        return `${month}/${day}/${year} `;
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
                                {`${
            (Math.floor(calculateAvgReviews() * 100) / 100)
            .toLocaleString('en-US', {
                minimumFractionDigits: 1,
                maximumFractionDigits: 2
            })
            .replace(/(\.\d)0$/, '$1')
            .replace(/\.00$/, '')
        } `}
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
                            isFromOrderForm={isFromOrderForm} />}
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

            {checksDates && !!guestsAmount &&
                <PriceDetails price={stay.price} checksDates={checksDates} calculateNumberOfNights={calculateNumberOfNights} isFromConfirmOrder={false} />
            }
        </section>
    )
}