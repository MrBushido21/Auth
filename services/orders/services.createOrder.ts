import { orderRepository } from "../../db/order/orderRepository.js"
import { dateNow } from "../../utils/utils.js"
import Cart from "../cart/services.cartAdd.js"

export const servicesCreateOrder = {
    async createOrder({order_id, user_id, full_name, phone_number, city, department, email, comment, call, localCart}: 
        {order_id:string, user_id: number, full_name:string, phone_number: number, city:string, department:string, email:string | null, comment:string | null, call:string, localCart:any[]}) {
           try {
            const cart = new Cart(localCart)
            const total_price = await cart.getTotalCartPrice()
            await orderRepository.createOrder(order_id, user_id, full_name, String(phone_number), city, department, email, comment, call, total_price, "in procces", dateNow())          
           } catch (error) {
            console.error(error);            
           }
    },
    async createOrderItem({user_id, localCart}: {user_id: number, localCart:any[]}) {
      
          try {
            const cart = new Cart(localCart)            
            const cartItems = await cart.getCartItems()
            const order_id = (await orderRepository.getOrederId(user_id)).order_id   
            await orderRepository.createOrderItem(order_id, cartItems)
          } catch (error) {
            console.error("orderItems: " + error);       
          }    
    },

    async getOrders() {
        const orders = await orderRepository.getOrders()
        const response:any = []
        orders.map(order => {response.push({id: order.order_id, created_at: order.created_at, status: order.status})})
        return response
    },

    async getUserOrders({user_id}:{user_id:number}) {
        const orders = await orderRepository.getUserOreders(user_id)
        const response:any = []
        orders.map(order => {response.push({id: order.order_id, created_at: order.created_at, status: order.status})})
        return response
    },
    
    async getFullOrders({order_id}: {order_id:string}) {
        const order = await orderRepository.getOreder(order_id)
        const order_item = await orderRepository.getOrederItem(order_id)
        
        const response:any = {order, order_item}
        return response
    },

    async updateStatus({order_id, order_status, force}: {order_id:string, order_status:string, force:boolean}) {
      try {
        await orderRepository.updateStatus(order_id, order_status, force)
      } catch (error) {
        console.error(error);
        
      }   
    } 
}
