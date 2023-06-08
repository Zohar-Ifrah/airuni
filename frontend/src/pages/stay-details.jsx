import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { showErrorMsg } from "../services/event-bus.service"
import { stayService } from "../services/stay.service.local"
import { DetailsGallery } from "../cmps/details-gallery"
import { DetailsHeader } from "../cmps/details-header"
import { StayExrtaDetails } from "../cmps/stay-extra-details"
import { StayAmenities } from "../cmps/stay-amenities"
import { Review } from "../cmps/review"
import { OrderForm } from "../cmps/order-form"
import { useDispatch } from "react-redux"
import { SET_DETAILS_SHOWN } from "../store/system.reducer"
import { CalendarPicker } from "../cmps/calendar-picker"
import { DetailsMap } from "../cmps/details-map"



export function StayDetails() {
    const calAmount = 1
    const [stay, setStay] = useState(null)
    const { stayId } = useParams()
    const dispatch = useDispatch()
    const [checkInAndOutDate, setCheckInAndOutDate] = useState(null)

    const navigate = useNavigate()
    // const stays = useSelector((storeState) => storeState.stays)

    useEffect(() => {
        dispatch({ type: SET_DETAILS_SHOWN })
        loadStay()
        // eslint-disable-next-line
    }, [])

    function loadStay() {
        stayService.getById(stayId)
            .then((stay) => {
                setStay(stay)
            })
            .catch((err) => {
                console.log('Had issues in stay details', err)
                showErrorMsg('Cannot load stay')
                navigate('/stay')
            })
    }

    function onSetDates(startDate, endDate) {
        setCheckInAndOutDate({
            checkIn: startDate, checkOut: endDate
        })
    }

    function onCheckInClick(isCheckInClicked) { // To check if needs?
        // console.log(isCheckInClicked)
    }

    if (!stay) return <h1>Loading ...</h1>

    return <div className='stay-details'>
        <DetailsHeader stay={stay} />
        <DetailsGallery stay={stay} />

        <section className="stay-details-content">
            <div className="stay-details-content-column1">
                <StayExrtaDetails stay={stay} />
                <StayAmenities stay={stay} />

                <CalendarPicker
                    onSetDates={onSetDates}
                    onCheckInClick={onCheckInClick}
                    calAmount={calAmount} />
            </div>
            <div className="stay-details-content-column2">
                <OrderForm stay={stay}
                    checkInAndOutDate={checkInAndOutDate} />
            </div>
        </section>
        <Review stay={stay} />
        <DetailsMap />
        <button>Contact Host</button>
    </div>
}
