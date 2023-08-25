import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { orederService } from '../services/order.service'
import { useEffect, useState } from 'react'
import { userService } from '../services/user.service'
import { loadStays } from '../store/stay.actions'
import { socketService } from '../services/socket.service'
import { utilService } from '../services/util.service'

export function Dashboard() {
    const navigate = useNavigate()
    const stays = useSelector((storeState) => storeState.stayModule.stays)
    const userLogged = useSelector((storeState) => storeState.userModule.user)
    const [users, setUsers] = useState([])
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await userService.getUsers()
                setUsers(users)
            } catch (error) {
                console.log('Error fetching users:', error)
            }
        }

        // Real time update orders
        socketService.on('get-new-order', async (order) => {
            await fetchOrders()
        })

        fetchUsers()

        loadStays()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (userLogged) {
            fetchOrders()
        }
        // eslint-disable-next-line
    }, [userLogged])

    async function fetchOrders() {
        try {
            const userOrders = await orederService.getOrderByHost(
                userLogged._id
            )
            setOrders(userOrders.reverse())
            // setHost(getHost(userOrders[0].hostId))
        } catch (error) {
            console.log('Error fetching orders:', error)
        }
    }
    // Function to format the check-in and check-out dates
    // eslint-disable-next-line
    const formatDateRange = (checkin, checkout) => {
        const checkinDate = new Date(checkin)
        const checkoutDate = new Date(checkout)

        const formattedCheckin = `${checkinDate.toLocaleString('en-US', {
            month: 'short',
        })} ${checkinDate.getDate()}`
        const formattedCheckout = `${checkoutDate.toLocaleString('en-US', {
            month: 'short',
        })} ${checkoutDate.getDate()}`

        return `${formattedCheckin} - ${formattedCheckout}`
    }

    // Function to get the approval status
    // eslint-disable-next-line
    const getApprovalStatus = (isApproved) => {
        return isApproved ? 'Approved' : 'Pending'
    }

    function getGuestInfo(buyerId) {
        if (users.length) {
            const buyer = users.find((user) => user._id === buyerId)
            return { img: buyer.imgUrl, name: buyer.fullname }
        }
    }

    async function handelOrder(order) {
        const orderToUpdate = { ...order, isApproved: true }
        try {
            await orederService.update(orderToUpdate)
            await fetchOrders()
        } catch (error) {
            console.log('Error updating order:', error)
        }
    }

    if (!stays || !stays.length || !users || !users.length)
        return (
            <div className="loader flex align-center justify-center">
                <img
                    src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1686751739/home-marker_ovo9yb.svg"
                    alt="loader"
                />
            </div>
        )

    if (!orders || !orders.length)
        return (
            <>
                {userLogged ? (
                    <section className="dashboard">
                        <h2>You have no orders!</h2>
                    </section>
                ) : (
                    navigate('/')
                )}
            </>
        )

    return (
        <>
            {userLogged ? (
                <section className="dashboard">
                    <h1>Welcome back, {userLogged.fullname}</h1>
                    <h3>Your orders</h3>

                    <ul className="order-list">
                        {orders.length &&
                            stays.length &&
                            orders.map((order) => {
                                const currStay = stays.find(
                                    (stay) => stay._id === order.stayId
                                )
                                if (!currStay) return
                                const buyer = getGuestInfo(order.buyerId)
                                return (
                                    <li key={order._id}>
                                        <article className="order-preview">
                                            <section className="header">
                                                <img src={buyer.img} alt="" />
                                                <p>{buyer.name}</p>
                                            </section>
                                            <section className="body">
                                                <p>{currStay?.name}</p>
                                                <p>
                                                    {utilService.timeAgo(
                                                        order.createdAt
                                                    )}
                                                </p>
                                            </section>
                                            <section className="footer">
                                                <p className="price">
                                                    {order.info.price}$
                                                </p>
                                                <button
                                                    disabled={order.isApproved}
                                                    onClick={() =>
                                                        handelOrder(order)
                                                    }
                                                    className={
                                                        order.isApproved
                                                            ? 'approved'
                                                            : 'pending'
                                                    }
                                                >
                                                    {order.isApproved
                                                        ? 'Approved'
                                                        : 'Pending'}
                                                </button>
                                            </section>
                                        </article>
                                    </li>
                                )
                            })}
                    </ul>

                    {/* {orders.length && orders.length ? 
                       
                                {orders.map(order => {
                                    const guestInfo = getGuestInfo(order.buyerId)
                                    return (
                                        <tr key={order._id}>
                                            {guestInfo && (
                                                <td>
                                                    <img
                                                        src={guestInfo.img}
                                                        alt='guest'
                                                    />
                                                    <p>{guestInfo.name}</p>
                                                </td>
                                            )}
                                            <td>
                                                <img
                                                    src={
                                                        stays.find(
                                                            stay =>
                                                                stay.host ===
                                                                order.hostId
                                                        )?.imgUrls[0]
                                                    }
                                                    alt='stay'
                                                />{' '}
                                            </td>
                                            <td>
                                                {formatDateRange(
                                                    order.info.checkin,
                                                    order.info.checkout
                                                )}
                                            </td>
                                            <td>${order.info.price}</td>
                                            <td>
                                                {getApprovalStatus(
                                                    order.isApproved
                                                )}
                                            </td>
                                            <td>
                                                <button
                                                    className='accept-btn'
                                                    onClick={() =>
                                                        handelOrder(order, true)
                                                    }
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    className='reject-btn'
                                                    onClick={() =>
                                                        handelOrder(
                                                            order,
                                                            false
                                                        )
                                                    }
                                                >
                                                    Reject
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                         
                     : (
                        <div>
                            <h3>No trips booked...yet!</h3>
                            <p>
                                Time to dust off your bags and start planning
                                your next adventure
                            </p>
                            <button onClick={() => navigate('/')}>
                                Start searching
                            </button>
                        </div>
                    )} */}
                </section>
            ) : (
                navigate('/')
            )}
        </>
    )
}
