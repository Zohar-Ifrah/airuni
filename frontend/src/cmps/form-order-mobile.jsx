import { useState } from 'react'
import { CalendarPicker } from './calendar-picker'
import { orederService } from '../services/order.service'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SET_DETAILS_UNSHOWN } from '../store/system.reducer'

export function FormOrderMobile({ stay, checkInAndOutDate, filterBy }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [checksDates, setChecksDates] = useState(
        checkInAndOutDate
            ? checkInAndOutDate // if getting dates from details calendar
            : !!filterBy.checkIn && {
                  // if filterBy.checkIn !== 0
                  checkIn: filterBy.checkIn,
                  checkOut: filterBy.checkOut,
              }
    )
    const [guestsAmount, setGuestsAmount] = useState(
        filterBy.adults + filterBy.children
    )
    const [capacityToEdit, setCapacityToEdit] = useState({
        adults: filterBy.adults,
        children: filterBy.children,
        infants: filterBy.infants,
        pets: filterBy.pets,
    })
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)

    function formatDate(timestamp) {
        const date = new Date(timestamp)
        const day = date.getDate()
        const month = date.getMonth() + 1 // Adding 1 because getMonth() returns zero-based month
        const year = date.getFullYear()
        return `${month}/${day} `
    }

    function onSetDates(startDate, endDate) {
        console.log('onSetDates')
        setIsCalendarOpen(!isCalendarOpen)
        setChecksDates({ checkIn: startDate, checkOut: endDate })
    }

    function onCheckInClick(isClicked) {
        // console.log(isClicked)
    }

    function calculateNumberOfNights(start, end) {
        const startDate = new Date(start)
        const endDate = new Date(end)
        const timeDifference = endDate.getTime() - startDate.getTime()
        const numberOfNights = Math.ceil(timeDifference / (1000 * 3600 * 24))
        return numberOfNights
    }

    function onSubmitOrder(ev) {
        ev.preventDefault()

        if (!guestsAmount && !checksDates) return setIsCalendarOpen(true)
        const formDetails = orederService.getEmptyOrder()
        formDetails.info = {
            checkin: checksDates.checkIn,
            checkout: checksDates.checkOut,
            guests: guestsAmount,
            price:
                stay.price *
                    calculateNumberOfNights(
                        checksDates.checkIn,
                        checksDates.checkOut
                    ) +
                20,
        }
        formDetails.stayId = stay._id
        formDetails.hostId = stay.host._id
        formDetails.createdAt = Date.now()

        // SET params:
        const params = new URLSearchParams({
            order: JSON.stringify(formDetails),
        })
        dispatch({ type: SET_DETAILS_UNSHOWN })
        navigate(`/confirm/?${params}`)
    }

    return (
        <div className="form-order-mobile full details-main-layout">
            <div className="form-order-mobile-inner-container flex align-center space-between">
                <div className="price-dates flex column">
                    <p className="price">
                        ${stay.price} <span>night</span>
                    </p>
                    <span
                        className="dates"
                        onClick={() =>
                            setIsCalendarOpen(
                                (prevIsCalendarOpen) => !prevIsCalendarOpen
                            )
                        }
                    >
                        {checksDates.checkIn
                            ? formatDate(checksDates.checkIn) +
                              '- ' +
                              formatDate(checksDates.checkOut)
                            : 'Pick dates'}
                    </span>
                </div>
                <button className="btn-reserve" onClick={onSubmitOrder}>
                    Reserve
                </button>
            </div>
            {isCalendarOpen && (
                <div className="blur-screen full">
                    <CalendarPicker
                        onSetDates={onSetDates}
                        onCheckInClick={onCheckInClick}
                    />
                    <button
                        className="btn-close"
                        onClick={() => setIsCalendarOpen(false)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                            role="presentation"
                            focusable="false"
                            style={{
                                display: 'block',
                                fill: 'none',
                                height: '12px',
                                width: '12px',
                                stroke: 'currentcolor',
                                strokeWidth: '5.33333',
                                overflow: 'visible',
                            }}
                        >
                            <path d="m6 6 20 20M26 6 6 26"></path>
                        </svg>
                    </button>
                </div>
            )}
        </div>
    )
}
