import { storageService } from './async-storage.service'
import { utilService } from './util.service'
// import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const USER_KEY = 'user_db'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    changeScore,
    getRandomUser
}

window.userService = userService


function getUsers() {
    return storageService.query('user')
    // return httpService.get(`user`)
}



async function getById(userId) {
    const user = await storageService.get('user', userId)
    // const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    return storageService.remove('user', userId)
    // return httpService.delete(`user/${userId}`)
}

async function update({ _id, score }) {
    const user = await storageService.get('user', _id)
    user.score = score
    await storageService.put('user', user)

    // const user = await httpService.put(`user/${_id}`, {_id, score})
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    const users = await storageService.query('user')
    const user = users.find(user => user.username === userCred.username)
    // const user = await httpService.post('auth/login', userCred)
    if (user) {
        return saveLocalUser(user)
    }
}
async function signup(userCred) {
    userCred.score = 10000
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await storageService.post('user', userCred)
    // const user = await httpService.post('auth/signup', userCred)
    return saveLocalUser(user)
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // return await httpService.post('auth/logout')
}

async function changeScore(by) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    user.score = user.score + by || by
    await update(user)
    return user.score
}


function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}


// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()

const userImgs = [
    'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685891291/host1_cxwcp3.jpg',
    'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685891290/host2_xqgyw5.jpg',
    'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685891290/host3_njxd3x.jpg',
    'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685891290/host4_uczapd.jpg',
    'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685891291/host5_ikyxsm.jpg',
    'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685891290/host6_cw372a.jpg',
    'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685891291/host7_tasj1f.jpg'
]

function getRandomUser() {
    const users = utilService.loadFromStorage(USER_KEY)
    return users[utilService.getRandomIntInclusive(0, users.length - 1)]
}

function _createRandomUsers() {
    return utilService.getRandomNames().map(name => {
        return _createRandomUser(name)
    })
}

function _createRandomUser(name) {
    return {
        _id: utilService.makeId(),
        fullname: name,
        imgUrl: userImgs[utilService.getRandomIntInclusive(0, userImgs.length - 1)]
    }
}

; (() => {
    let users = utilService.loadFromStorage(USER_KEY) || []
    if (!users.length) {
        users = _createRandomUsers()
        utilService.saveToStorage(USER_KEY, users)
    }
})()