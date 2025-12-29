import { Router } from "express";
import { servicesPromocodes } from "../../services/promocodes/services.promocodes.js";

const router = Router()

router.post("/admin/createpromo", async (req, res) => {//checkAdmin
    const { code, discountPercent } = req.body;
    try {
        await servicesPromocodes.createPromocode(code, discountPercent);
        res.status(201).json({ message: "промокод создан" });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: "Ошибка при создании промокода" });
    }
})

export default router;