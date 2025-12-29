import { Router } from "express";
import { servicesPromocodes } from "../../services/promocodes/services.promocodes.js";

const router = Router()

router.put("/admin/deactivatepromo", async (req, res) => {//checkAdmin
    const { code } = req.body;
    try {
        await servicesPromocodes.deactivatePromocode(code);
        res.status(201).json({ message: "промокод деактивирован" });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: "Ошибка при деактивации промокода" });
    }
})

export default router;