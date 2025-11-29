import { Router, type Request, type Response } from "express";
import { getAllProducts } from "../../db/products/db.dao.js";
import { servicesGetProducts } from "../../services/produtcs/services.getProducts.js";
import Cart from "../../services/produtcs/services.cartAdd.js";
import { checkAuth } from "../../middleware/middleware.auth.js";
import type { PayloadType } from "../../types/types.js";

const router = Router()

router.get('/getcartitems', checkAuth, async (req:Request, res: Response) => {
    let user = req.user
    let user_id: number | undefined = 0
    if (user && typeof user !== "string") {
        user_id = user.id      
    }  else {
        user_id = req.user_id
    } 
    
    try {
        if (user_id) {                 
        const cart = new Cart(user_id, 0, "", 0, 0)
        const cartItems = await cart.getCartItemsWithCartId()          
        return res.status(200).json(cartItems)
        }
    } catch (error:any) {
        return res.status(error.status || 500).json({message: error.message})
    }
})

export default router