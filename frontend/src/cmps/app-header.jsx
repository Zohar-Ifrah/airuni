import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import React, { useEffect, useRef, useState } from 'react'

import { HeaderFilter } from './header-filter'
import { LoginSignup } from './login-signup.jsx'
import menu from '../assets/img/menu.svg'
import { login, logout, signup } from '../store/user.actions.js'
import { eventBus, showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { DetailsAnchorHeader } from './details-anchor-header'
import { useShouldShow } from '../customHooks/useShouldShow'

export function AppHeader() {

    const user = useSelector(storeState => storeState.userModule.user)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const isDetailsShown = useSelector(storeState => storeState.systemModule.isDetailsShown)
    const [isAnchor, setIsAnchor] = useState(false)
    const modalRef = useRef(null)
    // const isDetailsShown = useShouldShow('/details/')
    const isHomeShown = useShouldShow('/')
    const unsubscribe = eventBus.on('details-load', setObserver)
    const users = useSelector(storeState => storeState.userModule.users)
    const isHostRef = useRef()
    const [isHeaderClicked, setIsHeaderClicked] = useState(false)

    useEffect(() => {
        if (user) {
            isHostRef.current = users.find(currUser =>
                currUser._id === user._id)
            console.log('isHostRef:', isHostRef.current)
        }
        const handleOutsideClick = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsModalOpen(false)
            }
        }

        // const headerObserver = new IntersectionObserver(updateHeader)

        window.addEventListener('mousedown', handleOutsideClick)

        return () => {
            window.removeEventListener('mousedown', handleOutsideClick)
            unsubscribe()
        }


        // eslint-disable-next-line 
    }, [user, isHostRef.current])

    function updateHeader(entries) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) setIsAnchor(true)
            if (entry.isIntersecting) setIsAnchor(false)
        })
    }

    function setObserver(elRef) {
        const headerObserver = new IntersectionObserver(updateHeader)

        headerObserver.observe(elRef.current)

    }

    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }

    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot signup')
        }
    }

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    function onToggleUserModal() {
        setIsModalOpen(!isModalOpen)
    }

    function onSetFilter() {
        console.log('hi from onSetFilter ')
    }

    function onHeaderClick(event) {
        const targetClassName = event.target.className
        console.log('targetClassName: ', targetClassName)
        if (/app-header-.+/.test(targetClassName)) {

            setIsHeaderClicked(true)
            setTimeout(() => {
                setIsHeaderClicked(false)
            }, 300)
        }
    }

    return (
        <>
            {isAnchor && isDetailsShown &&
                <DetailsAnchorHeader />
            }
            <header className={`app-header full ${isDetailsShown ? 'details-main-layout relative' : 'main-layout'}`}
                onClick={onHeaderClick}>
                <div className="app-header-inner-container flex space-between align-center">
                    <div className="main-logo">
                        <NavLink to="/" >
                            <div className='main-logo-container flex align-center'>
                                <img src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685912254/logo-img_tdtnc7.svg" alt="" />
                                <h2> airbbb </h2>
                            </div>
                        </NavLink>
                    </div>


                    {/* {console.log('isDetailsShown: ', isDetailsShown)} */}
                    {/* {console.log('isHomeShown: ', isHomeShown)} */}

                    {isDetailsShown ?
                        <section className="header-search-bar-container">
                            <HeaderFilter onSetFilter={onSetFilter}
                                isDetailsShown={isDetailsShown}
                                isHeaderClicked={isHeaderClicked} />
                        </section>
                        : isHomeShown &&
                        <section className="header-search-bar-container">
                            <HeaderFilter onSetFilter={onSetFilter}
                                isDetailsShown={isDetailsShown}
                                isHeaderClicked={isHeaderClicked} />
                        </section>
                    }

                    {/* {isModalOpen &&
                    <nav>
                        <NavLink to="/"> Home</NavLink>
                        <NavLink to="/stay"> Stay </NavLink>
                        <NavLink to="/review"> Reviews </NavLink>
                        <NavLink to="/chat"> Chat </NavLink>
                        <NavLink to="/about" > About </NavLink>
                        <NavLink to="/admin"> Admin </NavLink>
                    </nav>
                } */}

                    <div className='login-signup-btn-container'>

                        <div className='inner-login-signup-btn-container' onClick={() => { onToggleUserModal() }}>

                            <img className='menu-svg' src={menu} alt="menu" />

                            <img className='acc-svg'
                                src={user ? user.imgUrl : 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1686066256/user_jsqpzw.png'}
                                alt="user"
                                onError={ev =>
                                    ev.target.src = 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1686066256/user_jsqpzw.png'} />

                        </div>

                        {isModalOpen && <nav>
                            <div className="login-signup-container" ref={modalRef}>
                                {user &&
                                    <span className="user-info">
                                        <div className='user-info-content-container'>
                                            <NavLink to='#'> Messeges </NavLink>
                                            <NavLink to='/trip'> Trips </NavLink>
                                            <NavLink to='/wishlist'> Whishlist </NavLink>
                                            <hr />
                                            {/* {console.log('isHostRef!!!!', isHostRef.current.isSuperhost)}
                                            {isHostRef.current && isHostRef.current.isSuperhost &&  */}
                                            {<NavLink to='/dashboard'> Dashboard </NavLink>}
                                            <button onClick={onLogout}>Log out</button>
                                        </div>
                                    </span>
                                }
                                {!user &&
                                    <section className="user-info">
                                        <LoginSignup onLogin={onLogin} onSignup={onSignup} />
                                    </section>
                                }
                            </div>
                        </nav>}
                    </div>

                    {/* <button onClick={() => { onToggleUserModal() }}>Sign</button> */}
                </div>
            </header>
        </>
    )
}