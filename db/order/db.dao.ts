import User from "../../services/user/servicesClassUser.js"
import type { CartItem, OrderItemsType, OrderType, UserOrderInfoType } from "../../types/types.js"
import { sendlerEmailCode } from "../../utils/utils.js"
import { sqlAll, sqlGet, sqlRun } from "../db.constructor.js"


//Create
export const createOrder = async (order_id:string, invoiceId:string, user_id: number, full_name:string, 
    phone_number: string, city:string, department: string, email:string | null, 
    comment:string | null, call:string, total_price: number, promocode: string | undefined, sale: string | undefined, 
    status:string, created_at:string, returning_time:string): Promise<void> => {
    await sqlRun(`
        INSERT INTO orders (order_id, invoiceId, user_id, full_name, phone_number, city, department, email, 
        comment, call, total_price, promocode, sale, status, created_at, returning_time)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `, [order_id, invoiceId, user_id, full_name, phone_number, city, department, email, comment, call, 
            total_price, promocode, sale, status, created_at, returning_time])
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
export const getOrderId = async (user_id:number):Promise<OrderType> => {
    const order_id = await sqlGet(`
        SELECT order_id FROM orders WHERE user_id = ?
        ORDER BY created_at DESC
        `, [user_id])
    return order_id
}
export const getOrder = async (order_id:string):Promise<OrderType> => {
    const order:OrderType = await sqlGet(`
        SELECT * FROM orders WHERE order_id = ?
        `, [order_id])
    return order
}
export const getUserOrder = async (order_id:string, user_id:number):Promise<OrderType> => {
    const order:OrderType = await sqlGet(`
        SELECT * FROM orders WHERE order_id = ? AND user_id = ?
        `, [order_id, user_id])
    return order
}


//update

export const updateInvoiceId = async (order_id:string, invoiceId:string) => {
    await sqlRun(`
        UPDATE orders SET invoiceId = ? WHERE order_id = ?
        `, [invoiceId, order_id])
}

export const updateStatus = async (order_id:string | undefined, invoiceId:string | undefined, status:string, force:boolean) => {
await sqlRun("BEGIN IMMEDIATE TRANSACTION");

  try {
    const order = await sqlGet(
      "SELECT * FROM orders WHERE invoiceId = ? OR order_id = ?",
      [invoiceId, order_id]
    );

    if (!order) throw new Error("Order not found");
    
    // Защита только для webhook, не для админа
    if (!force && order.status === "paid") {
      await sqlRun("COMMIT");
      return;
    }

    await sqlRun(
      "UPDATE orders SET status = ? WHERE invoiceId = ? OR order_id = ?",
      [status, invoiceId, order_id]
    );

    await sqlRun("COMMIT");
  } catch (err) {
    await sqlRun("ROLLBACK");
    throw err;
  }

}

export const updateUserOrderInfo = async (order_id:string, userInfo:UserOrderInfoType) => {
    let parametrs:any = []
    let queryParms:any = []

    for (const [key, value] of Object.entries(userInfo)) {
        if (value) {
            parametrs.push(value)
            queryParms.push(`${key} = ?`)
        }
    }

    
    
    await sqlRun(`
        UPDATE orders 
        SET ${queryParms.join(", ")}
        WHERE order_id = ?
        `, [...parametrs, order_id])
}
//Get All

export const getOrders = async ():Promise<OrderType[]> => {
    const orders:OrderType[] = await sqlAll(`SELECT * FROM orders`)
    return orders
}


export const getOrderItems = async (order_id:string):Promise<OrderItemsType[]> => {
    const order_items:OrderItemsType[] = await sqlAll(`
        SELECT * FROM order_items WHERE order_id = ?
        `, [order_id])
        
    return order_items
}

export const getUserOrders = async (user_id:number):Promise<OrderType[]> => {
    const orders:OrderType[] = await sqlAll(`
        SELECT * FROM orders WHERE user_id = ?
        `, [user_id])
    return orders
}

//Delete
export const deleteOrder = async (order_id: string):Promise<number> => {
  const rows = await sqlGet(`
    SELECT order_id
    FROM orders
    WHERE order_id = ?
      AND returning_time > ?
  `, [order_id, Date.now()]);

  if (!rows) {
    return 0;
  }

  await sqlRun(`
    DELETE FROM orders
    WHERE order_id = ?
  `, [order_id]);

  return 1;
}
export const deleteOrderItems = async (order_id: string) => {
    await sqlRun(`
        DELETE FROM order_items WHERE order_id = ?
        `, [order_id])
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