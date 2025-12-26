import type { NextFunction, Request, Response} from "express"
import { orderRepository } from "../db/order/orderRepository.js"


//проверка атентификации по токену
export const verifyBankSign = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderRepository.getOreder(req.body.invoiceId)
    next()
  } catch (error) {
    return res.status(403).json({ message: 'Uncorrect signature' })
  }
  
} 