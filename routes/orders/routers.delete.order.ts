import { Router } from "express"
import { servicesCreateOrder } from "../../services/orders/services.createOrder.js"

const router = Router()

router.delete('/delete-order', async (req, res) => {
    const { order_id} = req.body 
    if (!order_id) {
        return res.status(400).json({message: 'Неверные данные'})
    }
    try {
        await servicesCreateOrder.deleteOrder({order_id})
        return res.status(200).json({message: 'Заказ был отменен успешно'})
    } catch (error:any) {
        return res.status(400).json({message: error.message || "Iternal serverr error"})
    }
})

export default router