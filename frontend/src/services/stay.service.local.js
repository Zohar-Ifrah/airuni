import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { reviewService } from './review.service.js'

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

async function query(filterBy = { txt: '', price: 750, location: '' }) {
    var stays = await storageService.query(STORAGE_KEY)
    if (filterBy.location) {
        const regex = new RegExp(filterBy.location, 'i')
        stays = stays.filter(stay => regex.test(stay.loc.country) || regex.test(stay.loc.city))
    }
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     stays = stays.filter(stay => regex.test(stay.vendor) || regex.test(stay.description))
    // }
    // if (filterBy.price) {
    //     stays = stays.filter(stay => stay.price <= filterBy.price)
    // }
    return stays
}

function getById(stayId) {
    return storageService.get(STORAGE_KEY, stayId)
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
        adults: 1,
        children: 0,
        infants: 0,
        pets: 0
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
        stays = _createRandomStays()
        utilService.saveToStorage(STORAGE_KEY, stays)
    }
})()

function _createRandomStays() {
    const stays = []
    for (let i = 0; i < 10; i++) {
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
        capacity: utilService.getRandomIntInclusive(0, 8),
        amenities: demoData.getRandomAmenities(),
        labels: demoData.getRandomLabels(),
        host: userService.getRandomUser(),
        loc: demoData.getRandomLocation(),
        reviews: reviewService.getRandomReviews(),
        likedByUsers: [userService.getRandomUser(), userService.getRandomUser()]
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
            'Top of the world',
            'Trending',
            'Play',
            'Tropical',
            'Luxury Retreat',
            'Beachfront Bliss',
            'Relaxation',
            'Nature Retreat',
            'Adventure',
            'Peaceful',
            'City Life',
            'Culture',
            'Convenience'
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
        for (let i = 0; i < utilService.getRandomIntInclusive(3, 7); i++) {
            labels.push(DATA.labels[utilService.getRandomIntInclusive(0, DATA.labels.length - 1)])
        }
        return labels
    }

    return {
        getRandomName,
        getRandomType,
        getRandomSummery,
        getRandomLocation,
        getRandomAmenities,
        getRandomLabels,
        getRandomImgUrls
    }
}
// import { storageService } from './async-storage.service.js'
// import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

// const STORAGE_KEY = 'stayDB'

// export const stayService = {
//     query,
//     getById,
//     save,
//     remove,
//     getEmptyStay,
//     addStayMsg,
//     getDefaultFilter,
//     getLabels
// }
// window.cs = stayService

