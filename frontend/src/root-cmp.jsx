import React, { useEffect, useReducer, useRef } from 'react'
import { Routes, Route } from 'react-router'
import { useLocation } from 'react-router-dom'

import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { UserDetails } from './pages/user-details'
import { ConfirmOrder } from './pages/confirm-order'
import { useSelector } from 'react-redux'
import { LabelsFilter } from './cmps/labels-filter'
import { useShouldShow } from './customHooks/useShouldShow'

export function RootCmp() {

    const isDetailsShown = useSelector(storeState => storeState.systemModule.isDetailsShown)

    const isHomeShown = useShouldShow('/')

    console.log(isHomeShown)

    return (
        <div className={`main-app ${(isDetailsShown) ? 'details-main-layout' : 'main-layout'}`}>
            <AppHeader />
            {isHomeShown && <LabelsFilter />}
            <main>
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    <Route path="user/:id" element={<UserDetails />} />
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


