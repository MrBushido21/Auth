import * as order from "./db.dao.js"

export const orderRepository = {
    createOrder: order.createOrder,
    getOrederId: order.getOrederId,
    createOrderItem: order.createOrderItem,
    getOrders: order.getOrders,
    getOreder: order.getOreder,
    getUserOreders: order.getUserOreders,
    getOrederItem: order.getOrederItem,
    getOrderItems: order.getOrderItems,
    updateStatus: order.updateStatus,
    updateInvoiceId: order.updateInvoiceId,
}