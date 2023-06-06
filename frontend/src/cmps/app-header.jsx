import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './login-signup.jsx'
import { useEffect, useRef, useState } from 'react'
import { HeaderFilter } from './header-filter'
import menu from '../assets/img/menu.svg'
import acc from '../assets/img/acc.svg'
export function AppHeader() {

    const user = useSelector(storeState => storeState.userModule.user)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const isDetailsShown = useSelector(storeState => storeState.systemModule.isDetailsShown)
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

        console.log('gallery!!!!!!!', gallery)

        window.addEventListener('mousedown', handleOutsideClick)

        function updateHeader(entries) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) console.log('helllloooo!!!!!!!')
            });
        }

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
        <header className={`app-header full ${isDetailsShown ? 'details-main-layout' : 'main-layout'}`}>
            <div className="app-header-inner-container flex space-between align-center">
                <div className="main-logo">
                    <NavLink to="/stay">
                        <div className='main-logo-container flex align-center'>
                            <img src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685912254/logo-img_tdtnc7.svg" alt="" />
                            <h2> airbbb </h2>
                        </div>
                    </NavLink>
                </div>

                <section className="header-search-bar-container">
                    <HeaderFilter onSetFilter={onSetFilter} />
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
                <div className='login-signup-btn-container' onClick={() => { onToggleUserModal() }}>
                    <img className='menu-svg' src={menu} alt="menu" />
                    <img className='acc-svg' src={acc} alt="account" />
                </div>
                {/* <button onClick={() => { onToggleUserModal() }}>Sign</button> */}
            </div>
        </header>
    )
}