import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import React, { useEffect, useRef, useState } from 'react'

import { HeaderFilter } from './header-filter'
import { LoginSignup } from './login-signup.jsx'
import menu from '../assets/img/menu.svg'
import { login, logout, signup } from '../store/user.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { DetailsAnchorHeader } from './details-anchor-header'

export function AppHeader() {

    const user = useSelector(storeState => storeState.userModule.user)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const isDetailsShown = useSelector(storeState => storeState.systemModule.isDetailsShown)
    const [isAnchor, setIsAnchor] = useState(false)
    const modalRef = useRef(null)

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsModalOpen(false)
            }
        }

        const headerObserver = new IntersectionObserver(updateHeader);

        const gallery = document.querySelector('.details-gallery');

        if (gallery) {
            headerObserver.observe(gallery);
        }

        // console.log('gallery!!!!!!!', gallery)
        function updateHeader(entries) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) setIsAnchor(true)
                if (entry.isIntersecting) setIsAnchor(false)
            })
        }

        window.addEventListener('mousedown', handleOutsideClick)

        return () => {
            window.removeEventListener('mousedown', handleOutsideClick)
        }



    }, [])

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
        // console.log(isModalOpen)
        setIsModalOpen(!isModalOpen)
        // if (!isModalOpen) setIsModalOpen(!isModalOpen)
    }

    function onSetFilter() {
        console.log('hi from onSetFilter ')
    }

    return (
        <React.Fragment>
            {isAnchor &&
                <DetailsAnchorHeader />
            }
            {!isAnchor &&
                <header className={`app-header full ${isDetailsShown ? 'details-main-layout' : 'main-layout'}`}>
                    <div className="app-header-inner-container flex space-between align-center">
                        <div className="main-logo">
                            <NavLink to="/" >
                                <div className='main-logo-container flex align-center'>
                                    <img src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685912254/logo-img_tdtnc7.svg" alt="" />
                                    <h2> airbbb </h2>
                                </div>
                            </NavLink>
                        </div>

                        <section className="header-search-bar-container">
                            <HeaderFilter onSetFilter={onSetFilter} isDetailsShown={isDetailsShown} />
                        </section>

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
                                                <NavLink to={`user/${user._id}`} className='user-container'>
                                                    {user.imgUrl && <img src={user.imgUrl} alt='user' onError={ev => ev.target.src = 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1686066256/user_jsqpzw.png'} />}
                                                    {user.fullname}
                                                </NavLink>
                                                {/* <span className="score">{user.score?.toLocaleString()}</span> */}
                                                <NavLink to='#'> Messeges </NavLink>
                                                <NavLink to='#'> Trips </NavLink>
                                                <NavLink to='#'> Whishlist </NavLink>
                                                <NavLink to='#'> Dashboard </NavLink>
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
            }
        </React.Fragment>
    )
}