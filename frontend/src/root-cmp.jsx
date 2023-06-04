import React from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { UserDetails } from './pages/user-details'
import { ConfirmOrder } from './pages/confirm-order'
import { useSelector } from 'react-redux'

export function RootCmp() {

    const isDetailsShown = useSelector(storeState => storeState.systemModule.isDetailsShown)

    return (
        <div className={`main-app ${(isDetailsShown) ? 'details-main-layout' : 'main-layout'}`}>
            <AppHeader />
            <main>
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    <Route path="user/:id" element={<UserDetails />} />
                    <Route path="details/:stayId/confirm" element={<ConfirmOrder />} />
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


