import { Router, type Request } from "express"
import { orderRepository } from "../../db/order/orderRepository.js"
import { servicesCreateOrder } from "../../services/orders/services.createOrder.js"
import { chekQueryId } from "../../utils/utils.js"

const router = Router()

router.get('/orders', async (req, res) => {
    try {
        const result = await servicesCreateOrder.getOrders()
        return res.status(200).json(result)
    } catch (error:any) {
        return res.status(500).json({error: error.message})
    }
})
router.get('/admin/full-order', async (req:Request<{}, {}, {}, {id:string}>, res) => {
    let order_id:string
    if (typeof req.query.id === "string") {
        order_id = req.query.id
    } else {
        return res.status(404).json({message: "uncorrect order_id"})
    }
    try {
        const result = await servicesCreateOrder.getFullOrders({order_id})
        return res.status(200).json(result) 
        
    } catch (error:any) {
        return res.status(500).json({error: error.message})
    }
})

export default router