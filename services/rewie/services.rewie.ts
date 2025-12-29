import { rewiesRepository } from "../../db/rewies/rewiesRepository.js"
import { dateNow } from "../../utils/utils.js"
import { UserHasNotPurchasedError } from "../errors/services.errors.js"
import { servicesCreateOrder } from "../orders/services.createOrder.js"

export const servicesRewie = {
    async create({product_id, user_id, user_name, comment, advantage, flaws, rating}: 
        {product_id:number, user_id:number, user_name:string, comment:string, advantage:string, flaws:string, rating:number}) {  

        try {
            const userOrders = await servicesCreateOrder.getUserOrders({user_id})
            if (userOrders.length === 0) {
                throw new Error("Користувач не купував цей товар")
            }
            for (const order of userOrders) {
                const order_id = order.id
               const fullOrders = await servicesCreateOrder.getFullOrders({order_id})
               
               const order_items = fullOrders.order_items
                for (const item of order_items) {                   
                    if (Number(item.product_id) === Number(product_id)) {                       
                        // User has purchased the product
                        return await rewiesRepository.createrRewies(product_id, user_id, user_name, comment, advantage, flaws, rating, dateNow())   
                    }
                }
                // Если дошли сюда — значит пользователь не покупал товар
            throw new UserHasNotPurchasedError("Ви не купували цей товар. Відгуки залишати можуть лише ті хто купив цей товар")
        }
        } catch (error) {
            if (error instanceof UserHasNotPurchasedError) {
                // Передаем ошибку дальше как обычное уведомление для пользователя
                throw error
            }
            // Любая другая ошибка — системная
            console.error(error)
            throw new Error("Server error")
        }
    }, 

    async getRewies({product_id}: {product_id:number}) {
        try {
            const rewies = await rewiesRepository.getRewies(product_id)
            return rewies
        } catch (error) {
            console.error(error);          
        }
    }
}