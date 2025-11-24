import { Router, type Request, type Response } from "express";
import { getAllProducts } from "../db/products/db.dao.js";
import { servicesGetProducts } from "../services/produtcs/services.getProducts.js";
import Cart from "../services/produtcs/services.cartAdd.js";
import { checkAuth } from "../middleware/middleware.auth.js";
import type { PayloadType } from "../types/types.js";

const router = Router()

router.get('/getproducts_data', async (req, res) => {
    try {
        const data = await servicesGetProducts.getProducts()
        return res.status(200).json(data)
    } catch (error:any) {
        return res.status(error.status).json({message: error.message})
    }
})
router.get('/getcartitems', checkAuth, async (req:Request, res: Response) => {
    const user = req.user
    //Чтото придумать с корзиной когда нету корзині у пользователя когда ее создавать
    try {
        if (user && typeof user !== "string") {      
        const cart = new Cart(user.id, 0, 0, 0)
        const cartItems = await cart.getCartItemsWithCartId()  
        return res.status(200).json(cartItems)
        }
    } catch (error:any) {
        return res.status(error.status || 500).json({message: error.message})
    }
})
export default router