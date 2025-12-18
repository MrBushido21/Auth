import { Router, type Request, type Response } from "express";
import Cart from "../../services/cart/services.cartAdd.js";
import { checkAuth } from "../../middleware/middleware.auth.js";
import { chekUser } from "../../utils/utils.js";

const router = Router();


router.post('/cart/add', checkAuth, async (req: Request<{}, {}, {product_id:number}>, res: Response) => {
    const { product_id } = req.body
    const user_id = chekUser(req)
    console.log(user_id);
    
    try {
        if (user_id) {
            const cart = new Cart(user_id, product_id, "", 1, 0)
            await cart.getOrCreateCart()
            await cart.controllerCartItems()
            await cart.incrTotalPrice()
            const cartItems = await cart.getCartItemsWithCartId()
            return res.status(200).json(cartItems)
        }
    } catch (error:any) {
        return res.status(error.status || 500).json(error.message)
    }

})
router.post('/cart/quantity', checkAuth, async (req: Request<{}, {}, {operator: "+" | "-"}, {id:string}>, res: Response) => {
    const product_id = req.query.id
    const user_id = chekUser(req)
    
    try {
        if (user_id && product_id) {
            const cart = new Cart(user_id, +product_id, "", 0, 0)
            if (req.body.operator === "+") {
                await cart.increaseQuntity() 
                await cart.incrTotalPrice() 
            } else {
                await cart.decreaseQuntity() 
                await cart.decrTotalPrice()
            }
           
            const cartItems = await cart.getCartItemsWithCartId()
            return res.status(200).json(cartItems)
        }
    } catch (error:any) {
        return res.status(error.status || 500).json(error.message)
    }

})



export default router