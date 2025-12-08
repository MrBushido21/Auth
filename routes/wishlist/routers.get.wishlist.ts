import { Router } from "express";
import { checkAuth } from "../../middleware/middleware.auth.js";
import Wishlist from "../../services/wishlist/servicesWishList.js";

const router = Router()

router.get('/getwishlist', checkAuth, async (req, res) => { //
    const user = req.user
    let user_id:number

    if (user && typeof user !== "string") {
        user_id = user.id
    } else {
        return res.status(404).json({error: "user undefined"})
    }

    try {
        const wishList = new Wishlist(user_id, 0)
        const items = await wishList.getAll()
        return res.status(200).json(items)
    } catch (error) {
        return res.status(500).json({error: "somthing wrong"}) 
    }
})

export default router