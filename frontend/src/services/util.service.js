export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    debounce,
    randomPastTime,
    saveToStorage,
    loadFromStorage,
    getLorem,
    getRandomNames,
    getIcon,
    getMonth
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}


function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    // const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : null
}

function getLorem() {
    return 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt eum quaerat eligendi amet asperiores repudiandae itaque excepturi nam cupiditate omnis, eos saepe veritatis dicta necessitatibus delectus ratione consectetur accusamus? Laboriosam.'
}

function getMonth(timestamp) {
    const date = new Date(timestamp)
    const formattedDate = date.toLocaleString('en-US', { month: 'short', day: 'numeric' })
    return formattedDate // Output: Jun 7
}

function getRandomNames() {
    return [
        'Baba Jom',
        'John Doe',
        'Alice Smith',
        'David Johnson',
        'Emma Brown',
        'Michael Davis',
        'Olivia Wilson',
        'James Martinez',
        'Sophia Anderson',
        'William Taylor'
    ]
}

function getIcon(name) {
    const iconMap = {
        'TV': 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685879904/tv_unkhyq.svg',
        'Private pool': 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685879992/pool_tgak7m.svg',
        'Garden': 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685880112/garden_d7ewbt.svg',
        'Air conditioning': 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685880185/air-conditioner_dxhewv.svg',
        'Breakfast included': 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685880255/breakfast_kdnda7.svg',
        'Beach access': 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796924/labels-airbnb/beachfront_fh5txx.png',
        'Fireplace': 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685880508/fire-place_umdse2.svg',
        'Scenic views': 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685880593/view_jtcevr.svg',
        'Pet-friendly': 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685880694/pet_lhxnii.svg',
        'Gym access': 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685880742/gym_vbbavo.svg',
        'Central location': 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685880892/location_h091hi.svg',
        'Wifi': 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685880952/wifi_pao7bq.svg',
        'Kitchen': 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685881015/kitchen_xn7hvl.svg',
        'Smoking allowed': 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685881096/smoking_zksaef.svg',
        'Cooking basics': 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685881161/cooking_vwvec9.svg'
    }
    return iconMap[name]
}