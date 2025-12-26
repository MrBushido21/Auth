import { Router } from "express";
import { ServicesPayment } from "../../services/payment/servicesPayment.js";
import { servicesCreateOrder } from "../../services/orders/services.createOrder.js";
import { checkAuth } from "../../middleware/middleware.auth.js";
import { chekOrderStatus, chekUser, generateCode } from "../../utils/utils.js";
import Cart from "../../services/cart/services.cartAdd.js";
import { verifyBankSign } from "../../middleware/middleware.verifyBankSign.js";
import { orderRepository } from "../../db/order/orderRepository.js";
const router = Router();


router.post("/api/payment", checkAuth, async (req, res) => {
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
            
            const amount = total_price * 100
            let order_id = generateCode()
            await servicesCreateOrder.createOrder({order_id, invoiceId: "", user_id, full_name, phone_number, city, department, 
              email, comment, call, localCart})
            const {invoiceId, pageUrl} = await ServicesPayment.pay({amount, order_id})
            await servicesCreateOrder.updateInvoiceId({order_id, invoiceId})
            await servicesCreateOrder.createOrderItem({user_id, localCart})
            return res.status(200).json(pageUrl)
        }
    } catch (error:any) {
        return res.status(error.status || 500).json({error: error.message})  
    }
  
});


const secret = process.env.PAYMENT_SECRET_KEY as string

router.post("/payment/callback", verifyBankSign, async (req:any, res:any) => {
  
  const {invoiceId, status, payMethod, amount, ccy, finalAmount, modifiedDate, paymentInfo} = req.body
  const force = false
  if (status === "success") {
   try {
    chekOrderStatus(invoiceId)
     await ServicesPayment.savePayment({invoiceId, status, payMethod, amount, ccy, finalAmount, modifiedDate, 
    paymentInfo})
    const order_status = "paid"
    await servicesCreateOrder.updateStatus({invoiceId, order_status, force})
   } catch (error:any) {
    console.error(error);
    return res.status(error.status || 500).json({error: error.message})   
   }
  } else if (status === "failed" || status === "expired") {
    chekOrderStatus(invoiceId)
    const order_status = "payment_failed"
    try {
      //не меняет статус
      await servicesCreateOrder.updateStatus({invoiceId, order_status, force})
    } catch (error:any) {
      console.error(error);
      return res.status(error.status || 500).json({error: error.message})      
    }
  }
res.sendStatus(200);
});

router.get("/payment/status_check", async (req, res) => {
 try {
   const order_status = (await orderRepository.getOreder(req.query.order_id as string)).status
   
  if (order_status === "paid") {
    return res.status(200).json({status: "yes"})
  } else {
    return res.status(200).json({status: "not paid"})
  }
 } catch (error) {
  console.error(error);
  return res.status(500).json({error: "Server error"}); 
 }
})


export default router;

