import { Router, type Request, type Response } from "express";
import type { ProductType } from "../../types/types.js";
import Admin from "../../services/admin/services.admin.js";
import { checkAuth } from "../../middleware/middleware.auth.js";
import type { CreateProductType, EditProductType } from "../../types/requests.js";
import { chekQueryId, dateNow } from "../../utils/utils.js";
import multer from "multer";
import { convertImg } from "../../services/image/image.services.js";

const router = Router();

const upload = multer({ dest: "uploads/" });

router.post('/createproduct', upload.single("image"), async (req: Request<{}, {}, any>, res: Response) => { 
    const imgUrl = await convertImg(req.file?.path)
    
    const data:ProductType = {
        id: 0,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        image_url: imgUrl?.url,
        category_id:req.body.category_id,
        category: req.body.category,
        quantity: req.body.quantity,
        rating: 0,
        qntrewies: 0,
        sale: +req.body.sale / 100,
        created_at: dateNow(),
        updated_at: dateNow()

    }
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
router.put('/admin/edit-product', async (req: Request<{}, {}, EditProductType, {id:string}>, res: Response) => {
    const { title, description, price, quantity, sale, category_id, category} = req.body
    let id:number
    if (req.query.id && !Array.isArray(req.query.id)) {
       id = +req.query.id
    } else {
        return res.status(404).json({message: "uncorrect product_id"})
    }

    const data:ProductType = {
        id: id,
        title: title,
        description: description,
        price: price,
        image_url: "",
        category_id:category_id,
        category: category,
        quantity: quantity,
        rating: 0,
        qntrewies: 0,
        sale: +sale / 100,
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

router.delete('/admin/delete-product', async (req: Request<{}, {}, {}, {id:string}>, res: Response) => {
    
    let id = chekQueryId(req)
    
    if (!id || id === 0) {
        return res.status(404).json({message: "uncorrect product_id"})
    }
    const data: ProductType = {
        id: id,
        title: "",
        description: "",
        price: 0,
        image_url: "",
        category_id: 0,
        category: "",
        quantity: 0,
        rating: 0,
        qntrewies: 0,
        sale: 0,
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