import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { ImgUploader } from '../cmps/img-uploader'
import { loadStays } from '../store/stay.actions'

export function LoginSignup(props) {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        fullname: '',
    })
    const [isSignup, setIsSignup] = useState(false)
    const [users, setUsers] = useState([])

    useEffect(() => {
        loadUsers()
    }, [])

    async function loadUsers() {
        const users = await userService.getUsers()
        // Custom sort order
        const customSortOrder = [
            "Jennifer", "Andre", "Rina", "Tarek", "Maria", "Sarah", "Andrew", "Marcos", "Shannon", "Jorge",
            "Samantha", "Danny", "Samuel", "Laurinda Nunes", "Nicole", "Ana Lúcia", "Branca", "Núria",
            "Alan & Catherine", "Tomás", "José"
        ]

        // Sort users based on the custom order
        const sortedUsers = users.sort((a, b) => {
            return customSortOrder.indexOf(a.fullname) - customSortOrder.indexOf(b.fullname)
        })

        setUsers(sortedUsers)
    }

    function clearState() {
        setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
        setIsSignup(false)
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    function onLogin(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username) return
        props.onLogin(credentials)
        clearState()
    }

    function onSignup(ev = null) {
        if (ev) ev.preventDefault()
        if (
            !credentials.username ||
            !credentials.password ||
            !credentials.fullname
        )
            return
        props.onSignup(credentials)
        clearState()
    }

    function toggleSignup() {
        setIsSignup(!isSignup)
    }

    function onUploaded(imgUrl) {
        setCredentials({ ...credentials, imgUrl })
    }

    return (
        <div className="login-page">
            <div className="login-signup-container">
                <div className="link" onClick={toggleSignup}>
                    {!isSignup ? 'Sign up' : 'Log in'}
                </div>
            </div>
            {!isSignup && (
                <form className="login-form" onSubmit={onLogin}>
                    <button className="btn-login"> Log in </button>

                    <select
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                    >
                        <option value="">Select demo user</option>
                        {users.map((user) => (
                            <option key={user._id} value={user.username}>
                                {user.fullname}
                            </option>
                        ))}
                    </select>
                    {/* <input
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Username"
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    /> */}
                </form>
            )}
            <div className="signup-section">
                {isSignup && (
                    <form className="signup-form" onSubmit={onSignup}>
                        <input
                            type="text"
                            name="fullname"
                            value={credentials.fullname}
                            placeholder="Fullname"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            placeholder="Username"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                        <ImgUploader onUploaded={onUploaded} />
                        <button>Sign up</button>
                    </form>
                )}
            </div>
        </div>
    )
}
