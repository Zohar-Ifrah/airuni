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


export function StayDetails() {

    const [stay, setStay] = useState(null)
    const { stayId } = useParams()

    const navigate = useNavigate()
    // const stays = useSelector((storeState) => storeState.stays)

    useEffect(() => {
        loadStay()
        // eslint-disable-next-line
    }, [])

    function loadStay() {
        stayService.getById(stayId)
            .then((stay) => setStay(stay))
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
            <StayExrtaDetails stay={stay} />
            {/* <MeetHost /> not implement yet */}
            {/* <AboutStay/> not implement yet */}
            {/* <StaySleep/> not implement yet */}
            <StayAmenities stay={stay} />
            < DetailsCalendar />
            <OrderForm stay={stay} />
        </section>
        <Review stay={stay} />




        <Link className="btn" to="/stay">Back to List</Link>
    </div>
}
