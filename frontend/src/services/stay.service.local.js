import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { reviewService } from './review.service.js'
import gStays from '../data/stay.json'

const STORAGE_KEY = 'stayDB'

export const stayService = {
    query,
    getById,
    save,
    remove,
    getEmptyStay,
    addStayMsg,
    getDefaultFilter,
    getLabels
}

window.cs = stayService

function query(filterBy) {
    return _filteredStays(filterBy)
}

async function _filteredStays(filterBy) {
    var stays = await storageService.query(STORAGE_KEY)
    if (filterBy.location) {
        const regex = new RegExp(filterBy.location, 'i')
        stays = stays.filter(stay => regex.test(stay.loc.country) || regex.test(stay.loc.city))
    }

    if (filterBy.checkIn) {

        stays = stays.filter(stay =>
            stay.availableDates.some(date => new Date(date.startDate).getTime() >= filterBy.checkIn) &&
            stay.availableDates.some(date => new Date(date.endDate).getTime() <= filterBy.checkOut)
        )
    }

    if (filterBy.adults || filterBy.children) {

        const capacity = filterBy.adults + filterBy.children
        stays = stays.filter(stay => stay.capacity >= capacity)
    }

    if (filterBy.label) {
        stays = stays.filter(stay => stay.labels.some(l => l === filterBy.label))
    }

    // if (filterBy.price) {
    //     stays = stays.filter(stay => stay.price <= filterBy.price)
    // }
    return stays
}

async function _aggregate(stayId) {
    try {
        const stay = await storageService.get(STORAGE_KEY, stayId)
        const hosts = await userService.getUsers()
        const reviews = await reviewService.query()

        const host = hosts.find(host => host._id === stay.host)
        const stayReviews = stay.reviews.map(r => reviews.find(review => review._id === r))

        return {
            ...stay,
            host,
            reviews: stayReviews,
        }
    }
    catch (err) {
        console.log('stayService: Had error aggregating', err.message)
        throw err
    }
}

function getById(stayId) {
    return _aggregate(stayId)
}

async function remove(stayId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, stayId)
}

async function save(stay) {
    var savedStay
    if (stay._id) {
        savedStay = await storageService.put(STORAGE_KEY, stay)
    } else {
        // Later, owner is set by the backend
        stay.owner = userService.getLoggedinUser()
        savedStay = await storageService.post(STORAGE_KEY, stay)
    }
    return savedStay
}

async function addStayMsg(stayId, txt) {
    // Later, this is all done by the backend
    const stay = await getById(stayId)
    if (!stay.msgs) stay.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    stay.msgs.push(msg)
    await storageService.put(STORAGE_KEY, stay)

    return msg
}

function getDefaultFilter() {
    return {
        price: 750,
        txt: '',
        location: '',
        checkIn: '',
        checkOut: '',
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0,
        label: ''
    }
}

function getEmptyStay() {
    return _createRandomStay()

}

function getLabels() {
    const titels = ['Rooms', 'Castles', 'Farms', 'Design', 'Luxe', 'Boats', 'OMG!', 'Beachfront', 'Amazing views', 'Amazing pools', 'Mansions', 'Lakefront', 'Cabins', 'Tropical', 'New', 'Countryside', 'Trending', 'National parks', 'Camping', 'Treehouses', 'Iconic cities']
    const urls = [
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796924/labels-airbnb/rooms_bsse5j.png',
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796924/labels-airbnb/castle_dxrleo.png',
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/farms_l5josl.png',
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796924/labels-airbnb/design_sajmco.png',
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/luxe_eyfxdq.png',
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796922/labels-airbnb/boats_iangpw.png',
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796924/labels-airbnb/omg_zh3l1v.png',
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796924/labels-airbnb/beachfront_fh5txx.png',
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/amazingviews_uq4248.png',
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/amazingpools_seva5m.png',
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/mansions_nn9blb.png',
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/lakefront_nzmbnm.png',
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/cabins_o6bewf.png',
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/tropical_fpti81.png',
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/new_pomh98.png',
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796924/labels-airbnb/countryside_mbu4lg.png',
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/trending_tplof2.png',
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796926/labels-airbnb/nationalparks_ioaifi.png',
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685899612/camping_hosn71.png',
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685899742/treehouses_l3xtni.png',
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796926/labels-airbnb/iconiccities_b9hkks.png',
    ]
    return titels.map((title, i) => {
        return {
            id: utilService.makeId(),
            title,
            url: urls[i]
        }
    })
}

; (() => {
    var stays = utilService.loadFromStorage(STORAGE_KEY) || []
    if (!stays.length) {
        stays = gStays
        utilService.saveToStorage(STORAGE_KEY, stays)
    }
})()

function _createRandomStays() {
    const stays = []
    for (let i = 0; i < 28; i++) {
        stays.push(_createRandomStay())
    }
    console.log(JSON.stringify(stays))
    return stays
}

function _createRandomStay() {
    const demoData = getDemoData()
    return {
        _id: utilService.makeId(),
        name: demoData.getRandomName(),
        type: demoData.getRandomType(),
        imgUrls: demoData.getRandomImgUrls(),
        price: utilService.getRandomIntInclusive(20, 800),
        summary: demoData.getRandomSummery(),
        capacity: utilService.getRandomIntInclusive(0, 16),
        amenities: demoData.getRandomAmenities(),
        labels: demoData.getRandomLabels(),
        host: userService.getRandomUser(),
        loc: demoData.getRandomLocation(),
        reviews: reviewService.getRandomReviews(),
        likedByUsers: [userService.getRandomUser(), userService.getRandomUser()],
        availableDates: demoData.getRandomAvailableDates()
    }
}

