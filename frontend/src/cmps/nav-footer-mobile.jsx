import { NavLink } from 'react-router-dom'
import { login, logout, signup } from '../store/user.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { useSelector } from 'react-redux'
import { LoginSignup } from './login-signup'
import { useState } from 'react'

export function NavFooterMobile() {
    const user = useSelector((storeState) => storeState.userModule.user)
    const [isLoginSignupShown, setIsLoginSignupShown] = useState(false)

    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
            setIsLoginSignupShown(
                (prevIsLoginSignupShown) => !prevIsLoginSignupShown
            )
        } catch (err) {
            showErrorMsg('Cannot login')
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

    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.fullname}`)
            setIsLoginSignupShown(
                (prevIsLoginSignupShown) => !prevIsLoginSignupShown
            )
        } catch (err) {
            showErrorMsg('Cannot signup')
        }
    }

    return (
        <nav className="nav-footer-mobile full details-main-layout">
            <div className="nav-footer-inner-container flex align-center space-between">
                <NavLink to="/">
                    <div className="flex column align-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                            role="presentation"
                            focusable="false"
                            style={{
                                display: 'block',
                                fill: 'none',
                                height: '24px',
                                width: '24px',
                                stroke: 'currentcolor',
                                strokeWidth: 4,
                                overflow: 'visible',
                            }}
                        >
                            <path
                                fill="none"
                                d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"
                            ></path>
                        </svg>
                        <span>Explore</span>
                    </div>
                </NavLink>
                <NavLink to="/wishlist">
                    <div className="flex column align-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                            role="presentation"
                            focusable="false"
                            style={{
                                display: 'block',
                                fill: 'none',
                                height: '24px',
                                width: '24px',
                                stroke: 'currentcolor',
                                strokeWidth: 2.66667,
                                overflow: 'visible',
                            }}
                        >
                            <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
                        </svg>
                        <span>Wishlist</span>
                    </div>
                </NavLink>
                {user && (
                    <NavLink to="/trip">
                        <div className="flex column align-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                aria-hidden="true"
                                role="presentation"
                                focusable="false"
                                style={{
                                    display: 'block',
                                    height: '24px',
                                    width: '24px',
                                    fill: 'currentcolor',
                                }}
                            >
                                <path d="M16 1c2 0 3.46.96 4.75 3.27l.53 1.02a424.58 424.58 0 0 1 7.1 14.84l.15.35c.67 1.6.9 2.48.96 3.4v.41l.01.23c0 4.06-2.88 6.48-6.36 6.48-2.22 0-4.55-1.26-6.7-3.39l-.26-.26-.17-.17h-.02l-.17.18c-2.05 2.1-4.27 3.42-6.42 3.62l-.28.01-.26.01c-3.48 0-6.36-2.42-6.36-6.48v-.47c.03-.93.23-1.77.83-3.24l.22-.53c.97-2.3 6.08-12.98 7.7-16.03C12.55 1.96 14 1 16 1zm0 2c-1.24 0-2.05.54-2.99 2.21l-.52 1a422.57 422.57 0 0 0-7.03 14.7l-.35.84a6.86 6.86 0 0 0-.6 2.24l-.01.33v.2C4.5 27.4 6.41 29 8.86 29c1.77 0 3.87-1.24 5.83-3.35-2.3-2.94-3.86-6.45-3.86-8.91 0-2.92 1.94-5.39 5.18-5.42 3.22.03 5.16 2.5 5.16 5.42 0 2.45-1.56 5.96-3.86 8.9 1.97 2.13 4.06 3.36 5.83 3.36 2.45 0 4.36-1.6 4.36-4.48v-.4a7.07 7.07 0 0 0-.72-2.63l-.25-.6C25.47 18.41 20.54 8.12 19 5.23 18.05 3.53 17.24 3 16 3zm.01 10.32c-2.01.02-3.18 1.51-3.18 3.42 0 1.8 1.18 4.58 2.96 7.04l.2.29.18-.24c1.73-2.38 2.9-5.06 3-6.87v-.22c0-1.9-1.17-3.4-3.16-3.42z"></path>
                            </svg>
                            <span>Trips</span>
                        </div>
                    </NavLink>
                )}
                {user && (
                    <NavLink to="/dashboard">
                        <div className="flex column align-center">
                            <img
                                src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1691505525/dashboard_e7twmi.png"
                                alt="dashboard"
                            />
                            <span>Dashboard</span>
                        </div>
                    </NavLink>
                )}
                {user ? (
                    <button
                        className="btn-logout flex column align-center"
                        onClick={onLogout}
                    >
                        <img
                            src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1691507239/logout_ot31ub.png"
                            alt="logout"
                        />
                        <span>Logout</span>
                    </button>
                ) : (
                    <button
                        className="btn-login flex column "
                        onClick={() =>
                            setIsLoginSignupShown(
                                (prevIsLoginSignupShown) =>
                                    !prevIsLoginSignupShown
                            )
                        }
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                            role="presentation"
                            focusable="false"
                            style={{
                                display: 'block',
                                height: '24px',
                                width: '24px',
                                fill: 'currentcolor',
                            }}
                        >
                            <path d="M16 1a15 15 0 1 1 0 30 15 15 0 0 1 0-30zm0 8a5 5 0 0 0-2 9.58v2.1l-.15.03a11 11 0 0 0-6.94 4.59C9.26 27.59 12.46 29 16 29s6.74-1.41 9.09-3.7a11 11 0 0 0-6.93-4.59l-.16-.03v-2.1a5 5 0 0 0 3-4.35V14a5 5 0 0 0-5-5zm0-6A13 13 0 0 0 5.56 23.75a13.02 13.02 0 0 1 5.54-4.3l.35-.13-.02-.02A7 7 0 0 1 9 14.27L9 14a7 7 0 1 1 11.78 5.12l-.23.2.04.02c2.33.88 4.36 2.41 5.85 4.4A13 13 0 0 0 16 3z"></path>
                        </svg>
                        <span>Login</span>
                    </button>
                )}
            </div>
            {isLoginSignupShown && !user && (
                <LoginSignup onLogin={onLogin} onSignup={onSignup} />
            )}
        </nav>
    )
}
