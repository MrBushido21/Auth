import type { NextFunction, Request, Response} from "express"
import jwt from "jsonwebtoken"

//проверка атентификации по токену
export const checkAuth = (req: Request, res: Response, next: NextFunction): void | Response => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(403).json({ message: 'haven`t token' })
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET_ACCESS || "super_secret_key_accses")
    next()
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: 'Uncorrect token' })
  }
} 