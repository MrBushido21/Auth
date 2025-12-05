import { Router, type Request, type Response } from "express";
import { servicesGetProducts } from "../../services/produtcs/services.getProducts.js";
import { checkAdmin } from "../../middleware/middleware.admin.js";
import { productsRepository } from "../../db/products/productsRepository.js";


const router = Router()

router.get('/getproducts_data', async (req, res) => { //checkAdmin,
    const raw = req.query.search
    const sort = req.query.sort as "asc" | "desc"
    let page = 0
    let search: string
    if (Array.isArray(raw)) {
        search = typeof raw[0] === "string" ? raw[0] : ""
    } else if (typeof raw === "string") {
        search = raw
    } else {
        search = ""
    }
    
    if (req.query.page && !Array.isArray(req.query.page)) {
        page = +req.query.page
    }

    try {
        const data = await servicesGetProducts.getProducts({search, sort, page})
        return res.status(200).json(data)
    } catch (error:any) {
        return res.status(error.status || 500).json({message: error.message})
    }
})

router.get('/getproduct', async (req, res) => {
    let id:number

    if (req.query.id && !Array.isArray(req.query.id)) {
        id = +req.query.id
    } else {
        return res.status(404).json({message: "product undefined"})
    }
    
    try {
        const product = await servicesGetProducts.getProduct({id})
        return res.status(200).json(product)
    } catch (error:any) {
        return res.status(500).json({error: error.message})
    }
})


export default router