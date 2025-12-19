import { Router, type Request, type Response } from "express";
import { getAllProducts } from "../../db/products/db.dao.js";
import { servicesGetProducts } from "../../services/produtcs/services.getProducts.js";
import Cart from "../../services/cart/services.cartAdd.js";
import { checkAuth } from "../../middleware/middleware.auth.js";
import type { PayloadType } from "../../types/types.js";
import { chekUser } from "../../utils/utils.js";

const router = Router()
//Get который стал пост но логически остаеться GET
router.post('/getcartitems', async (req:Request, res: Response) => {
    const localCart = req.body
    //показывать количество в наявности 
    try {
        const cart = new Cart(localCart)
        const cartItems = await cart.getCartItems()       
        const totalPrice = await cart.getTotalCartPrice()          
        return res.status(200).json({cartItems, totalPrice})

        //Сейчас высылаем продукт а нужно слать cartItems, отфильтровать нужно что шлю
    } catch (error:any) {
        return res.status(error.status || 500).json({message: error.message})
    }
})

export default router