import { Router, type Request, type Response } from "express";
import Cart from "../../services/cart/services.cartAdd.js";
import { checkAuth } from "../../middleware/middleware.auth.js";
import { servicesCreateOrder } from "../../services/orders/services.createOrder.js";
import { cartRepository } from "../../db/cart/cartRepository.js";
import { servicesUpdateQuantityProduct } from "../../services/produtcs/services.updateQuantityProduct.js";
import { orderRepository } from "../../db/order/orderRepository.js";
import { validation } from "../../middleware/middleware.validation.js";
import { orderSchema } from "../../shemas/validation.js";
import { chekQueryId, chekUser, generateCode } from "../../utils/utils.js";
import type { CreateOrderType } from "../../types/requests.js";

const router = Router();

 router.post('/create-order', checkAuth, validation(orderSchema), async (req: Request<{}, {}, CreateOrderType>, res: Response) => { // limiter
    const { full_name, phone_number, call, department, city, email, comment } = req.body
    const user_id = chekUser(req)  
    const localCart = req.body.localCart
   
    try {
        if (user_id) {
            const cart = new Cart(localCart)
            const total_price = await cart.getTotalCartPrice()
            
            if (total_price === 0) {
                return res.status(400).json({error: "Please add somthig item to your cart"})
            }
            const cart_items = await cart.getCartItems()              
            await servicesUpdateQuantityProduct.updateQuantityProduct({cart_items})
            const order_id = generateCode().toString() 
            await servicesCreateOrder.createOrder({order_id, user_id, full_name, phone_number, city, department, email, comment, call, localCart})
            await servicesCreateOrder.createOrderItem({user_id, localCart})
            const order_status = "pri otrimany"
            await servicesCreateOrder.updateStatus({order_id, order_status})
            return res.status(200).json({message: "order has created"})
        }
    } catch (error:any) {
        return res.status(error.status || 500).json({error: error.message})  
    }
})
router.patch('/order/update-status', checkAuth, async (req: Request<{}, {}, {status:string}>, res: Response) => { // limiter
    const order_status = req.body.status
    let order_id:string
    if (typeof req.query.id === 'string') {
        order_id = req.query.id;
    } else {
        return res.status(400).json({message: "uncorrect order_id"})
    }

    try {
        await servicesCreateOrder.updateStatus({order_id, order_status})
        return res.status(200).json({message: "status was updated"})
        
    } catch (error:any) {
        return res.status(error.status || 500).json({error: error.message})  
    }
})



export default router