// const gDemostays = [
//     // first entry: duplex apartment in Lisbon
//     {
//         _id: utilService.makeId(),
//         name: "Ribeira Charming Duplex",
//         type: "House",
//         imgUrls: [
//             { id: utilService.makeId(), url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600" },
//             { id: utilService.makeId(), url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600" },
//             { id: utilService.makeId(), url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600" },
//             { id: utilService.makeId(), url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600" },
//         ],
//         price: 80.00,
//         summary: "Fantastic duplex apartment...",
//         capacity: 8,
//         amenities: [
//             "TV",
//             " Wifi",
//             " Kitchen",
//             " Smoking allowed ",
//             " Pets allowed ",
//             " Cooking basics "
//         ],
//         labels: [
//             "Top of the world",
//             "Trending",
//             "Play",
//             "Tropical"
//         ],
//         host: {
//             _id: utilService.makeId(),
//             fullname: "Davit Pok",
//             imgUrl: "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
//         },
//         loc: {
//             country: "Portugal",
//             countryCode: "PT",
//             city: "Lisbon",
//             address: "17 Kombo st",
//             lat: -8.61308,
//             lng: 41.1413
//         },
//         reviews: [
//             {
//                 id: utilService.makeId(),
//                 txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...',
//                 rate: 4,
//                 by: {
//                     _id: utilService.makeId(),
//                     fullname: "user2",
//                     imgUrl: "/img/img2.jpg"
//                 }
//             }
//         ],
//         likedByUsers: ['mini-user']
//     },
//     // Additional entry 1: Beachfront Villa in Bali
//     {
//         _id: utilService.makeId(),
//         name: "Sunset Paradise Villa",
//         type: "Villa",
//         imgUrls: [
//             { id: utilService.makeId(), url: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600" },
//             { id: utilService.makeId(), url: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600" },
//             { id: utilService.makeId(), url: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600" },
//             { id: utilService.makeId(), url: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600" }
//         ],
//         price: 150.00,
//         summary: "Experience the ultimate beachfront getaway in our luxurious villa...",
//         capacity: 10,
//         amenities: [
//             "Private pool",
//             "Garden",
//             "Air conditioning",
//             "Breakfast included",
//             "Beach access"
//         ],
//         labels: [
//             "Luxury Retreat",
//             "Beachfront Bliss",
//             "Relaxation"
//         ],
//         host: {
//             _id: utilService.makeId(),
//             fullname: "Aria Patel",
//             imgUrl: "https://example.com/aria-patel.jpg"
//         },
//         loc: {
//             country: "Indonesia",
//             countryCode: "ID",
//             city: "Bali",
//             address: "Jl. Sunset Beach No. 10",
//             lat: -8.12345,
//             lng: 115.6789
//         },
//         reviews: [
//             {
//                 id: utilService.makeId(),
//                 txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...",
//                 rate: 5,
//                 by: {
//                     _id: utilService.makeId(),
//                     fullname: "Emily Johnson",
//                     imgUrl: "/img/emily-johnson.jpg"
//                 }
//             }
//         ],
//         likedByUsers: ["mini-user", "u103"]
//     },
//     // Additional entry 2: Cozy Cabin in the Mountains
//     {
//         _id: utilService.makeId(),
//         name: "Mountain Hideaway Cabin",
//         type: "Cabin",
//         imgUrls: [
//             { id: utilService.makeId(), url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=600" },
//             { id: utilService.makeId(), url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=600" },
//             { id: utilService.makeId(), url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=600" },
//             { id: utilService.makeId(), url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=600" }
//         ],
//         price: 120.00,
//         summary: "Escape to the tranquility of the mountains in our cozy cabin...",
//         capacity: 4,
//         amenities: [
//             "Fireplace",
//             "Hiking trails nearby",
//             "Scenic views",
//             "Pet-friendly"
//         ],
//         labels: [
//             "Nature Retreat",
//             "Adventure",
//             "Peaceful"
//         ],
//         host: {
//             _id: utilService.makeId(),
//             fullname: "Sarah Thompson",
//             imgUrl: "https://example.com/sarah-thompson.jpg"
//         },
//         loc: {
//             country: "United States",
//             countryCode: "US",
//             city: "Asheville",
//             address: "123 Mountain Rd",
//             lat: 35.6789,
//             lng: -82.12345
//         },
//         reviews: [
//             {
//                 id: utilService.makeId(),
//                 txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...",
//                 rate: 4,
//                 by: {
//                     _id: utilService.makeId(),
//                     fullname: "Michael Davis",
//                     imgUrl: "/img/michael-davis.jpg"
//                 }
//             }
//         ],
//         likedByUsers: ["mini-user", "u104"]
//     },
//     // Additional entry 3: Urban Loft in New York City
//     {
//         _id: utilService.makeId(),
//         name: "Metropolis Loft Apartment",
//         type: "Apartment",
//         imgUrls: [
//             { id: utilService.makeId(), url: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600" },
//             { id: utilService.makeId(), url: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600" },
//             { id: utilService.makeId(), url: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600" },
//             { id: utilService.makeId(), url: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600" }
//         ],
//         price: 200.00,
//         summary: "Experience the vibrant energy of New York City in our modern loft apartment...",
//         capacity: 2,
//         amenities: [
//             "City views",
//             "Gym access",
//             "Concierge service",
//             "Central location"
//         ],
//         labels: [
//             "City Life",
//             "Culture",
//             "Convenience"
//         ],
//         host: {
//             _id: utilService.makeId(),
//             fullname: "Maxwell Lee",
//             imgUrl: "https://example.com/maxwell-lee.jpg"
//         },
//         loc: {
//             country: "United States",
//             countryCode: "US",
//             city: "New York City",
//             address: "123 Main St",
//             lat: 40.7128,
//             lng: -74.0060
//         },
//         reviews: [
//             {
//                 id: utilService.makeId(),
//                 txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...",
//                 rate: 5,
//                 by: {
//                     _id: utilService.makeId(),
//                     fullname: "Olivia Adams",
//                     imgUrl: "/img/olivia-adams.jpg"
//                 }
//             }
//         ],
//         likedByUsers: ["mini-user", "u105"]
//     },
//     {
//         _id: utilService.makeId(),
//         name: "Ribeira Charming Duplex",
//         type: "House",
//         imgUrls: [
//             { id: utilService.makeId(), url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600" },
//             { id: utilService.makeId(), url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600" },
//             { id: utilService.makeId(), url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600" },
//             { id: utilService.makeId(), url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600" },
//         ],
//         price: 80.00,
//         summary: "Fantastic duplex apartment...",
//         capacity: 8,
//         amenities: [
//             "TV",
//             "Wifi",
//             "Kitchen",
//             "Smoking allowed",
//             "Pets allowed",
//             "Cooking basics"
//         ],
//         labels: [
//             "Top of the world",
//             "Trending",
//             "Play",
//             "Tropical"
//         ],
//         host: {
//             _id: utilService.makeId(),
//             fullname: "Davit Pok",
//             imgUrl: "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
//         },
//         loc: {
//             country: "Portugal",
//             countryCode: "PT",
//             city: "Lisbon",
//             address: "17 Kombo st",
//             lat: -8.61308,
//             lng: 41.1413
//         },
//         reviews: [
//             {
//                 id: utilService.makeId(),
//                 txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...",
//                 rate: 4,
//                 by: {
//                     _id: utilService.makeId(),
//                     fullname: "user2",
//                     imgUrl: "/img/img2.jpg"
//                 }
//             }
//         ],
//         likedByUsers: ['mini-user']
//     },
//     {
//         _id: utilService.makeId(),
//         name: "Ribeira Charming Duplex",
//         type: "House",
//         imgUrls: [
//             { id: utilService.makeId(), url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600" },
//             { id: utilService.makeId(), url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600" },
//             { id: utilService.makeId(), url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600" },
//             { id: utilService.makeId(), url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600" },
//         ],
//         price: 80.00,
//         summary: "Fantastic duplex apartment...",
//         capacity: 8,
//         amenities: [
//             "TV",
//             "Wifi",
//             "Kitchen",
//             "Smoking allowed",
//             "Pets allowed",
//             "Cooking basics"
//         ],
//         labels: [
//             "Top of the world",
//             "Trending",
//             "Play",
//             "Tropical"
//         ],
//         host: {
//             _id: utilService.makeId(),
//             fullname: "Davit Pok",
//             imgUrl: "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
//         },
//         loc: {
//             country: "Portugal",
//             countryCode: "PT",
//             city: "Lisbon",
//             address: "17 Kombo st",
//             lat: -8.61308,
//             lng: 41.1413
//         },
//         reviews: [
//             {
//                 id: utilService.makeId(),
//                 txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...",
//                 rate: 4,
//                 by: {
//                     _id: utilService.makeId(),
//                     fullname: "user2",
//                     imgUrl: "/img/img2.jpg"
//                 }
//             }
//         ],
//         likedByUsers: ['mini-user']
//     },
//     {
//         _id: utilService.makeId(),
//         name: "Ribeira Charming Duplex",
//         type: "House",
//         imgUrls: [
//             { id: utilService.makeId(), url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600" },
//             { id: utilService.makeId(), url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600" },
//             { id: utilService.makeId(), url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600" },
//             { id: utilService.makeId(), url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600" },
//         ],
//         price: 80.00,
//         summary: "Fantastic duplex apartment...",
//         capacity: 8,
//         amenities: [
//             "TV",
//             "Wifi",
//             "Kitchen",
//             "Smoking allowed",
//             "Pets allowed",
//             "Cooking basics"
//         ],
//         labels: [
//             "Top of the world",
//             "Trending",
//             "Play",
//             "Tropical"
//         ],
//         host: {
//             _id: utilService.makeId(),
//             fullname: "Davit Pok",
//             imgUrl: "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
//         },
//         loc: {
//             country: "Portugal",
//             countryCode: "PT",
//             city: "Lisbon",
//             address: "17 Kombo st",
//             lat: -8.61308,
//             lng: 41.1413
//         },
//         reviews: [
//             {
//                 id: utilService.makeId(),
//                 txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...",
//                 rate: 4,
//                 by: {
//                     _id: utilService.makeId(),
//                     fullname: "user2",
//                     imgUrl: "/img/img2.jpg"
//                 }
//             },
//             {
//                 id: utilService.makeId(),
//                 txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...",
//                 rate: 1,
//                 by: {
//                     _id: utilService.makeId(),
//                     fullname: "user2",
//                     imgUrl: "/img/img2.jpg"
//                 }
//             },
//             {
//                 id: utilService.makeId(),
//                 txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...",
//                 rate: 1,
//                 by: {
//                     _id: utilService.makeId(),
//                     fullname: "user2",
//                     imgUrl: "/img/img2.jpg"
//                 }
//             },
//             {
//                 id: utilService.makeId(),
//                 txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...",
//                 rate: 1,
//                 by: {
//                     _id: utilService.makeId(),
//                     fullname: "user2",
//                     imgUrl: "/img/img2.jpg"
//                 }
//             },
//             {
//                 id: utilService.makeId(),
//                 txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...",
//                 rate: 1,
//                 by: {
//                     _id: utilService.makeId(),
//                     fullname: "user2",
//                     imgUrl: "/img/img2.jpg"
//                 }
//             },
//             {
//                 id: utilService.makeId(),
//                 txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...",
//                 rate: 1,
//                 by: {
//                     _id: utilService.makeId(),
//                     fullname: "user2",
//                     imgUrl: "/img/img2.jpg"
//                 }
//             },
//             {
//                 id: utilService.makeId(),
//                 txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...",
//                 rate: 1,
//                 by: {
//                     _id: utilService.makeId(),
//                     fullname: "user2",
//                     imgUrl: "/img/img2.jpg"
//                 }
//             }, {
//                 id: utilService.makeId(),
//                 txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...",
//                 rate: 1,
//                 by: {
//                     _id: utilService.makeId(),
//                     fullname: "user2",
//                     imgUrl: "/img/img2.jpg"
//                 }
//             }
//             , {
//                 id: utilService.makeId(),
//                 txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...",
//                 rate: 1,
//                 by: {
//                     _id: utilService.makeId(),
//                     fullname: "user2",
//                     imgUrl: "/img/img2.jpg"
//                 }
//             }
//             , {
//                 id: utilService.makeId(),
//                 txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...",
//                 rate: 1,
//                 by: {
//                     _id: utilService.makeId(),
//                     fullname: "user2",
//                     imgUrl: "/img/img2.jpg"
//                 }
//             }
//             , {
//                 id: utilService.makeId(),
//                 txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...",
//                 rate: 1,
//                 by: {
//                     _id: utilService.makeId(),
//                     fullname: "user2",
//                     imgUrl: "/img/img2.jpg"
//                 }
//             }
//             , {
//                 id: utilService.makeId(),
//                 txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...",
//                 rate: 1,
//                 by: {
//                     _id: utilService.makeId(),
//                     fullname: "user2",
//                     imgUrl: "/img/img2.jpg"
//                 }
//             }
//             , {
//                 id: utilService.makeId(),
//                 txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...",
//                 rate: 1,
//                 by: {
//                     _id: utilService.makeId(),
//                     fullname: "user2",
//                     imgUrl: "/img/img2.jpg"
//                 }
//             }
//         ],
//         likedByUsers: ['mini-user']
//     }
// ]