function getDemoData() {
    const DATA = {
        imgs: [
            'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600',

        ],
        names: [
            'Ribeira Charming Duplex',
            'Sunset Paradise Villa',
            'Mountain Hideaway Cabin',
            'Metropolis Loft Apartment',
        ],
        summery: [
            'Fantastic duplex apartment...',
            'Experience the ultimate beachfront getaway in our luxurious villa...',
            'Escape to the tranquility of the mountains in our cozy cabin...',
            'Experience the vibrant energy of New York City in our modern loft apartment...',
        ],
        types: [
            'House',
            'Villa',
            'Cabin',
            'Apartment',
        ],
        amenities: [
            { name: 'TV', url: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685879904/tv_unkhyq.svg' },
            { name: 'Private pool', url: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685879992/pool_tgak7m.svg' },
            { name: 'Garden', url: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685880112/garden_d7ewbt.svg' },
            { name: 'Air conditioning', url: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685880185/air-conditioner_dxhewv.svg' },
            { name: 'Breakfast included', url: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685880255/breakfast_kdnda7.svg' },
            { name: 'Beach access', url: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796924/labels-airbnb/beachfront_fh5txx.png' },
            { name: 'Fireplace', url: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685880508/fire-place_umdse2.svg' },
            { name: 'Scenic views', url: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685880593/view_jtcevr.svg' },
            { name: 'Pet-friendly', url: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685880694/pet_lhxnii.svg' },
            { name: 'Gym access', url: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685880742/gym_vbbavo.svg' },
            { name: 'Central location', url: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685880892/location_h091hi.svg' },
            { name: 'Wifi', url: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685880952/wifi_pao7bq.svg' },
            { name: 'Kitchen', url: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685881015/kitchen_xn7hvl.svg' },
            { name: 'Smoking allowed', url: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685881096/smoking_zksaef.svg' },
            { name: 'Cooking basics', url: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685881161/cooking_vwvec9.svg' }
        ],
        labels: [
            'Rooms',
            'Castles',
            'Farms',
            'Design',
            'Luxe',
            'Boats',
            'OMG!',
            'Beachfront',
            'Amazing views',
            'Amazing pools',
            'Mansions',
            'Lakefront',
            'Cabins',
            'Tropical',
            'New',
            'Countryside',
            'Trending',
            'National parks',
            'Camping',
            'Treehouses',
            'Iconic cities'
        ],
        locations: [
            {
                country: 'Portugal',
                countryCode: 'PT',
                city: 'Lisbon',
                address: '17 Kombo st',
                lat: -8.61308,
                lng: 41.1413
            },
            {
                country: "Indonesia",
                countryCode: "ID",
                city: "Bali",
                address: "Jl. Sunset Beach No. 10",
                lat: -8.12345,
                lng: 115.6789
            },
            {
                country: "United States",
                countryCode: "US",
                city: "Asheville",
                address: "123 Mountain Rd",
                lat: 35.6789,
                lng: -82.12345
            },
            {
                country: "United States",
                countryCode: "US",
                city: "New York City",
                address: "123 Main St",
                lat: 40.7128,
                lng: -74.0060
            },
            {
                country: "Portugal",
                countryCode: "PT",
                city: "Lisbon",
                address: "17 Kombo st",
                lat: -8.61308,
                lng: 41.1413
            }
        ],

    }

    function getRandomName() {
        return DATA.names[utilService.getRandomIntInclusive(0, DATA.names.length - 1)]
    }

    function getRandomType() {
        return DATA.types[utilService.getRandomIntInclusive(0, DATA.types.length - 1)]
    }

    function getRandomSummery() {
        return DATA.summery[utilService.getRandomIntInclusive(0, DATA.summery.length - 1)]
    }

    function getRandomLocation() {
        return DATA.locations[utilService.getRandomIntInclusive(0, DATA.locations.length - 1)]
    }

    function getRandomImgUrls() {
        const urls = []
        for (let i = 0; i < 5; i++) {
            urls.push({
                id: utilService.makeId(),
                url: DATA.imgs[utilService.getRandomIntInclusive(0, DATA.imgs.length - 1)]
            })
        }
        return urls
    }

    function getRandomAmenities() {
        const amenities = []
        for (let i = 0; i < utilService.getRandomIntInclusive(5, 7); i++) {
            amenities.push(DATA.amenities[utilService.getRandomIntInclusive(0, DATA.amenities.length - 1)])
        }
        return amenities
    }

    function getRandomLabels() {
        const labels = []
        for (let i = 0; i < utilService.getRandomIntInclusive(5, 9); i++) {
            labels.push(DATA.labels[utilService.getRandomIntInclusive(0, DATA.labels.length - 1)])
        }
        return labels
    }

    function getRandomAvailableDates() {
        const availableDates = []
        const today = new Date()
        const startDate = addDays(today, 1) // Start from 1 day ahead
        const endDate = addDays(today, 9) // End on 9 days ahead

        while (startDate <= endDate) {
            const randomDays = getRandomInt(0, 6) // Random days in 0-6 range
            const start = addDays(startDate, randomDays)
            const randomDuration = getRandomInt(0, 9) // Random duration in 0-9 range
            const end = addDays(start, randomDuration)

            availableDates.push({
                startDate: formatDate(start),
                endDate: formatDate(end),
            })

            startDate.setDate(startDate.getDate() + 1) // Move to the next day
        }

        return availableDates
    }

    return {
        getRandomName,
        getRandomType,
        getRandomSummery,
        getRandomLocation,
        getRandomAmenities,
        getRandomLabels,
        getRandomImgUrls,
        getRandomAvailableDates
    }
}

function addDays(date, days) {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
}

function formatDate(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${month}/${day}/${year}`
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}