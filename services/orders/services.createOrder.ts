import { orderRepository } from "../../db/order/orderRepository.js"
import type { OrderItemsType, OrderType, UserOrderInfoType } from "../../types/types.js"
import { dateExpire, dateNow } from "../../utils/utils.js"
import Cart from "../cart/services.cartAdd.js"
import { servicesPromocodes } from "../promocodes/services.promocodes.js"

export const servicesCreateOrder = {
  //Создание ордера
    async createOrder({order_id, invoiceId, user_id, full_name, phone_number, city, department, email, comment, call, localCart, promocode}: 
        {order_id:string, invoiceId:string, user_id: number, full_name:string, phone_number: number, city:string, department:string, email:string | null, comment:string | null, call:string, localCart:any[], promocode?: string | undefined}) {
           try {
            const cart = new Cart(localCart) 
            let total_price = await cart.getTotalCartPrice()
            let sale:string | undefined
            //Проверка на промокод
            if (promocode) {
              const promocodeData = await servicesPromocodes.findPromocodeByCode(promocode)
              if (promocodeData && promocodeData.is_active === "true") {       
                total_price = total_price - (total_price * (promocodeData.discount_percent / 100))   
                sale = `${promocodeData.discount_percent.toString()}%`
            }
          }
          
            await orderRepository.createOrder(order_id, invoiceId, user_id, full_name, String(phone_number), city, 
            department, email, comment, call, total_price, promocode, sale, "in procces", dateNow(), dateExpire(30).toString())          
           } catch (error) {
            console.error(error);    
             throw new Error("Не удалось создать заказ");        
           }
    },
    //Создание Ордер айтемов
    async createOrderItem({user_id, localCart}: {user_id: number, localCart:any[]}) {
      
          try {
            const cart = new Cart(localCart)            
            const cartItems = await cart.getCartItems()
            const order_id = (await orderRepository.getOrderId(user_id)).order_id   
            await orderRepository.createOrderItem(order_id, cartItems)
          } catch (error) {
            console.error("orderItems: " + error);       
          }    
    },
//Получение короткой информации о заказе
    async getOrders() {
        const orders = await orderRepository.getOrders()
        const response:any = []
        orders.map(order => {response.push({id: order.order_id, created_at: order.created_at, status: order.status})})
        return response
    },
//Получение заказов пользователя
    async getUserOrders({user_id}:{user_id:number}) {
        const orders = await orderRepository.getUserOrders(user_id)
        const response:any = []
        orders.map(order => {response.push({id: order.order_id, created_at: order.created_at, status: order.status})})
        return response
    },
//Получение полной информации о заказе 
    async getFullOrders({order_id}: {order_id:string}) {
        const order = await orderRepository.getOrder(order_id)
        const order_items = await orderRepository.getOrderItems(order_id)
        
        const response:{order:OrderType, order_items:OrderItemsType[]} = {order, order_items}
        return response
    },
//Обновление статуса заказа
    async updateStatus({order_id, invoiceId, order_status, force}: {order_id?:string, invoiceId?:string, order_status:string, force:boolean}) {
      try {
        await orderRepository.updateStatus(order_id, invoiceId, order_status, force)
      } catch (error) {
        console.error(error);
        
      }   
    },
//Обновление банковского ордерАйди
    async updateInvoiceId({order_id, invoiceId}: {order_id:string, invoiceId:string}) {
      try {
        await orderRepository.updateInvoiceId(order_id, invoiceId)
      } catch (error) {
        console.error(error);
      }
    },
//Обновление данных о заказе пользователя
    async updateUserOrderInfo(order_id:string, user_id:number, userInfo:UserOrderInfoType) {
      try {
        const order = await orderRepository.getUserOrder(order_id, user_id)
        
        if (!order || Number(order.returning_time) < Date.now()) {
          throw new Error("Не знайденно такого замовлення або користувача")
        }
        await orderRepository.updateUserOrderInfo(order_id, userInfo)
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
//Удаление ордера
    async deleteOrder({ order_id }: { order_id: string }) {
    try {
      const order = await orderRepository.getOrder(order_id)
        if (Number(order.returning_time) < Date.now()) {
          throw new Error("Час на видалення сплинув :(")
        }
        if (!order || Number(order.returning_time) < Date.now()) {
          throw new Error("Не знайденно такого замовлення або користувача")
        }
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