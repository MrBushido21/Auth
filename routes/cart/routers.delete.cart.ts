import { Router, type Request, type Response } from "express"
import { checkAuth } from "../../middleware/middleware.auth.js"
import Cart from "../../services/produtcs/services.cartAdd.js"

const router = Router()

router.delete('/deletecartitem', checkAuth, async (req:Request, res:Response) => {
    const product_id = req.query.id
    let user = req.user
    let user_id: number | undefined = 0
    if (user && typeof user !== "string") {
        user_id = user.id      
    }  else {
        user_id = req.user_id
    } 
    try {
        if (user_id && product_id) {
            const cart = new Cart(user_id, +product_id, 0, 0)
            await cart.deleteCartItem()
            return res.status(200).json({message: "success"})
        } 
    } catch (error:any) {
        console.error(error);
        return res.status(error.status || 500).json({error: error.message})
    }
    
})

router.delete('/clearcart', checkAuth, async (req:Request, res:Response) => {
    //Корзину нельзя удалять ее нужно очищать
    const user = req.user
    try {
        if (user && typeof user !== "string") {
            const cart = new Cart(user.id, 0, 0, 0)
            await cart.deleteCartItemWithCartId()
            return res.status(200).json({message: "cart is clear"})
        }  
    } catch (error) {
        
    }
})
export default router