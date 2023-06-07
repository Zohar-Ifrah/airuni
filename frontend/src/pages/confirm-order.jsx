import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";



export function ConfirmOrder() {

    const [searchParams] = useSearchParams()

    // First load
    useEffect(() => {
        const paramsMap = searchParams.entries()
        const formDetails = {}

        for (const [key, value] of paramsMap) {
            formDetails[key] = (isNaN(parseFloat(value))) ? value : parseFloat(value)
        }
        console.log(formDetails)
        
        // eslint-disable-next-line
    }, [])

    return (
        <section className="confirm-order-container">
            <h2> Confirm order </h2>
            <p> Thank you for your order.</p>

            <Link to='/'> <button> Back </button> </Link>
        </section>
    )
}