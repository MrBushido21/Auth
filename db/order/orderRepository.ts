import * as order from "./db.dao.js"

export const orderRepository = {
    createOrder: order.createOrder,
    getOrederId: order.getOrederId,
    createOrderItem: order.createOrderItem,
    getOrders: order.getOrders
}