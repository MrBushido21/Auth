import { Router, type Request, type Response } from "express";
import Cart from "../../services/produtcs/services.cartAdd.js";
import { checkAuth } from "../../middleware/middleware.auth.js";
import { servicesCreateOrder } from "../../services/orders/services.createOrder.js";

const router = Router();


router.post('/create-order', checkAuth, async (req: Request, res: Response) => {
    const { full_name, phone_number, call, city, email, comment } = req.body
    let user = req.user
    let user_id: number | undefined = 0
    if (user && typeof user !== "string") {
        user_id = user.id      
    }  else {
        user_id = req.user_id
    } 
    //Почему обрезаеться 0 в БД
    try {
        if (user_id) {
            await servicesCreateOrder.createOrder({user_id, full_name, phone_number, city, email, comment, call})
            await servicesCreateOrder.createOrderItem({user_id})
            return res.status(200).json({message: "order has created"})
        }
    } catch (error:any) {
        return res.status(500).json({error: error.message})  
    }
})



export default router