// async function query(filterBy = { txt: '', price: 750, location: '' }) {
//     var stays = await storageService.query(STORAGE_KEY)
//     if (!stays.length) {
//         stays = gDemostays
//         utilService.saveToStorage(STORAGE_KEY, gDemostays)
//     }
//     if (filterBy.location) {
//         const regex = new RegExp(filterBy.location, 'i')
//         stays = stays.filter(stay => regex.test(stay.loc.country) || regex.test(stay.loc.city))
//     }
//     // if (filterBy.txt) {
//     //     const regex = new RegExp(filterBy.txt, 'i')
//     //     stays = stays.filter(stay => regex.test(stay.vendor) || regex.test(stay.description))
//     // }
//     // if (filterBy.price) {
//     //     stays = stays.filter(stay => stay.price <= filterBy.price)
//     // }
//     return stays
// }

// function getById(stayId) {
//     return storageService.get(STORAGE_KEY, stayId)
// }

// async function remove(stayId) {
//     // throw new Error('Nope')
//     await storageService.remove(STORAGE_KEY, stayId)
// }

// async function save(stay) {
//     var savedStay
//     if (stay._id) {
//         savedStay = await storageService.put(STORAGE_KEY, stay)
//     } else {
//         // Later, owner is set by the backend
//         stay.owner = userService.getLoggedinUser()
//         savedStay = await storageService.post(STORAGE_KEY, stay)
//     }
//     return savedStay
// }

