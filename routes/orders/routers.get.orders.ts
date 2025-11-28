import { Router } from "express"
import { orderRepository } from "../../db/order/orderRepository.js"
import { servicesCreateOrder } from "../../services/orders/services.createOrder.js"

const router = Router()

router.get('/orders', async (req, res) => {
    try {
        const result = await servicesCreateOrder.getOrders()
        return res.status(200).json(result)
    } catch (error:any) {
        return res.status(500).json({error: error.message})
    }
})
export default router