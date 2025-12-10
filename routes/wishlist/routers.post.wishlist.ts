import { Router, type Request } from "express";
import { checkAuth } from "../../middleware/middleware.auth.js";
import Wishlist from "../../services/wishlist/servicesWishList.js";

const router = Router()

router.post('/createwishlist', checkAuth, async (req:Request<{}, {}, {product_id:number}>, res) => {
    const user = req.user
    let user_id:number
    const product_id = req.body.product_id

    if (user && typeof user !== "string") {
        user_id = user.id
    } else {
        return res.status(404).json({error: "user undefined"})
    }

    try {
        const wishList = new Wishlist(user_id, product_id)
        await wishList.create()
        return res.status(200).json({message: "Додано товар до улюблений"})
    } catch (error) {
        return res.status(500).json({error: "somthing wrong"}) 
    }
})

export default router