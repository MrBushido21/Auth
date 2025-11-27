import { Router, type Request, type Response } from "express";
import type { ProductType } from "../../types/types.js";
import Admin from "../../services/admin/services.admin.js";

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




export default router