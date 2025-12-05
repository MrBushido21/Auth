import { Router } from "express";
import { checkAuth } from "../../middleware/middleware.auth.js";
import { servicesRewie } from "../../services/rewie/services.rewie.js";
import { productsRepository } from "../../db/products/productsRepository.js";
import { servicesGetProducts } from "../../services/produtcs/services.getProducts.js";
import { userRepository } from "../../db/user/userRepository.js";

const router = Router()
      
router.get('/getrewies', async (req, res) => {
    let product_id:number

    if (req.query.id && !Array.isArray(req.query.id)) {
        product_id = +req.query.id
    } else {
        return res.status(404).json({error: "product undefined"})
    }

    
    try {
        const rewies = await servicesRewie.getRewies({product_id})
        let id = product_id
        const product = await servicesGetProducts.getProduct({id})
        return res.status(200).json({rewies, product})
    } catch (error) {
        return res.status(500).json({error: "somthing wrong"})
    }
})

export default router