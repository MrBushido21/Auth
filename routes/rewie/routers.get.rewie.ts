import { Router, type Request } from "express";
import { checkAuth } from "../../middleware/middleware.auth.js";
import { servicesRewie } from "../../services/rewie/services.rewie.js";
import { productsRepository } from "../../db/products/productsRepository.js";
import { servicesGetProducts } from "../../services/produtcs/services.getProducts.js";
import { userRepository } from "../../db/user/userRepository.js";
import { chekQueryId } from "../../utils/utils.js";

const router = Router()
      
router.get('/getrewies', async (req:Request<{}, {}, {}, {id:string}>, res) => {
    const product_id = chekQueryId(req)
 
    try {
        if (product_id && product_id !== 0) {
        const rewies = await servicesRewie.getRewies({product_id})
        let id = product_id
        const product = await servicesGetProducts.getProduct({id})
        return res.status(200).json({rewies, product})
        } else {
            return res.status(404).json({error: "product undefined"})
        }
    } catch (error) {
        return res.status(500).json({error: "somthing wrong"})
    }
})

export default router