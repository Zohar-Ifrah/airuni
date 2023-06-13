import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { orederService } from "../services/order.service"
import { useEffect, useState } from "react"
import { userService } from "../services/user.service"
import { loadStays } from "../store/stay.actions"
import { socketService } from "../services/socket.service"



export function Dashboard() {
    const navigate = useNavigate()
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const userLogged = useSelector(storeState => storeState.userModule.user)
    const [users, setUsers] = useState([])
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await userService.getUsers()
                setUsers(users)
            } catch (error) {
                console.log("Error fetching users:", error)
            }
        }

        // Real time update orders
        socketService.on('get-new-order', (order) => {
            setOrders((prevOrders) => {
                return [order, ...prevOrders]
            })
        })

        fetchUsers()

        loadStays()

    }, [])

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const userOrders = await orederService.getOrderByHost(userLogged._id)
                setOrders(userOrders)
                // setHost(getHost(userOrders[0].hostId))
            } catch (error) {
                console.log("Error fetching orders:", error)
            }
        }

        if (userLogged) {
            fetchOrders()
        }
    }, [userLogged])

    // Function to format the check-in and check-out dates
    const formatDateRange = (checkin, checkout) => {
        const checkinDate = new Date(checkin)
        const checkoutDate = new Date(checkout)

        const formattedCheckin = `${checkinDate.toLocaleString('en-US', { month: 'short' })} ${checkinDate.getDate()}`
        const formattedCheckout = `${checkoutDate.toLocaleString('en-US', { month: 'short' })} ${checkoutDate.getDate()}`

        return `${formattedCheckin} - ${formattedCheckout}`
    }

    // Function to get the approval status
    const getApprovalStatus = (isApproved) => {
        return isApproved ? 'Approved' : 'Pending'
    }

    function getGuestInfo(buyerId) {
        if (users.length) {
            const buyer = users.find(user => user._id === buyerId)
            return { img: buyer.imgUrl, name: buyer.fullname }
        }
    }

    function handelOrder(order, isApproved) {
        const orderToUpdate = { ...order, isApproved: isApproved }
        try {
            orederService.update(orderToUpdate)
            setOrders(prevOrders => {
                const updatedOrders = prevOrders.map(prevOrder => {
                    if (prevOrder._id === orderToUpdate._id) {
                        return orderToUpdate
                    }
                    return prevOrder
                })
                return updatedOrders
            })
        } catch (error) {
            console.log("Error updating order:", error)
        }
    }

    if (!stays.length) return <h2> Loading... </h2>

    return (
        <>
            {userLogged ?
                <div>
                    <h1>Welcome back, {userLogged.fullname}</h1>
                    <h1>Orders</h1>

                    {orders.length && orders.length ?
                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    <td>
                                        guests
                                    </td>
                                    <td>
                                        stay
                                    </td>
                                    <td>
                                        dates
                                    </td>
                                    <td>
                                        payment
                                    </td>
                                    <td>
                                        status
                                    </td>
                                    <td>
                                        action
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => {
                                    const guestInfo = getGuestInfo(order.buyerId)
                                    // const img = stays.find(stay => {<img src={img && img.imgUrls[0]}
                                    //     if (stay._id === order._id) {
                                    //         console.log(stay._id)
                                    //         console.log(order._id)
                                    //     }
                                    //     return stay._id === order._id
                                    // })
                                    return (
                                        <tr key={order._id}>
                                            {guestInfo &&
                                                <td>
                                                    <img src={guestInfo.img} alt="guest" />
                                                    <p>{guestInfo.name}</p>
                                                </td>
                                            }
                                            <td><img src={stays.find(stay => stay.host === order.hostId)?.imgUrls[0]} alt="stay" /> </td>
                                            <td>{formatDateRange(order.info.checkin, order.info.checkout)}</td>
                                            <td>${order.info.price}</td>
                                            <td>{getApprovalStatus(order.isApproved)}</td>
                                            <td>
                                                <button className="accept-btn" onClick={() => handelOrder(order, true)}>Accept</button>
                                                <button className="reject-btn" onClick={() => handelOrder(order, false)}>Reject</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        :
                        <div>
                            <h3>No trips booked...yet!</h3>
                            <p>Time to dust off your bags and start planning your next adventure</p>
                            <button onClick={() => navigate('/')}>Start searching</button>
                        </div>
                    }
                </div>
                : navigate('/')
            }
        </>
    )
}