// async function addStayMsg(stayId, txt) {
//     // Later, this is all done by the backend
//     const stay = await getById(stayId)
//     if (!stay.msgs) stay.msgs = []

//     const msg = {
//         id: utilService.makeId(),
//         by: userService.getLoggedinUser(),
//         txt
//     }
//     stay.msgs.push(msg)
//     await storageService.put(STORAGE_KEY, stay)

//     return msg
// }

// function getDefaultFilter() {
//     return { price: 750, txt: '', location: '', checkIn: '', checkOut: '', adults: 1, children: 0, infants: 0, pets: 0 }
// }

// function getEmptyStay() {
//     return {
//         // name: "Ribeira Charming Duplex",
//         type: "House",
//         imgUrls: [
//             { id: utilService.makeId(), url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600" },
//             { id: utilService.makeId(), url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600" },
//             { id: utilService.makeId(), url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600" },
//             { id: utilService.makeId(), url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600" },
//         ],
//         // price: 80.00,
//         summary: "Fantastic duplex apartment...",
//         capacity: 8,
//         amenities: [
//             "TV",
//             "Wifi",
//             "Kitchen",
//             "Smoking allowed",
//             "Pets allowed",
//             "Cooking basics"
//         ],
//         labels: [
//             "Top of the world",
//             "Trending",
//             "Play",
//             "Tropical"
//         ],
//         host: {
//             _id: "u101",
//             fullname: "Davit Pok",
//             imgUrl: "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
//         },
//         loc: {
//             country: "Portugal",
//             countryCode: "PT",
//             city: "Lisbon",
//             address: "17 Kombo st",
//             lat: -8.61308,
//             lng: 41.1413
//         },
//         reviews: [
//             {
//                 id: "madeId",
//                 txt: "Very helpful hosts. Cooked traditional...",
//                 rate: 4,
//                 by: {
//                     _id: "u102",
//                     fullname: "user2",
//                     imgUrl: "/img/img2.jpg"
//                 }
//             }
//         ],
//         likedByUsers: ['mini-user']
//     }
// }

