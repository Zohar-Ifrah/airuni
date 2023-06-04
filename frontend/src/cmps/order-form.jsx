import { useNavigate } from 'react-router-dom';


export function OrderForm({ stay }) {

    const navigate = useNavigate();

    function calculateAvgReviews() {
        let count = 0
        const sum = stay.reviews.reduce((acc, review) => {
            count++
            return acc + review.rate
        }, 0)

        return sum / count
    }

    function onSubmitOrder(ev) {
        ev.preventDefault()
        navigate(`/details/${stay._id}/confirm`)
    }

    return (
        <section className="order-form-container">

            <div className="price-rating-container flex space-between">
                <div className="price-container flex align-center">
                    <h2> ${stay.price} </h2>
                    <p> night </p>
                </div>
                <div className="rating-review-container flex align-center">
                    {!!stay.reviews.length && <div className="rating-container flex align-center">
                        <img src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685704841/star_p6pdqw.svg" alt="Star" />
                        <p> {`${calculateAvgReviews().toFixed(2)}`} </p>
                    </div>}
                    <p>
                        {` · ${stay.reviews.length} reviews`}
                    </p>
                </div>
            </div>

            <form className="flex column align-center" onSubmit={onSubmitOrder}>
                <label htmlFor="check-in"> check-in </label>
                <input type="date" name="check-in" id="check-in" required />

                <label htmlFor="check-out"> check-out </label>
                <input type="date" name="check-out" id="check-out" required />

                <label htmlFor="guests"> guests </label>
                <select name="guests" id="guests">
                    <option value=""> 1 </option>
                    <option value=""> 2 </option>
                    <option value=""> 3 </option>
                </select>

                <button> Reserve </button>
            </form>

            <p> You won't be charged yet </p>

        </section>
    )
}