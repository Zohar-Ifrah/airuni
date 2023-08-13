import { useNavigate } from 'react-router-dom'
import { CarouselComponent } from './img-preview-carousel'
import { utilService } from '../services/util.service'
import { useRef } from 'react'

export function StayPreview({ stay, onRemoveStay, onUpdateStay }) {
    const navigate = useNavigate()
    const distance = useRef(getDistance())
    const dates = useRef(getDates())

    function getDistance() {
        const distance =
            utilService.getRandomIntInclusive(50, 3000).toLocaleString() +
            ' kilometers away'
        return distance
    }

    function getDates() {
        const currentDate = new Date()

        const currentMonth = currentDate.getMonth() // Get the current month (0-11)
        const currentYear = currentDate.getFullYear() // Get the current year

        const startMonth = currentMonth + 1 // Start month (next month)
        const endMonth = currentMonth + utilService.getRandomIntInclusive(2, 3) // End month (current month + 1 or 2)

        const startDate = utilService.getRandomIntInclusive(1, 26) // Random start date (1-26)
        const endDate = utilService.getRandomIntInclusive(startDate + 1, 28) // Random end date (next day - 28)

        const start = new Date(currentYear, startMonth, startDate)
        const end = new Date(currentYear, endMonth, endDate)

        const startFormatted = start.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        })
        const endFormatted = end.toLocaleDateString('en-US', {
            day: 'numeric',
        })

        const dates = `${startFormatted} - ${endFormatted}`
        return dates
    }

    return (
        <li
            className="stay-preview"
            key={stay._id}
            onClick={() => navigate(`/details/${stay._id}`)}
        >
            <CarouselComponent images={stay.imgUrls} stay={stay} />
            <div className="location-rating-container flex space-between">
                <h4> {`${stay.loc.city}, ${stay.loc.country}`} </h4>
                {!!stay.reviews.length && (
                    <div className="rating-container flex align-center">
                        <img
                            src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685704841/star_p6pdqw.svg"
                            alt="Star"
                        />
                        <span>
                            {' '}
                            {`${stay.rating} (${stay.reviews.length})`}{' '}
                        </span>
                    </div>
                )}
            </div>
            <p>{distance.current}</p>
            <p>{dates.current}</p>
            <p>
                {' '}
                <span> ${stay.price.toLocaleString('en-US')} </span> night{' '}
            </p>

            {/* <div>
                <button onClick={() => { onRemoveStay(stay._id) }}>x</button>
                <button onClick={() => { onUpdateStay(stay) }}>Edit</button>
            </div> */}

            {/* <button onClick={() => { onAddStayMsg(stay) }}>Add stay msg</button>
            <button className="buy" onClick={() => { onAddToCart(stay) }}>Add to cart</button> */}
        </li>
    )
}