// function getLabels() {
//     return [
//         { id: utilService.makeId(), title: 'Rooms', labelUrl: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796924/labels-airbnb/rooms_bsse5j.png' },
//         { id: utilService.makeId(), title: 'Castles', labelUrl: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796924/labels-airbnb/castle_dxrleo.png' },
//         { id: utilService.makeId(), title: 'Farms', labelUrl: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/farms_l5josl.png' },
//         { id: utilService.makeId(), title: 'Design', labelUrl: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796924/labels-airbnb/design_sajmco.png' },
//         { id: utilService.makeId(), title: 'Luxe', labelUrl: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/luxe_eyfxdq.png' },
//         { id: utilService.makeId(), title: 'Boats', labelUrl: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796922/labels-airbnb/boats_iangpw.png' },
//         { id: utilService.makeId(), title: 'OMG!', labelUrl: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796924/labels-airbnb/omg_zh3l1v.png' },
//         { id: utilService.makeId(), title: 'Beachfront', labelUrl: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796924/labels-airbnb/beachfront_fh5txx.png' },
//         { id: utilService.makeId(), title: 'Amazing views', labelUrl: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/amazingviews_uq4248.png' },
//         { id: utilService.makeId(), title: 'Amazing pools', labelUrl: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/amazingpools_seva5m.png' },
//         { id: utilService.makeId(), title: 'Mansions', labelUrl: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/mansions_nn9blb.png' },
//         { id: utilService.makeId(), title: 'Lakefront', labelUrl: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/lakefront_nzmbnm.png' },
//         { id: utilService.makeId(), title: 'Cabins', labelUrl: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/cabins_o6bewf.png' },
//         { id: utilService.makeId(), title: 'Tropical', labelUrl: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/tropical_fpti81.png' },
//         { id: utilService.makeId(), title: 'New', labelUrl: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/new_pomh98.png' },
//         { id: utilService.makeId(), title: 'Countryside', labelUrl: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796924/labels-airbnb/countryside_mbu4lg.png' },
//     ]
// }


// // TEST DATA
// // storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




