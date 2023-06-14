import { dbService } from '../../services/db.service.mjs'
import { logger } from '../../services/logger.service.mjs'
import { utilService } from '../../services/util.service.mjs'
import mongodb from 'mongodb'

const { ObjectId } = mongodb
const COLLECTION_ORDER = 'order'

const PAGE_SIZE = 3


async function query(filterBy) {
    try {
        const criteria = _buildCriteria(filterBy)

        const collection = await dbService.getCollection(COLLECTION_ORDER)
        var orderCursor = await collection.find(criteria)

        if (filterBy.pageIdx !== undefined) {
            orderCursor.skip(filterBy.pageIdx * PAGE_SIZE).limit(PAGE_SIZE)
        }

        const orders = orderCursor.toArray()
        return orders
    } catch (err) {
        logger.error('cannot find orders', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}

    if (filterBy.host) {
        criteria.hostId = filterBy.host
    }
    else if (filterBy.buyer) {
        criteria.buyerId = filterBy.buyer
    }
    return criteria
}

async function getById(orderId) {
    try {
        const collection = await dbService.getCollection(COLLECTION_ORDER)
        const order = collection.findOne({ _id: ObjectId(orderId) })
        return order
    } catch (err) {
        logger.error(`while finding order ${orderId}`, err)
        throw err
    }
}

async function remove(orderId) {
    try {
        const collection = await dbService.getCollection(COLLECTION_ORDER)
        await collection.deleteOne({ _id: ObjectId(orderId) })
        return orderId
    } catch (err) {
        logger.error(`cannot remove order ${orderId}`, err)
        throw err
    }
}

async function add(order) {
    try {
        order.createdAt = Date.now()
        const collection = await dbService.getCollection(COLLECTION_ORDER)
        const res = await collection.insertOne(order)
        order._id = res.insertedId
        return order
    } catch (err) {
        logger.error('cannot insert order', err)
        throw err
    }
}

async function update(order) {
    console.log('order: ', order)
    try {
        const id = order._id
        delete order._id
        const collection = await dbService.getCollection(COLLECTION_ORDER)
        await collection.updateOne({ _id: ObjectId(id) }, { $set: order })
        order._id = id
        return order
    } catch (err) {
        logger.error(`cannot update order ${order.id}`, err)
        throw err
    }
}

// async function addOrderMsg(orderId, msg) {
//     try {
//         msg.id = utilService.makeId()
//         const collection = await dbService.getCollection('order')
//         await collection.updateOne({ _id: ObjectId(orderId) }, { $push: { msgs: msg } })
//         return msg
//     } catch (err) {
//         logger.error(`cannot add order msg ${orderId}`, err)
//         throw err
//     }
// }

// async function removeOrderMsg(orderId, msgId) {
//     try {
//         const collection = await dbService.getCollection('order')
//         await collection.updateOne({ _id: ObjectId(orderId) }, { $pull: { msgs: { id: msgId } } })
//         return msgId
//     } catch (err) {
//         logger.error(`cannot add order msg ${orderId}`, err)
//         throw err
//     }
// }

export const orderService = {
    remove,
    query,
    getById,
    add,
    update,
    // addOrderMsg,
    // removeOrderMsg
}
