import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { showErrorMsg } from "../services/event-bus.service"
// import { stayService } from "../services/stay.service"
import { stayService } from "../services/stay.service.local"  //stay.service.local
import { DetailsGallery } from "../cmps/details-gallery"
import { DetailsHeader } from "../cmps/details-header"
import { DetailsCalendar } from "../cmps/details-calendar"
import { StayExrtaDetails } from "../cmps/stay-extra-details"
import { StayAmenities } from "../cmps/stay-amenities"
import { Review } from "../cmps/review"
import { OrderForm } from "../cmps/order-form"
import { useDispatch } from "react-redux"
import { SET_DETAILS_SHOWN } from "../store/system.reducer"


export function StayDetails() {

    const [stay, setStay] = useState(null)
    const { stayId } = useParams()
    const dispatch = useDispatch()

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
                console.log(stay);
            })
            .catch((err) => {
                console.log('Had issues in stay details', err)
                showErrorMsg('Cannot load stay')
                navigate('/stay')
            })
    }

    if (!stay) return <h1>Loading ...</h1>

    return <div className='stay-details'>
        <DetailsHeader stay={stay} />
        <DetailsGallery stay={stay} />
        <section className="stay-details-content">
            <div className="stay-details-content-column1">
                <StayExrtaDetails stay={stay} />
                <StayAmenities stay={stay} />
                < DetailsCalendar />
            </div>
            <div className="stay-details-content-column2">
                <OrderForm stay={stay} />
            </div>
        </section>
        <Review stay={stay} />




        <Link className="btn" to="/stay">Back to List</Link>
    </div>
}
