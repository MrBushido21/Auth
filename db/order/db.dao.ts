import User from "../../services/user/servicesClassUser.js"
import type { CartItem, OrderItemsType, OrderType } from "../../types/types.js"
import { sendlerEmailCode } from "../../utils/utils.js"
import { sqlAll, sqlGet, sqlRun } from "../db.constructor.js"


//Create
export const createOrder = async (order_id:string, user_id: number, full_name:string, phone_number: string, city:string, department: string, email:string | null, 
    comment:string | null, call:string, total_price: number, status:string, created_at:string): Promise<void> => {
    await sqlRun(`
        INSERT INTO orders (order_id, user_id, full_name, phone_number, city, department, email, comment, call, total_price, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `, [order_id, user_id, full_name, phone_number, city, department, email, comment, call, total_price, status, created_at])
}

export const createOrderItem = async (order_id:string, cartItems: CartItem[]) => {
    cartItems.map(async (item) => {
        await sqlRun(`
            INSERT INTO order_items (order_id, product_id, product_name, product_img, quantity, price)
            VALUES (?, ?, ?, ?, ?, ?)
            `, [order_id, item.product_id, item.product_name, item.product_img, item.quantity, item.price])  
    })
}

//Get one
export const getOrederId = async (user_id:number):Promise<OrderType> => {
    const order_id = await sqlGet(`
        SELECT order_id FROM orders WHERE user_id = ?
        ORDER BY created_at DESC
        `, [user_id])
    return order_id
}
export const getOreder = async (order_id:string):Promise<OrderType> => {
    const order:OrderType = await sqlGet(`
        SELECT * FROM orders WHERE order_id = ?
        `, [order_id])
    return order
}


export const getOrederItem = async (order_id:string):Promise<OrderItemsType> => {
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

export const updateStatus = async (order_id:string, status:string, force:boolean) => {
await sqlRun("BEGIN IMMEDIATE TRANSACTION");

  try {
    const order = await sqlGet(
      "SELECT * FROM orders WHERE order_id = ?",
      [order_id]
    );

    if (!order) throw new Error("Order not found");
    
    // Защита только для webhook, не для админа
    if (!force && order.status === "paid") {
      await sqlRun("COMMIT");
      return;
    }

    await sqlRun(
      "UPDATE orders SET status = ? WHERE order_id = ?",
      [status, order_id]
    );

    await sqlRun("COMMIT");
  } catch (err) {
    await sqlRun("ROLLBACK");
    throw err;
  }

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

export const getUserOreders = async (user_id:number):Promise<OrderType[]> => {
    const orders:OrderType[] = await sqlAll(`
        SELECT * FROM orders WHERE user_id = ?
        `, [user_id])
    return orders
}

function checkStatus() {
    setInterval(async () => {
        const orders = await getOrders()
        for (const order of orders) {
            if (order.status === "payment_failed") {
                const userClass = new User(order.user_id)
                const user = await userClass.getUser()
                sendlerEmailCode(user.email, "У вас залишився неоплачений платіж http://localhost:3000/getproducts", "Не завершений платіж")
            }
        }
    }, 60000)
}

// checkStatus()