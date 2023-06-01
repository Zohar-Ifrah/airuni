
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'stayDB'

export const stayService = {
    query,
    getById,
    save,
    remove,
    getEmptyStay,
    addStayMsg,
    getDefaultFilter
}
window.cs = stayService

const gDemostays = [
    // first entry: duplex apartment in Lisbon
    {
        _id: "s101",
        name: "Ribeira Charming Duplex",
        type: "House",
        imgUrls: ["https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600"],
        price: 80.00,
        summary: "Fantastic duplex apartment...",
        capacity: 8,
        amenities: [
            "TV",
            " Wifi",
            " Kitchen",
            " Smoking allowed ",
            " Pets allowed ",
            " Cooking basics "
        ],
        labels: [
            "Top of the world",
            "Trending",
            "Play",
            "Tropical"
        ],
        host: {
            _id: "u101",
            fullname: "Davit Pok",
            imgUrl: "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
        },
        loc: {
            country: "Portugal",
            countryCode: "PT",
            city: "Lisbon",
            address: "17 Kombo st",
            lat: -8.61308,
            lng: 41.1413
        },
        reviews: [
            {
                id: "madeId",
                txt: "Very helpful hosts. Cooked traditional...",
                rate: 4,
                by: {
                    _id: "u102",
                    fullname: "user2",
                    imgUrl: "/img/img2.jpg"
                }
            }
        ],
        likedByUsers: ['mini-user']
    },
    // Additional entry 1: Beachfront Villa in Bali
    {
        _id: "s201",
        name: "Sunset Paradise Villa",
        type: "Villa",
        imgUrls: ["https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600"],
        price: 150.00,
        summary: "Experience the ultimate beachfront getaway in our luxurious villa...",
        capacity: 10,
        amenities: [
            "Private pool",
            "Garden",
            "Air conditioning",
            "Breakfast included",
            "Beach access"
        ],
        labels: [
            "Luxury Retreat",
            "Beachfront Bliss",
            "Relaxation"
        ],
        host: {
            _id: "u201",
            fullname: "Aria Patel",
            imgUrl: "https://example.com/aria-patel.jpg"
        },
        loc: {
            country: "Indonesia",
            countryCode: "ID",
            city: "Bali",
            address: "Jl. Sunset Beach No. 10",
            lat: -8.12345,
            lng: 115.6789
        },
        reviews: [
            {
                id: "reviewId",
                txt: "This villa exceeded our expectations. The staff was amazing...",
                rate: 5,
                by: {
                    _id: "u103",
                    fullname: "Emily Johnson",
                    imgUrl: "/img/emily-johnson.jpg"
                }
            }
        ],
        likedByUsers: ["mini-user", "u103"]
    },
    // Additional entry 2: Cozy Cabin in the Mountains
    {
        _id: "s301",
        name: "Mountain Hideaway Cabin",
        type: "Cabin",
        imgUrls: ["https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=600"],
        price: 120.00,
        summary: "Escape to the tranquility of the mountains in our cozy cabin...",
        capacity: 4,
        amenities: [
            "Fireplace",
            "Hiking trails nearby",
            "Scenic views",
            "Pet-friendly"
        ],
        labels: [
            "Nature Retreat",
            "Adventure",
            "Peaceful"
        ],
        host: {
            _id: "u301",
            fullname: "Sarah Thompson",
            imgUrl: "https://example.com/sarah-thompson.jpg"
        },
        loc: {
            country: "United States",
            countryCode: "US",
            city: "Asheville",
            address: "123 Mountain Rd",
            lat: 35.6789,
            lng: -82.12345
        },
        reviews: [
            {
                id: "reviewId2",
                txt: "The cabin was perfect for a mountain getaway. The views were breathtaking...",
                rate: 4,
                by: {
                    _id: "u104",
                    fullname: "Michael Davis",
                    imgUrl: "/img/michael-davis.jpg"
                }
            }
        ],
        likedByUsers: ["mini-user", "u104"]
    },
    // Additional entry 3: Urban Loft in New York City
    {
        _id: "s401",
        name: "Metropolis Loft Apartment",
        type: "Apartment",
        imgUrls: ["https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600"],
        price: 200.00,
        summary: "Experience the vibrant energy of New York City in our modern loft apartment...",
        capacity: 2,
        amenities: [
            "City views",
            "Gym access",
            "Concierge service",
            "Central location"
        ],
        labels: [
            "City Life",
            "Culture",
            "Convenience"
        ],
        host: {
            _id: "u401",
            fullname: "Maxwell Lee",
            imgUrl: "https://example.com/maxwell-lee.jpg"
        },
        loc: {
            country: "United States",
            countryCode: "US",
            city: "New York City",
            address: "123 Main St",
            lat: 40.7128,
            lng: -74.0060
        },
        reviews: [
            {
                id: "reviewId3",
                txt: "The location couldn't have been better. The loft was stylish and comfortable...",
                rate: 5,
                by: {
                    _id: "u105",
                    fullname: "Olivia Adams",
                    imgUrl: "/img/olivia-adams.jpg"
                }
            }
        ],
        likedByUsers: ["mini-user", "u105"]
    }
]

async function query(filterBy = { txt: '', price: 0 }) {
    var stays = await storageService.query(STORAGE_KEY)
    if (!stays.length) {
        stays = gDemostays
        utilService.saveToStorage(STORAGE_KEY, gDemostays)
    }
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        stays = stays.filter(stay => regex.test(stay.vendor) || regex.test(stay.description))
    }
    if (filterBy.price) {
        stays = stays.filter(stay => stay.price <= filterBy.price)
    }
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
    return { price: 750 }
}

function getEmptyStay() {
    return {
        // name: "Ribeira Charming Duplex",
        type: "House",
        imgUrls: ["https://image.cnbcfm.com/api/v1/image/106758801-1603459526384-picture-perfect-beautiful-house-on-the-island-of-coronado-in-sunny-california-beautifully-landscaped_t20_6lJOrv.jpg?v=1603459593&w=740&h=416&ffmt=webp&vtcrop=y"],
        // price: 80.00,
        summary: "Fantastic duplex apartment...",
        capacity: 8,
        amenities: [
            "TV",
            "Wifi",
            "Kitchen",
            "Smoking allowed",
            "Pets allowed",
            "Cooking basics"
        ],
        labels: [
            "Top of the world",
            "Trending",
            "Play",
            "Tropical"
        ],
        host: {
            _id: "u101",
            fullname: "Davit Pok",
            imgUrl: "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
        },
        loc: {
            country: "Portugal",
            countryCode: "PT",
            city: "Lisbon",
            address: "17 Kombo st",
            lat: -8.61308,
            lng: 41.1413
        },
        reviews: [
            {
                id: "madeId",
                txt: "Very helpful hosts. Cooked traditional...",
                rate: 4,
                by: {
                    _id: "u102",
                    fullname: "user2",
                    imgUrl: "/img/img2.jpg"
                }
            }
        ],
        likedByUsers: ['mini-user']
    }
}


// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




