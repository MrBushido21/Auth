import { Router, type Request, type Response } from "express";
import type { ProductType } from "../../types/types.js";
import Admin from "../../services/admin/services.admin.js";
import { checkAuth } from "../../middleware/middleware.auth.js";

const router = Router();

router.post('/createproduct', async (req: Request, res: Response) => {
    const data: ProductType = req.body.data
    if (!data) {
        return res.status(404).json({ message: "Data undefined" })
    }

    const adminController = new Admin(data)
    try {
        await adminController.createdProduct()
        return res.status(200).json({ message: "Product created" })
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Somthing error" })
    }

})

router.put('/admin/edit-product', async (req: Request, res: Response) => {
    const { title, description, price, quantity} = req.body
    let id:number
    if (req.query.id && !Array.isArray(req.query.id)) {
       id = +req.query.id
    } else {
        return res.status(404).json({message: "uncorrect product_id"})
    }

    const data = {
        id: id,
        title: title,
        description: description,
        price: price,
        image_url: "",
        category_id: 0,
        quantity: quantity,
        rating: 0,
        qntrewies: 0,
        created_at: "",
        updated_at: ""
    }
    
    const adminController = new Admin(data)
    try {
        await adminController.editProduct()
        return res.status(200).json({ message: "Product edited" })
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Somthing error" })
    }

})
router.put('/updat-rating', async (req: Request, res: Response) => {
    const rating:number = req.body.rating
    let id:number
    if (req.body.product_id && !Array.isArray(req.body.product_id)) {
       id = +req.body.product_id
    } else {
        return res.status(404).json({message: "uncorrect product_id"})
    }

    const data = {
        id: id,
        title: "",
        description: "",
        price: 0,
        image_url: "",
        category_id: 0,
        quantity: 0,
        rating: rating,
        qntrewies: 0,
        created_at: "",
        updated_at: ""
    }
    
    const adminController = new Admin(data)
    try {
        await adminController.updateRating()
        return res.status(200).json({ message: "Rating edited" })
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Somthing error" })
    }

})

router.delete('/admin/delete-product', async (req: Request, res: Response) => {
    let id:number
    if (req.query.id && !Array.isArray(req.query.id)) {
       id = +req.query.id
    } else {
        return res.status(404).json({message: "uncorrect product_id"})
    }

    const data = {
        id: id,
        title: "",
        description: "",
        price: 0,
        image_url: "",
        category_id: 0,
        quantity: 0,
        rating: 0,
        qntrewies: 0,
        created_at: "",
        updated_at: ""
    }
    
    const adminController = new Admin(data)
    try {
        await adminController.deleteProduct()
        return res.status(200).json({ message: "Product deleting" })
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Somthing error" })
    }

})






export default router