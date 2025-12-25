import { Router } from "express";
import { servicesLogs } from "../services/logs/servicesLogs.js";

const router = Router()

router.get('/admin/getlogs', async (req, res) => { //checkAdmin
    try {
        const logs = await servicesLogs.getLogs()
        return res.status(200).json(logs)
    } catch (error) {
        console.error(error);        
    }
})

export default router