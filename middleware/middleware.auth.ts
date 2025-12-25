import type { NextFunction, Request, Response} from "express"
import jwt from "jsonwebtoken"
import type { PayloadType } from "../types/types.js"
import { generateCode, options } from "../utils/utils.js"


//проверка атентификации по токену
export const checkAuth = (req: Request, res: Response, next: NextFunction): void | Response => {
  const token = req.headers.authorization?.split(" ")[1]
  
  if (token) {
    try {  
      const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS || "super_secret_key_accses") as PayloadType  
      if (typeof decoded === "object" && decoded !== null && "id" in decoded && "email" in decoded) {
        req.user = decoded as PayloadType 
      } else {
        return res.status(403).json({ message: 'Uncorrect token' })
      }
      
    } catch (error) {
      console.error(error);
    }
  } 
  
  let user_id = req.cookies.user_id
  
  if (!user_id) {
    user_id = generateCode()
    res.cookie("user_id", user_id, options)    
  }
  req.user_id = user_id
  
  next()
} 