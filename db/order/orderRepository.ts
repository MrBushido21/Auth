import * as order from "./db.dao.js"

export const orderRepository = {
    createOrder: order.createOrder,
    getOrderId: order.getOrderId,
    createOrderItem: order.createOrderItem,
    getOrders: order.getOrders,
    getOrder: order.getOrder,
    getUserOrders: order.getUserOrders,
    getOrderItems: order.getOrderItems,
    updateStatus: order.updateStatus,
    updateInvoiceId: order.updateInvoiceId,
    deleteOrder: order.deleteOrder,
    deleteOrderItems: order.deleteOrderItems,
    updateUserOrderInfo: order.updateUserOrderInfo,
    getUserOrder: order.getUserOrder
}