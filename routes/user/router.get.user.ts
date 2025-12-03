import { Router } from "express";
import { checkAuth } from "../../middleware/middleware.auth.js";
import User from "../../services/user/servicesClassUser.js";
import { servicesCreateOrder } from "../../services/orders/services.createOrder.js";

const router = Router()

router.get('/getuser', checkAuth, async (req, res) => {
    let user = req.user
    let user_id: number | undefined = 0
    if (user && typeof user !== "string") {
        user_id = user.id      
    }  else {
        user_id = req.user_id
    } 

    if (user_id) {
        try {
            const userClass = new User(user_id)
            const user = await userClass.getUser()
            const orders = await servicesCreateOrder.getOrders()           
            return res.status(200).json({email: user.email, orders: orders})
            
        } catch (error) {
            
        }
    }
})

export default router