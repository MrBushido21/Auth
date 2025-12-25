import { Router, type Request } from "express";
import { checkAuth } from "../../middleware/middleware.auth.js";
import { servicesRewie } from "../../services/rewie/services.rewie.js";
import Admin from "../../services/admin/services.admin.js";
import type { CreaterewieType } from "../../types/requests.js";
import { number } from "zod";

const router = Router()
      
router.post('/createrewie', checkAuth, async (req:Request<{}, {}, CreaterewieType>, res) => {
    const user = req.user
    let user_id:number
    let user_name:string
    const {product_id, comment, advantage, flaws, rating } = req.body

    if (!product_id) {
        return res.status(404).json({error: "product undefined"})
    }

    if (user && typeof user !== "string") {
       user_id = user.id 
       user_name = user.email
    } else {
        return res.status(404).json({error: "user undefined"})
    }

    const data = {
        id: product_id,
        title: "",
        description: "",
        price: 0,
        image_url: "",
        category_id: 0,
        quantity: 0,
        rating: rating,
        qntrewies: 0,
        public_id:"", 
        category:"", 
        sale:0,
        created_at: "",
        updated_at: ""
    }

    try {
        await servicesRewie.create({product_id, user_id, user_name, comment, advantage, flaws, rating})
        const adminController = new Admin(data)
        await adminController.updateRating()
        return res.status(200).json({message: "Відгук додано"})
    } catch (error) {
        return res.status(500).json({error: "somthing wrong"})
    }
})

export default router