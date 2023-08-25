import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { orederService } from '../services/order.service'
import { useEffect, useState } from 'react'
import { userService } from '../services/user.service'
import { loadStays } from '../store/stay.actions'
import { socketService } from '../services/socket.service'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { TripMobile } from '../cmps/trip-mobile'
import { Fragment } from 'react'

export function Trip() {
    const navigate = useNavigate()
    const stays = useSelector((storeState) => storeState.stayModule.stays)
    const userLogged = useSelector((storeState) => storeState.userModule.user)
    const [users, setUsers] = useState([])
    const [orders, setOrders] = useState([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await userService.getUsers()
                setUsers(users)
            } catch (error) {
                console.log('Error fetching users:', error)
            }
        }

        // Real time update order
        socketService.on('order-status-change', async (newOrder) => {
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
            const userOrders = await orederService.getOrderByBuyer(
                userLogged._id
            )
            setOrders(userOrders.reverse())
        } catch (error) {
            console.log('Error fetching orders:', error)
        }
    }

    // Function to format the check-in and check-out dates
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    // Function to get the approval status
    const getApprovalStatus = (isApproved) => {
        return isApproved ? 'Approved' : 'Pending'
    }

    function getHostsInfo(hostId) {
        if (users.length) {
            const host = users.find((user) => user._id === hostId)
            return { img: host.imgUrl, name: host.fullname }
        }
    }

    function getStayNights(stayId, totalPrice) {
        const stay = stays.find((stay) => stay._id === stayId)
        return parseInt(totalPrice / stay?.price)
    }

    const columns = [
        { id: 'host', label: 'Host', minWidth: 100 },
        { id: 'stay', label: 'Stay', minWidth: 100 },
        { id: 'date', label: 'Dates', minWidth: 100 },
        { id: 'night', label: 'Nights', minWidth: 40 },
        { id: 'guest', label: 'Guests', minWidth: 40 },
        { id: 'price', label: 'Total Price', minWidth: 40 },
        { id: 'status', label: 'Status', minWidth: 100 },
    ]

    if (!stays || !stays.length || !users || !users.length)
        return (
            <div className="loader flex align-center justify-center">
                <img
                    src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1686751739/home-marker_ovo9yb.svg"
                    alt="loader"
                />
            </div>
        )

    return (
        <>
            {userLogged ? (
                <div className="trip-container">
                    <h1>Welcome back, {userLogged.fullname}</h1>
                    <h2>Trips</h2>
                    {orders && orders.length ? (
                        <>
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                <TableContainer>
                                    <Table
                                        stickyHeader
                                        aria-label="sticky table"
                                        className="trip-table"
                                    >
                                        <TableHead>
                                            <TableRow>
                                                {columns.map((column) => (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{
                                                            minWidth:
                                                                column.minWidth,
                                                        }}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {orders &&
                                                orders
                                                    .slice(
                                                        page * rowsPerPage,
                                                        page * rowsPerPage +
                                                            rowsPerPage
                                                    )
                                                    .map((order) => {
                                                        const hostInfo =
                                                            getHostsInfo(
                                                                order.hostId
                                                            )
                                                        const currStay =
                                                            stays.find(
                                                                (stay) =>
                                                                    stay._id ===
                                                                    order.stayId
                                                            )
                                                        if (!currStay) return
                                                        return (
                                                            <TableRow
                                                                hover
                                                                role="checkbox"
                                                                tabIndex={-1}
                                                                key={order._id}
                                                            >
                                                                <TableCell>
                                                                    {hostInfo && (
                                                                        <div className="host flex align-center">
                                                                            <img
                                                                                src={
                                                                                    hostInfo.img
                                                                                }
                                                                                alt="host"
                                                                            />

                                                                            <span>
                                                                                {
                                                                                    hostInfo.name
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                </TableCell>

                                                                <TableCell>
                                                                    {!!stays.length &&
                                                                        stays.find(
                                                                            (
                                                                                stay
                                                                            ) =>
                                                                                stay._id ===
                                                                                order.stayId
                                                                        )?.name}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {formatDateRange(
                                                                        order
                                                                            .info
                                                                            .checkin,
                                                                        order
                                                                            .info
                                                                            .checkout
                                                                    )}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {getStayNights(
                                                                        order.stayId,
                                                                        order
                                                                            .info
                                                                            .price
                                                                    )}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {
                                                                        order
                                                                            .info
                                                                            .guests
                                                                    }
                                                                </TableCell>
                                                                <TableCell>
                                                                    $
                                                                    {
                                                                        order
                                                                            .info
                                                                            .price
                                                                    }
                                                                </TableCell>
                                                                <TableCell
                                                                    className={
                                                                        order.isApproved
                                                                            ? 'approved'
                                                                            : 'pending'
                                                                    }
                                                                >
                                                                    {getApprovalStatus(
                                                                        order.isApproved
                                                                    )}
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 100]}
                                    component="div"
                                    count={orders.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={
                                        handleChangeRowsPerPage
                                    }
                                />
                            </Paper>
                            <TripMobile
                                stays={stays}
                                orders={orders}
                                users={users}
                                userLogged={userLogged}
                                getStayNights={getStayNights}
                                getHostsInfo={getHostsInfo}
                                getApprovalStatus={getApprovalStatus}
                                formatDateRange={formatDateRange}
                            />
                        </>
                    ) : (
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
                    )}
                </div>
            ) : (
                navigate('/')
            )}
        </>
    )
}
