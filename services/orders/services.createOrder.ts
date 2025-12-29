import { orderRepository } from "../../db/order/orderRepository.js"
import type { OrderItemsType, OrderType } from "../../types/types.js"
import { dateExpire, dateNow } from "../../utils/utils.js"
import Cart from "../cart/services.cartAdd.js"
import { servicesPromocodes } from "../promocodes/services.promocodes.js"

export const servicesCreateOrder = {
    async createOrder({order_id, invoiceId, user_id, full_name, phone_number, city, department, email, comment, call, localCart, promocode}: 
        {order_id:string, invoiceId:string, user_id: number, full_name:string, phone_number: number, city:string, department:string, email:string | null, comment:string | null, call:string, localCart:any[], promocode?: string | undefined}) {
           try {
            const cart = new Cart(localCart)
            let total_price = await cart.getTotalCartPrice()
            if (promocode) {
              const promocodeData = await servicesPromocodes.findPromocodeByCode(promocode)
              if (promocodeData && promocodeData.is_active === "true") {       
                total_price = total_price - (total_price * (promocodeData.discount_percent / 100))       
            }
          }
            await orderRepository.createOrder(order_id, invoiceId, user_id, full_name, String(phone_number), city, 
            department, email, comment, call, total_price, "in procces", dateNow(), dateExpire(30).toString())          
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
        const order_items = await orderRepository.getOrederItems(order_id)
        
        const response:{order:OrderType, order_items:OrderItemsType[]} = {order, order_items}
        return response
    },

    async updateStatus({order_id, invoiceId, order_status, force}: {order_id?:string, invoiceId?:string, order_status:string, force:boolean}) {
      try {
        await orderRepository.updateStatus(order_id, invoiceId, order_status, force)
      } catch (error) {
        console.error(error);
        
      }   
    },
    async updateInvoiceId({order_id, invoiceId}: {order_id:string, invoiceId:string}) {
      try {
        await orderRepository.updateInvoiceId(order_id, invoiceId)
      } catch (error) {
        console.error(error);
      }
    },
    async deleteOrder({ order_id }: { order_id: string }) {
    try {
    const deletedRows = await orderRepository.deleteOrder(order_id);

    if (deletedRows === 0) {
      // Ордер не удалён — не трогаем items
      throw new Error("Заказ не может быть отменен (время истекло или не найден)");
    }

    // Только если ордер удалён, удаляем items
    await orderRepository.deleteOrderItems(order_id);

  } catch (error) {
    console.error(error);
    throw error; // чтобы роут понял, что отмена не прошла
  }
}
}