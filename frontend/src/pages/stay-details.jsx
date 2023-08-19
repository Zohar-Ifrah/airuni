import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { showErrorMsg } from '../services/event-bus.service'
// import { stayService } from "../services/stay.service"
import { stayService } from '../services/stay.service.js'
import { DetailsGallery } from '../cmps/details-gallery'
import { DetailsHeader } from '../cmps/details-header'
import { StayExrtaDetails } from '../cmps/stay-extra-details'
import { StayAmenities } from '../cmps/stay-amenities'
import { Review } from '../cmps/review'
import { OrderForm } from '../cmps/order-form'
import { useDispatch, useSelector } from 'react-redux'
import { SET_DETAILS_SHOWN, SET_DETAILS_UNSHOWN } from '../store/system.reducer'
import { CalendarPicker } from '../cmps/calendar-picker'
import { DetailsMap } from '../cmps/details-map'
import { SkeletonStayDetails } from '../cmps/skeleton-stay-details'
import { DetailsHeaderMobile } from '../cmps/details-header-mobile'
import { DetailsGalleryMobile } from '../cmps/details-gallery-mobile'
import { DetailsContentMobile } from '../cmps/details-content-mobile'
import { FormOrderMobile } from '../cmps/form-order-mobile'

export function StayDetails() {
    const calAmount = 2
    const [stay, setStay] = useState(null)
    const { stayId } = useParams()
    const dispatch = useDispatch()
    const [checkInAndOutDate, setCheckInAndOutDate] = useState(null)
    const [isOpenReviews, setIsOpenReviews] = useState(false)
    const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)
    const navigate = useNavigate()
    // const stays = useSelector((storeState) => storeState.stays)

    useEffect(() => {
        dispatch({ type: SET_DETAILS_SHOWN })
        loadStay()

        return () => dispatch({ type: SET_DETAILS_UNSHOWN })
        // eslint-disable-next-line
    }, [])

    async function loadStay() {
        try {
            const stay = await stayService.getById(stayId)
            setStay(stay)
        } catch (err) {
            console.log('Had issues in stay details', err)
            showErrorMsg('Cannot load stay')
            navigate('/stay')
        }
    }

    function onSetDates(startDate, endDate) {
        // setCheckInAndOutDate({
        //     checkIn: filterBy.checkIn, checkOut: filterBy.checkOut
        // })
        setCheckInAndOutDate({
            checkIn: startDate,
            checkOut: endDate,
        })
    }

    function onCheckInClick(isCheckInClicked) {
        // To check if needs?
        // console.log(isCheckInClicked)
    }

    if (!stay) return <SkeletonStayDetails />

    return (
        <div className="stay-details details-main-layout full">
            <DetailsHeader
                stay={stay}
                setIsOpenReviews={setIsOpenReviews}
                loadStay={loadStay}
            />
            <DetailsHeaderMobile stay={stay} loadStay={loadStay} />
            <DetailsGallery stay={stay} />
            <DetailsGalleryMobile stay={stay} />
            <DetailsContentMobile
                stay={stay}
                setIsOpenReviews={setIsOpenReviews}
            />

            <section className="stay-details-content">
                <div className="stay-details-content-column1">
                    <StayExrtaDetails stay={stay} />
                    <StayAmenities stay={stay} />

                    <CalendarPicker
                        onSetDates={onSetDates}
                        onCheckInClick={onCheckInClick}
                        calAmount={calAmount}
                    />
                </div>
                <div className="stay-details-content-column2">
                    <OrderForm
                        stay={stay}
                        checkInAndOutDate={checkInAndOutDate}
                        setIsOpenReviews={setIsOpenReviews}
                        filterBy={filterBy}
                    />
                </div>
            </section>

            <Review stay={stay} isOpenReviews={isOpenReviews} />

            <DetailsMap loc={stay.loc} />

            <FormOrderMobile
                stay={stay}
                checkInAndOutDate={checkInAndOutDate}
                filterBy={filterBy}
            />

            {/* <button>Contact Host</button> */}
        </div>
    )
}
