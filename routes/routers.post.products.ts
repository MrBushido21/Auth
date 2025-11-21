import { Router, type Request, type Response } from "express";
import type { CartType, ProductType } from "../types/types.js";
import Admin from "../services/admin/services.admin.js";
import { decodedAccsesToken } from "../utils/utils.js";
import Cart from "../services/produtcs/services.cartAdd.js";
import { checkAuth } from "../middleware/middleware.auth.js";

const router = Router();

router.post('/createproduct', async (req: Request, res: Response) => {
    const data: ProductType = req.body.data
    if (!data) {
        return res.status(404).json({message: "Data undefined"})
    }

    const adminController = new Admin(data)
    try {
    await adminController.createdProduct()
    return res.status(200).json({message: "Product created"})
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({message: "Somthing error"})  
    }
    
})

router.post('/cart/add', checkAuth, async (req: Request, res: Response) => {
    const {user, product_id, quantity, price} = req.body
    
    const cart = new Cart(user.id, product_id, quantity, price)
    await cart.getOrCreateCart()
    await cart.controllerCartItems()
    const cartItems = await cart.getCartItemsWithCartId()
    
    return res.status(200).json(cartItems)
    
})

// router.post('/deletecart', checkAuth, async (req: Request, res: Response) => {
//     const {user} = req.body
//     const cart = new Cart(user.id, 0, 0, 0)

// })

export default router