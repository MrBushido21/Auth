import { Router, type Request, type Response } from "express";
import Cart from "../../services/cart/services.cartAdd.js";
import { checkAuth } from "../../middleware/middleware.auth.js";
import { servicesCreateOrder } from "../../services/orders/services.createOrder.js";
import { cartRepository } from "../../db/cart/cartRepository.js";
import { servicesUpdateQuantityProduct } from "../../services/produtcs/services.updateQuantityProduct.js";
import { orderRepository } from "../../db/order/orderRepository.js";
import { validation } from "../../middleware/middleware.validation.js";
import { orderSchema } from "../../shemas/validation.js";
import { chekQueryId, chekUser } from "../../utils/utils.js";
import type { CreateOrderType } from "../../types/requests.js";

const router = Router();


router.post('/create-order', checkAuth, validation(orderSchema), async (req: Request<{}, {}, CreateOrderType>, res: Response) => { // limiter
    const { full_name, phone_number, call, department, city, email, comment } = req.body
    const user_id = chekUser(req)  
   
    try {
        if (user_id) {
            const cart = new Cart(user_id, 0, "", 0, 0)
            const total_price = await cart.getTotalCartPrice()
            
            if (total_price === 0) {
                return res.status(400).json({error: "Please add somthig item to your cart"})
            }
            const cart_items = await cart.getCartItemsWithCartId()              
            await servicesUpdateQuantityProduct.updateQuantityProduct({cart_items}) 
            await servicesCreateOrder.createOrder({user_id, full_name, phone_number, city, department, email, comment, call})
            await servicesCreateOrder.createOrderItem({user_id})
            await cart.deleteCartItemWithCartId() 
            return res.status(200).json({message: "order has created"})
        }
    } catch (error:any) {
        return res.status(error.status || 500).json({error: error.message})  
    }
})
router.patch('/order/update-status', checkAuth, async (req: Request<{}, {}, {status:string}>, res: Response) => { // limiter
    const status = req.body.status
  
    const order_id = chekQueryId(req)
    
    try {
        if (order_id && order_id !== 0) {
            await servicesCreateOrder.updateStatus({order_id, status})
            return res.status(200).json({message: "status was updated"})
        } else {
            return res.status(404).json({message: "uncorrect order_id"})
        }
        
    } catch (error:any) {
        return res.status(error.status || 500).json({error: error.message})  
    }
})



export default router