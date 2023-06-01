import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './login-signup.jsx'
import { useEffect, useRef, useState } from 'react'
import { HeaderFilter } from './header-filter'

export function AppHeader() {

    const user = useSelector(storeState => storeState.userModule.user)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const modalRef = useRef(null)

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsModalOpen(false)
            }
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
        console.log(isModalOpen)
        setIsModalOpen(!isModalOpen)
    }
    function onSetFilter() {
        console.log('hi')
    }
    return (
        <header className="app-header full main-layout">
            <div className="app-header-inner-container flex space-between align-center">
                <div className="main-logo">
                    <h1> AirBBB </h1>
                </div>

                <section className="header-search-bar-container">
                    <HeaderFilter onSetFilter={onSetFilter} />
                </section>
                
                <nav>
                    <NavLink to="/"> Home</NavLink>
                    <NavLink to="/stay"> Stay </NavLink>
                    <NavLink to="/review"> Reviews </NavLink>
                    <NavLink to="/chat"> Chat </NavLink>
                    <NavLink to="/about" > About </NavLink>
                    <NavLink to="/admin"> Admin </NavLink>
                </nav>

                {isModalOpen && <div className="login-signup-container" ref={modalRef}>
                    {user &&
                        <span className="user-info">
                            <NavLink to={`user/${user._id}`}>
                                {user.imgUrl && <img src={user.imgUrl} alt='' />}
                                {user.fullname}
                            </NavLink>
                            <span className="score">{user.score?.toLocaleString()}</span>
                            <button onClick={onLogout}>Logout</button>
                        </span>
                    }
                    {!user &&
                        <section className="user-info">
                            <LoginSignup onLogin={onLogin} onSignup={onSignup} />
                        </section>
                    }
                </div>}
                <button onClick={() => { onToggleUserModal() }}>Sign</button>
            </div>
        </header>
    )
}