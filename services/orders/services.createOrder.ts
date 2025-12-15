import { orderRepository } from "../../db/order/orderRepository.js"
import { productsRepository } from "../../db/products/productsRepository.js"
import { dateNow } from "../../utils/utils.js"
import Cart from "../cart/services.cartAdd.js"
import { servicesUpdateQuantityProduct } from "../produtcs/services.updateQuantityProduct.js"

export const servicesCreateOrder = {
    async createOrder({user_id, full_name, phone_number, city, department, email, comment, call}: 
        {user_id: number, full_name:string, phone_number: number, city:string, department:string, email:string | null, comment:string | null, call:string}) {
           try {
            const cart = new Cart(user_id, 0, "", 0, 0)
            const total_price = await cart.getTotalCartPrice()
            await orderRepository.createOrder(user_id, full_name, String(phone_number), city, department, email, comment, call, total_price, "paid", dateNow())          
           } catch (error) {
            console.error(error);            
           }
    },
    async createOrderItem({user_id}: {user_id: number}) {
          try {
            const cart = new Cart(user_id, 0, "", 0, 0)            
            const cartItems = await cart.getCartItemsWithCartId()
            const order_id = (await orderRepository.getOrederId(user_id)).id   
            await orderRepository.createOrderItem(order_id, cartItems)
          } catch (error) {
            console.error("orderItems: " + error);       
          }    
    },

    async getOrders() {
        const orders = await orderRepository.getOrders()
        const response:any = []
        orders.map(order => {response.push({id: order.id, created_at: order.created_at, status: order.status})})
        return response
    },

    async getFullOrders({order_id}: {order_id:number}) {
        const order = await orderRepository.getOreder(order_id)
        const order_item = await orderRepository.getOrederItem(order_id)
        
        const response:any = {order, order_item}
        return response
    },

    async updateStatus({order_id, status}: {order_id:number, status:string}) {
      await orderRepository.updateStatus(+order_id, status)   
    } 
}