import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PriceDetails } from "../cmps/price-details";
import { orederService } from "../services/order.service";
import { useSelector } from "react-redux";
import { LoginSignup } from "../cmps/login-signup";
import { utilService } from "../services/util.service";
import { stayService } from "../services/stay.service";




export function ConfirmOrder() {
    const [searchParams] = useSearchParams()
    const [formDetails, setFormDetails] = useState(null)
    const isUserLogged = useSelector(storeState => storeState.userModule.user)
    const [isOrderConfirmed, setIsOrderConfirmed] = useState(false)
    const [stay, setStay] = useState(null)

    console.log('stay', stay);
    console.log('formDetails', formDetails);

    // First load
    useEffect(() => {

        const params = searchParams.get('order')
        if (params) setFormDetails(JSON.parse(params))
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (!formDetails) return

        loadStay()

        async function loadStay() {
            try {
                const stay = await stayService.getById(formDetails.stayId)
                setStay(stay)
            } catch (err) {
                console.log('canot load stay', err)
            }
        }

    }, [formDetails])

    function calculateNumberOfNights(start, end) {
        const startDate = new Date(start)
        const endDate = new Date(end)
        const timeDifference = endDate.getTime() - startDate.getTime()
        const numberOfNights = Math.ceil(timeDifference / (1000 * 3600 * 24))
        return numberOfNights
    }

    function convertDates(time) {
        const timestamp = time
        const date = new Date(timestamp)

        const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date)
        const day = date.getDate()

        const convertedDate = `${month} ${day}`

        return convertedDate
    }

    function confirmOrder() {

        formDetails.buyerId = isUserLogged._id
        orederService.add(formDetails)

        setIsOrderConfirmed(true)
    }

    if (!formDetails) return <h2>Loading ...</h2>
    if (!stay) return <h2>Loading ...</h2>


    return (
        <section className="confirm-order-container">
            <div className="column1-content">
                <div className="nav-and-h1-container">
                    <Link to={`/details/${formDetails.stayId}`}><img src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685990897/arrow-left-bold_veibjr.svg" alt="back" /></Link>
                    <h1>Confirm your trip</h1>
                </div>

                <h2 > Your trip </h2>

                <div className="dates-container">
                    {/* <h4> Dates </h4>
                    <div className="check-in-date flex align-center">
                        <span> Check in </span>
                        <p> {convertDates(formDetails.info.checkin)} </p>
                    </div>
                    <div className="check-out-date flex align-center">
                        <span> Check out </span>
                        <p> {convertDates(formDetails.info.checkout)} </p>
                    </div> */}
                    <h4> Dates </h4>
                    <div className="check-in-date flex align-center">
                        <p> {convertDates(formDetails.info.checkin)} - {convertDates(formDetails.info.checkout)}</p>
                    </div>
                    <div>
                        <span> Guests </span>
                        <p> {formDetails.info.guests} {formDetails.info.guests > 1 ? 'guests' : ' guest'} </p>
                    </div>
                </div>

                <div className="cancellation-policy">
                    <h1>Cancellation policy</h1>
                    <p><span>Free cancellation before {utilService.getMonth(formDetails.info.checkin)}. </span>
                        Cancel before check-in on {utilService.getMonth(formDetails.info.checkout)} for a partial refund.
                    </p>
                </div>

                <div className="ground-rules">
                    <h1>Ground rules</h1>

                    <p>We ask every guest to remember a few simple things about what makes a great guest.</p>
                    <ul>
                        <li>
                            Follow the house rules
                        </li>
                        <li>
                            Treat your Host's home like your own
                        </li>
                    </ul>
                </div>
            </div>

            <div className="column2-content">
                <PriceDetails price={formDetails.info.price} checksDates={{ checkIn: formDetails.info.checkin, checkOut: formDetails.info.checkout }} calculateNumberOfNights={calculateNumberOfNights} stay={stay} />
            </div>
            {isUserLogged ?
                !isOrderConfirmed ?
                    <button onClick={confirmOrder}> Confirm </button>
                    :
                    <div className="completed-order flex align-center space-between">
                        <div>
                            <h2> Your order has been <span> completed </span> </h2>
                        </div>
                        <button> <Link to={'/trip'}> My orders </Link> </button>
                    </div>
                :
                <div>
                    <h3>Please login to book</h3>
                    <h1>Login in or sign up</h1>
                    {/* <LoginSignup /> */}
                </div>
            }
        </section>
    )
}