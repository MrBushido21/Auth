import { Router, type Request, type Response } from "express";
import { checkAuth } from "../../middleware/middleware.auth.js";
import Wishlist from "../../services/wishlist/servicesWishList.js";
import type { GetproductsDataType } from "../../types/requests.js";
import type { OrderFilter } from "../../types/types.js";

const router = Router()

router.get('/getwishlist', checkAuth, async (req, res) => { //
    let user_id:number

    if (req.user) {
    const user = req.user
    
    if (user && typeof user !== "string") {
        user_id = user.id
    }  else {
        return res.status(404).json({error: "user undefined"})
    }
    } else {
        return res.status(404).json({error: "user undefined"})
    }

   const raw = req.query.search
    let filter:OrderFilter = "price"
    

    let category_id = 0
    let page = 0
    let search: string
    let sort:"asc" | "desc" = "asc"
    let in_stock:boolean | undefined
    let sale:boolean | undefined

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
    if (req.query.category_id && !Array.isArray(req.query.category_id)) {
        category_id = +req.query.category_id
    }
    if (req.query.sort === "asc" || req.query.sort === "desc") {
        sort = req.query.sort
    }
    if (req.query.filter === "price" || req.query.filter ===  "rating" || req.query.filter ===  "created") {
        filter = req.query.filter
    } else {
        return res.status(500).json({message: "Iternal server error"})
    }
    if (req.query.in_stock) {
        in_stock = true
    } 

    if (req.query.sale) {
        sale = true
    }


    try {
        const wishList = new Wishlist(user_id, 0)
        const items = await wishList.getAll(search, sort, page, category_id, in_stock, sale, filter)
        return res.status(200).json(items)
    } catch (error) {
        console.error(error);
        
        return res.status(500).json({error: "somthing wrong"}) 
    }
})

export default router