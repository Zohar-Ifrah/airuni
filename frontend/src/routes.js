// import { HomePage } from './pages/home-page.jsx'
import { AboutUs } from './pages/about-us.jsx'
import { StayIndex } from './pages/stay-index.jsx'
import { ReviewIndex } from './pages/review-index.jsx'
import { ChatApp } from './pages/chat-app.jsx'
import { AdminApp } from './pages/admin-app.jsx'
import { StayDetails } from './pages/stay-details.jsx'
import { ConfirmOrder } from './pages/confirm-order.jsx'
import { Wishlist } from './pages/Wishlist.jsx'
import { Trip } from './pages/Trip.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    // {
    //     path: '/',
    //     component: <HomePage />,
    //     label: 'Home 🏠',
    // },
    {
        path: '/',
        component: <StayIndex />,
        label: 'Stays',
    },
    {
        path: 'details/:stayId',
        component: <StayDetails />,
        label: 'details'
    },
    {
        path: 'review',
        component: <ReviewIndex />,
        label: 'Reviews'
    },
    {
        path: 'chat',
        component: <ChatApp />,
        label: 'Chat'
    },
    {
        path: 'about',
        component: <AboutUs />,
        label: 'About us'
    },
    {
        path: 'admin',
        component: <AdminApp />,
        label: 'Admin Only'
    },
    {
        path: 'confirm',
        component: <ConfirmOrder />,
        label: 'Confirm Order'
    },
    {
        path: 'wishlist',
        component: <Wishlist />,
        label: 'Wishlist'
    },
    {
        path: 'trip',
        component: <Trip />,
        label: 'Trips'
    }
]

export default routes