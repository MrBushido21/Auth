import type { CartItem, OrderItemsType, OrderType } from "../../types/types.js"
import { sqlAll, sqlGet, sqlRun } from "../db.constructor.js"

//Create
export const createOrder = async (user_id: number, full_name:string, phone_number: string, city:string, email:string | null, 
    comment:string | null, call:string, total_price: number, status:string, created_at:string): Promise<void> => {
    await sqlRun(`
        INSERT INTO orders (user_id, full_name, phone_number, city, email, comment, call, total_price, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `, [user_id, full_name, phone_number, city, email, comment, call, total_price, status, created_at])
}

export const createOrderItem = async (order_id:number, cartItems: CartItem[]) => {
    cartItems.map(async (item) => {
        await sqlRun(`
            INSERT INTO order_items (order_id, product_id, quantity, price)
            VALUES (?, ?, ?, ?)
            `, [order_id, item.product_id, item.quantity, item.price])  
    })
}

//Get one
export const getOrederId = async (user_id:number):Promise<OrderType> => {
    const order_id = await sqlGet(`
        SELECT id FROM orders WHERE user_id = ?
        ORDER BY created_at DESC
        `, [user_id])
    return order_id
}
export const getOreder = async (order_id:number):Promise<OrderType> => {
    const order:OrderType = await sqlGet(`
        SELECT * FROM orders WHERE id = ?
        `, [order_id])
    return order
}
export const getOrederItem = async (order_id:number):Promise<OrderItemsType> => {
    const order_item:OrderItemsType = await sqlGet(`
        SELECT * FROM order_items WHERE order_id = ?
        `, [order_id])
        
    return order_item
}

export const deleteOrder = async () => {
    await sqlRun(`
        DELETE FROM order_items WHERE id = 2
        `)
}


//update

export const updateStatus = async (id:number, status:string) => {
    await sqlRun(`
        UPDATE orders SET status = ? WHERE id = ?
        `, [status, id])
}

//Get All

export const getOrders = async ():Promise<OrderType[]> => {
    const orders:OrderType[] = await sqlAll(`SELECT * FROM orders`)
    return orders
}
export const getOrderItems = async ():Promise<OrderItemsType[]> => {
    const order_items:OrderItemsType[] = await sqlAll(`SELECT * FROM order_items`)
    return order_items
}