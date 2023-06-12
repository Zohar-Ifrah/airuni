// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

// const STORAGE_KEY = 'order_db'
const API = 'order'

export const orederService = {
    query,
    getById,
    getEmptyOrder,
    getOrderByHost,
    getOrderByBuyer,
    add,
    update
}

async function query(filterBy) {
    // return storageService.query(STORAGE_KEY)
    return httpService.get(API, filterBy)
}

async function getById(orderId) {
    // return storageService.get(STORAGE_KEY)
    return httpService.get(API, orderId)
}

async function getOrderByHost(hostId) {
    try {
        const orders = await query()
        return orders.filter(order => order.hostId === hostId)
    }
    catch (err) {
        console.log('orderService: Error getting order by host', err.message)
        throw err
    }
}

async function getOrderByBuyer(buyerId) {
    try {
        const filterBy = { buyer: buyerId }
        const orders = await query(filterBy)

        return orders.filter(order => order.buyerId === buyerId)
    }
    catch (err) {
        console.log('orderService: Error getting order by buyer', err.message)
        throw err
    }
}

async function add(orderToAdd) {
    // orderToAdd.createdAt = Date.now()
    // const newOrder = storageService.post(STORAGE_KEY, orderToAdd)
    // return newOrder
    return httpService.post(API, orderToAdd)
}

async function update(orderToUpdate) {
    // return storageService.put(STORAGE_KEY, orderToUpdate)

    return httpService.put(API, orderToUpdate)
}

function getEmptyOrder() {
    return {
        stayId: '',
        hostId: '',
        buyerId: '',
        info: {
            checkin: -1,
            checkout: -1,
            price: -1,
            guests: -1,
        },
        createdAt: -1,
        isAproved: false,
    }
}