import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { showErrorMsg } from "../services/event-bus.service"
// import { stayService } from "../services/stay.service"
import { stayService } from "../services/stay.service.local"  //stay.service.local


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

    if (!stay) return <h1>loadings....</h1>

    return <div className='stay-details'>
        <h3>Stay Details</h3>
        <h5>ID: {stay._id}</h5>
        <h4>Name: {stay.name}</h4>
        <h4>Type: {stay.type}</h4>
        <h4>Price: {stay.price}</h4>
        <h4>Summary: {stay.summary}</h4>
        <h4>Capacity: {stay.capacity}</h4>
        {/* <h4>labels: {stay.labels && stay.labels.map(l => <p key={l}>{l}</p>)}</h4> */}
        {/* <h4>Created At: {new Date(stay.createdAt).toLocaleDateString()}</h4> */}
        {/* <h4>inStock: {stay.inStock ? '✔' : '❌'}</h4> */}

        <Link className="btn" to="/stay">Back to List</Link>
    </div>
}
