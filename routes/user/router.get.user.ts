import { Router } from "express";
import { checkAuth } from "../../middleware/middleware.auth.js";
import User from "../../services/user/servicesClassUser.js";
import { servicesCreateOrder } from "../../services/orders/services.createOrder.js";
import { chekUser } from "../../utils/utils.js";

const router = Router()

router.get('/getuser', checkAuth, async (req, res) => {
    const user_id = chekUser(req)
    
    if (user_id) {
        try {
            const userClass = new User(user_id)
            const user = await userClass.getUser()
            const orders = await servicesCreateOrder.getUserOrders({user_id})           
            return res.status(200).json({email: user.email, avatar: user.avatar, orders: orders})
            
        } catch (error) {
            console.error(error);
            return res.status(404).json({message: "User in not autorisation"})
            
        }
    }
})

export default router