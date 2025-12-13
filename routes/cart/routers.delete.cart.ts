import { Router, type Request, type Response } from "express"
import { checkAuth } from "../../middleware/middleware.auth.js"
import Cart from "../../services/cart/services.cartAdd.js"
import { chekUser } from "../../utils/utils.js"

const router = Router()

router.delete('/deletecartitem', checkAuth, async (req:Request<{}, {}, {}, {id:string}>, res:Response) => {
    const product_id = req.query.id
    const user_id = chekUser(req)
    try {
        if (user_id && product_id) {
            const cart = new Cart(user_id, +product_id, "", 0, 0)
            await cart.deleteCartItem()
            return res.status(200).json({message: "success"})
        } 
    } catch (error:any) {
        console.error(error);
        return res.status(error.status || 500).json({error: error.message})
    }
    
})

router.delete('/clearcart', checkAuth, async (req:Request, res:Response) => {
    const user_id = chekUser(req) 

    try {
        if (user_id) {
            const cart = new Cart(user_id, 0, "", 0, 0)
            await cart.deleteCartItemWithCartId()
            return res.status(200).json({message: "cart is clear"})
        }  
    } catch (error) {
        
    }
})
export default router