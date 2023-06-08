import { storageService } from './async-storage.service'
import { utilService } from './util.service'
import gUsers from '../data/user.json'
import { httpService } from './http.service'
// import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const USER_KEY = 'user_db'
const API = 'user'

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
    getRandomUser
}

window.userService = userService


function getUsers() {
    // return storageService.query(USER_KEY)
    return httpService.get(API)
}

async function getById(userId) {
    // const user = await storageService.get(USER_KEY, userId)
    const user = await httpService.get(`${API}/${userId}`)
    return user
}

function remove(userId) {
    return storageService.remove(USER_KEY, userId)
    // return httpService.delete(`user/${userId}`)
}

async function update(user) {
    await storageService.put(USER_KEY, user)
    // const user = await httpService.put(`user/${_id}`, {_id, score})
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    // const users = await storageService.query(USER_KEY)
    // const user = users.find(user => user.username === userCred.username)
    const user = await httpService.post('auth/login', userCred)
    if (user) {
        return saveLocalUser(user)
    }
}

async function signup(userCred) {
    // const user = await _signup(userCred)
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await httpService.post('auth/signup', userCred)
    return saveLocalUser(user)
}

// async function _signup({ username, fullname, password }) {
//     const user = getEmptyUser()
//     if (!user.imgUrl) user.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
//     user.password = password
//     user.username = username
//     user.fullname = fullname
//     return await storageService.post(USER_KEY, user)
// }

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return await httpService.post('auth/logout')
}

function getEmptyUser() {
    return {
        fullname: '',
        password: '',
        location: '',
        about: '',
        responseTime: '',
        imgUrl: '',
        isSuperhost: false,
        createdAt: Date.now()
    }
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

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
        imgUrl: 'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small'
    }
}

; (() => {
    let users = utilService.loadFromStorage(USER_KEY) || []
    if (!users.length) {
        users = gUsers
        utilService.saveToStorage(USER_KEY, users)
    }
})()