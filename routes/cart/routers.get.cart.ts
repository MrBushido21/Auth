import { Router, type Request, type Response } from "express";
import { getAllProducts } from "../../db/products/db.dao.js";
import { servicesGetProducts } from "../../services/produtcs/services.getProducts.js";
import Cart from "../../services/cart/services.cartAdd.js";
import { checkAuth } from "../../middleware/middleware.auth.js";
import type { PayloadType } from "../../types/types.js";
import { chekUser } from "../../utils/utils.js";

const router = Router()

router.get('/getcartitems', checkAuth, async (req:Request, res: Response) => {
    const user_id = chekUser(req)
    
    try {
        if (user_id) {                 
        const cart = new Cart(user_id, 0, "", 0, 0)
        const cartItems = await cart.getCartItemsWithCartId()          
        const totalPrice = await cart.getTotalCartPrice()          
        return res.status(200).json({cartItems, totalPrice})
        }
    } catch (error:any) {
        return res.status(error.status || 500).json({message: error.message})
    }
})

export default router