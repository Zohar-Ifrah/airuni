import { useNavigate } from "react-router-dom"

export function Trip() {
    const navigate = useNavigate()
    return (
        <div>
            {/* <h1>Welcome back, USERNAME</h1> */}

            <h1>Trips</h1>
            {true &&
                <div>
                    <h3>No trips booked...yet!</h3>
                    <p>Time to dust off your bags and start planning your next adventure</p>
                    <button onClick={() => navigate('/')}>Start searching</button>
                </div>
            }
        </div>
    )
}