import { userService } from '../../services/user.service.js'
import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'order_db'

export const orederService = {
    query,
    getById,
    getEmptyOrder,
    getOrderByHost,
    getOrderByBuyer,
    add
}

async function query() {
    return storageService.query(STORAGE_KEY)
}

async function getById(orderId) {
    return storageService.get(STORAGE_KEY, orderId)
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
        const orders = await query()
        return orders.filter(order => order.buyerId === buyerId)
    }
    catch (err) {
        console.log('orderService: Error getting order by buyer', err.message)
        throw err
    }
}

async function add(orderToAdd) {
    orderToAdd.createdAt = Date.now()
    const newOrder = storageService.post(STORAGE_KEY, orderToAdd)
    userService.addNewOrder(newOrder._id)
    return newOrder
}

async function update(orderToUpdate) {
    return storageService.put(STORAGE_KEY, orderToUpdate)
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