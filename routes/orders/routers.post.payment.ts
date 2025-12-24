import { Router } from "express";
import { ServicesPayment } from "../../services/payment/servicesPayment.js";
import { servicesCreateOrder } from "../../services/orders/services.createOrder.js";
import { checkAuth } from "../../middleware/middleware.auth.js";
import { chekUser } from "../../utils/utils.js";
import Cart from "../../services/cart/services.cartAdd.js";
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

            
            const {invoiceId, pageUrl} = await ServicesPayment.pay({amount})
            await servicesCreateOrder.createOrder({invoiceId, user_id, full_name, phone_number, city, department, 
              email, comment, call, localCart})
            return res.status(200).json(pageUrl)
        }
    } catch (error:any) {
        return res.status(error.status || 500).json({error: error.message})  
    }
  
});



router.post("/payment/callback", async (req, res) => {
  const {invoiceId, status, payMethod, amount, ccy, finalAmount, modifiedDate, paymentInfo} = req.body

  if (status === "success") {
   try {
     await ServicesPayment.savePayment({invoiceId, status, payMethod, amount, ccy, finalAmount, modifiedDate, 
    paymentInfo})
    const order_status = "paid"
    await servicesCreateOrder.updateStatus({invoiceId, order_status})
   } catch (error) {
    console.error(error);
   }
  }
res.sendStatus(200);
});



export default router;

