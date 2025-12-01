import { Router, type Request, type Response } from "express";
import { servicesGetProducts } from "../../services/produtcs/services.getProducts.js";
import { checkAdmin } from "../../middleware/middleware.admin.js";


const router = Router()

router.get('/getproducts_data', async (req, res) => { //checkAdmin,
    const raw = req.query.search
    const sort = req.query.sort as "asc" | "desc"
    let search: string
    if (Array.isArray(raw)) {
        search = typeof raw[0] === "string" ? raw[0] : ""
    } else if (typeof raw === "string") {
        search = raw
    } else {
        search = ""
    }
    try {
        const data = await servicesGetProducts.getProducts({search, sort})
        return res.status(200).json(data)
    } catch (error:any) {
        return res.status(error.status || 500).json({message: error.message})
    }
})
router.get('/getproduct_data', async (req, res) => { //checkAdmin,
    const raw = req.query.search
    let search: string
    if (Array.isArray(raw)) {
        search = typeof raw[0] === "string" ? raw[0] : ""
    } else if (typeof raw === "string") {
        search = raw
    } else {
        search = ""
    }
    try {
        const data = await servicesGetProducts.getProduct({search})
        return res.status(200).json(data)
    } catch (error:any) {
        return res.status(error.status || 500).json({message: error.message})
    }
})



export default router