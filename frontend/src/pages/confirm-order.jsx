import { Link } from "react-router-dom";



export function ConfirmOrder() {

    return (
        <section className="confirm-order-container">
            <h2> Confirm order </h2>
            <p> Thank you for your order.</p>

            <Link to='/'> <button> Back </button> </Link>
        </section>
    )
}