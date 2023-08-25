import { Fragment } from 'react'

export function TripMobile({
    stays,
    orders,
    users,
    userLogged,
    getStayNights,
    getHostsInfo,
    getApprovalStatus,
    formatDateRange,
}) {
    return (
        <section className="trip-mobile-container">
            <ul className="trip-mobile-inner-container flex column">
                {orders.map((order) => {
                    const currStay = stays.find(
                        (stay) => stay._id === order.stayId
                    )
                    if (!currStay) return
                    return (
                        <Fragment key={order._id}>
                            <li
                                key={order._id}
                                className="order-preview flex column"
                            >
                                <div className="stay-name-dates flex space-between">
                                    <span className="stay-name">
                                        {
                                            stays.find(
                                                (stay) =>
                                                    stay._id === order.stayId
                                            )?.name
                                        }
                                    </span>
                                    <span className="stay-dates">
                                        {formatDateRange(
                                            order.info.checkin,
                                            order.info.checkout
                                        )}
                                    </span>
                                </div>
                                <div className="order-content flex space-between">
                                    <div className="host flex column space-between">
                                        <img
                                            src={getHostsInfo(order.hostId).img}
                                            alt="host"
                                        />
                                        <span>
                                            {getHostsInfo(order.hostId).name}
                                        </span>
                                    </div>

                                    <div className="nights-guests flex column space-between">
                                        <span className="nights">
                                            Nights{' '}
                                            <span>
                                                {getStayNights(
                                                    order.stayId,
                                                    order.info.price
                                                )}
                                            </span>
                                        </span>
                                        <span className="guests">
                                            Guests{' '}
                                            <span>{order.info.guests}</span>
                                        </span>
                                    </div>

                                    <div className="status-total-price flex column space-between">
                                        <span className="price">
                                            ${order.info.price}
                                        </span>
                                        <span
                                            className={
                                                order.isApproved
                                                    ? 'approved'
                                                    : 'pending'
                                            }
                                        >
                                            {order.isApproved
                                                ? 'Approved'
                                                : 'Pending'}
                                        </span>
                                    </div>
                                </div>
                            </li>
                            <hr />
                        </Fragment>
                    )
                })}
            </ul>
        </section>
    )
}
