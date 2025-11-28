import { orderRepository } from "../../db/order/orderRepository.js"
import { dateNow } from "../../utils/utils.js"
import Cart from "../produtcs/services.cartAdd.js"

export const servicesCreateOrder = {
    async createOrder({user_id, full_name, phone_number, city, email, comment, call}: 
        {user_id: number, full_name:string, phone_number: number, city:string, email:string | null, comment:string | null, call:string}) {
           const cart = new Cart(user_id, 0, "", 0, 0)
            const total_price = await cart.getTotalCartPrice()
        await orderRepository.createOrder(user_id, full_name, phone_number, city, email, comment, call, total_price, "in proccess", dateNow())    
    },
    async createOrderItem({user_id}: {user_id: number}) {
           const cart = new Cart(user_id, 0, "", 0, 0)
            const cartItems = await cart.getCartItemsWithCartId()
            const order_id = (await orderRepository.getOrederId(user_id)).id
            
            
        await orderRepository.createOrderItem(order_id, cartItems)    
    },

    async getOrders() {
        const orders = await orderRepository.getOrders()
        const response:any = []
        orders.map(order => {response.push({id: order.id, created_at: order.created_at})})
        return response
    }
}