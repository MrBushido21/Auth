import { Router } from "express"
import { servicesCreateOrder } from "../../services/orders/services.createOrder.js"
import { checkAuth } from "../../middleware/middleware.auth.js"
import { chekUser } from "../../utils/utils.js"

const router = Router()

router.delete('/delete-order', checkAuth, async (req, res) => {
    const { order_id} = req.body 
    const user_id = chekUser(req)
       
    if (!order_id) {
        return res.status(400).json({message: 'Неверные данные'})
    }
    try {
        if(user_id) {
            await servicesCreateOrder.deleteOrder({order_id, user_id})
        return res.status(200).json({message: 'Заказ был отменен успешно'})
        } else {
            return res.status(500).json({message: "Iternal server error"})
        }
    } catch (error:any) {
        return res.status(400).json({message: error.message || "Iternal serverr error"})
    }
})

export default router