
import { httpService } from './http.service.js'


const STORAGE_KEY = 'stay'

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


async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(STORAGE_KEY, filterBy)
}

function getById(stayId) {
    return httpService.get(`stay/${stayId}`)
}

async function remove(stayId) {
    return httpService.delete(`stay/${stayId}`)
}
async function save(stay) {
    var savedStay
    if (stay._id) {
        savedStay = await httpService.put(`stay/${stay._id}`, stay)

    } else {
        savedStay = await httpService.post('stay', stay)
    }
    return savedStay
}

async function addStayMsg(stayId, txt) {
    const savedMsg = await httpService.post(`stay/${stayId}/msg`, { txt })
    return savedMsg
}

function getDefaultFilter() {
    return { price: 750, txt: '', location: '', checkIn: '', checkOut: '', adults: 0, children: 0, infants: 0, pets: 0 }
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





