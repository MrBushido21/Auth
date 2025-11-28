import type { NextFunction, Request, Response} from "express"
import jwt from "jsonwebtoken"
import type { PayloadType } from "../types/types.js"
import { generateCode, options } from "../utils/utils.js"
import { authRepository } from "../db/auth/authRepository.js"


//проверка атентификации по токену
export const checkAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  const token = req.headers.authorization
  
  if (token) {
    try {  
      const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS || "super_secret_key_accses") as PayloadType
      
      const status = (await authRepository.getUserForId(decoded.id)).status
      
      if (status === "admin") {
        console.log("ok");       
        next()
      }
    } catch (error) {
      console.error(error);
    }
  } 
} 