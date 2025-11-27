import { Router, type Request, type Response } from "express";
import { getAllProducts } from "../../db/products/db.dao.js";
import { servicesGetProducts } from "../../services/produtcs/services.getProducts.js";
import Cart from "../../services/produtcs/services.cartAdd.js";
import { checkAuth } from "../../middleware/middleware.auth.js";
import type { PayloadType } from "../../types/types.js";

const router = Router()

router.get('/getproducts_data', async (req, res) => {
    try {
        const data = await servicesGetProducts.getProducts()
        return res.status(200).json(data)
    } catch (error:any) {
        return res.status(error.status).json({message: error.message})
    }
})

export default router