import { Router } from "express";
import { checkAuth } from "../../middleware/middleware.auth.js";
import { servicesRewie } from "../../services/rewie/services.rewie.js";

const router = Router()

router.post('/createrewie', checkAuth, async (req, res) => {
    const user = req.user
    let user_id:number
    const {product_id, comment, advantage, flaws, rating } = req.body

    if (!product_id) {
        return res.status(404).json({error: "product undefined"})
    }

    if (user && typeof user !== "string") {
       user_id = user.id 
    } else {
        return res.status(404).json({error: "user undefined"})
    }

    try {
        await servicesRewie.create({product_id, user_id, comment, advantage, flaws, rating})
    } catch (error) {
        return res.status(500).json({error: "somthing wrong"})
    }
})

export default router