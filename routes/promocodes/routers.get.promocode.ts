import { Router } from "express";
import { servicesPromocodes } from "../../services/promocodes/services.promocodes.js";

const router = Router()

router.get("/admin/getpromo", async (req, res) => {//checkAdmin
    try {
        const promocodes = await servicesPromocodes.getAllPromocodes();
        res.status(200).json({ promocodes });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: "Ошибка при получении промокодов" });
    }
})

export default router;