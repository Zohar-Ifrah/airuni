import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router'
import { useSelector } from 'react-redux'

import { UserMsg } from './cmps/user-msg'
import routes from './routes'
import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { UserDetails } from './pages/user-details'
import { LabelsFilter } from './cmps/labels-filter'
import { useShouldShow } from './customHooks/useShouldShow'
import { socketService } from './services/socket.service'
import { showSuccessMsg } from './services/event-bus.service'
import { NavFooterMobile } from './cmps/nav-footer-mobile'

export function RootCmp() {
    const isDetailsShown = useSelector(
        (storeState) => storeState.systemModule.isDetailsShown
    )
    const isHomeShown = useShouldShow('/')
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        socketService.on('get-new-order', (order) => {
            showSuccessMsg('You got new order')
        })

        socketService.on('order-status-change', (order) => {
            showSuccessMsg('Your order has been Approved!')
        })

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 1100)
    }

    return (
        <>
            <UserMsg />
            <div
                className={`main-app ${
                    isDetailsShown ? 'details-main-layout' : 'main-layout'
                }`}
            >
                {!isMobile ||
                (window.location.pathname !== '/wishlist' &&
                    window.location.pathname !== '/trip' &&
                    window.location.pathname !== '/dashboard' &&
                    !isDetailsShown) ? (
                    <AppHeader />
                ) : (
                    <header></header>
                )}
                {isHomeShown && <LabelsFilter />}
                <main
                    className={`full ${
                        isDetailsShown ? 'details-main-layout' : 'main-layout'
                    }`}
                >
                    <Routes>
                        {routes.map((route) => (
                            <Route
                                key={route.path}
                                exact={true}
                                element={route.component}
                                path={route.path}
                            />
                        ))}
                        <Route path="user/:id" element={<UserDetails />} />
                    </Routes>
                </main>
                <NavFooterMobile />
                <AppFooter />
            </div>
        </>
    )
}
