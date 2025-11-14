import { Router, type Request, type Response } from "express";
import { createBoardServices } from "../services/board/services.createBoard.js";
import type { BoardType } from "../types/types.js";

const router = Router();

router.post('/createboard', async (req: Request<{}, {}, BoardType>, res: Response) => {
    const {user_id, title} = req.body
    
    try {
        await createBoardServices.create({user_id, title})
        return res.status(200).json({message: "Table created"})
    } catch (error:any) {
        return res.status(error.status || 500).json({message: error.message})
    }
})
