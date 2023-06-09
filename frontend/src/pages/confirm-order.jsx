import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PriceDetails } from "../cmps/price-details";
import { orederService } from "../services/order.service";
import { useSelector } from "react-redux";
import { LoginSignup } from "../cmps/login-signup";




export function ConfirmOrder() {
    const [searchParams] = useSearchParams()
    const [formDetails, setFormDetails] = useState(null)
    const navigate = useNavigate()
    const isUserLogged = useSelector(storeState => storeState.userModule.user)


    // First load
    useEffect(() => {

        const params = searchParams.get('order')
        if (params) setFormDetails(JSON.parse(params))
        // eslint-disable-next-line
    }, [])

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
        console.log(isUserLogged)
        formDetails.buyerId = isUserLogged._id
        orederService.add(formDetails)
        console.log(formDetails)
        navigate('/')

        // const user = userService.getLoggedinUser()
        // console.log(user)
        
        // if (user) {
        //     formDetails.buyerId = user._id
        //     orederService.add(formDetails)
        //     console.log(formDetails)
        //     navigate('/')
        // } else {
        //     setIsLodingShown(true)
        //     console.log('pls log it')   // TO EDIT
        // }


    }

    if (!formDetails) return

    return (
        <section className="confirm-order-container">
            <div className="column1-content">
                <h1> Confirm your trip </h1>
                <h2> Your trip </h2>

                <div className="dates-container">
                    <h4> Dates </h4>
                    <div className="check-in-date flex align-center">
                        <span> Check in </span>
                        <p> {convertDates(formDetails.info.checkin)} </p>
                    </div>
                    <div className="check-out-date flex align-center">
                        <span> Check out </span>
                        <p> {convertDates(formDetails.info.checkout)} </p>
                    </div>
                </div>
            </div>

            <div className="column2-content">
                <PriceDetails price={formDetails.info.price} checksDates={{ checkIn: formDetails.info.checkin, checkOut: formDetails.info.checkout }} calculateNumberOfNights={calculateNumberOfNights} />
            </div>
            {isUserLogged ?
                <button onClick={confirmOrder}> Confirm </button>
                :
                <div>
                    <h3>Please login to book</h3>
                    <h1>Login in or sign up</h1>
                    <LoginSignup />
                </div>   
            }
        </section>
    )
}