import bcrypt from "bcryptjs";
import type { OrderType, PayloadType, UsersType } from "../types/types.js";
import jwt, { type JwtPayload } from "jsonwebtoken"
import type { CookieOptions, Request, Response } from "express";
import nodemailer from "nodemailer"
import rateLimit from "express-rate-limit";
import { orderRepository } from "../db/order/orderRepository.js";
import fs from "fs";

export const chekOrderStatus = async (invoiceId:string) => {
  try {
    const order = await orderRepository.getOreder(invoiceId)
    if (order.status === "paid") {
        return 
    }
  } catch (error) {
    console.error(error);
  }
}
export const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000)
}
//Создание текущей даты
export const dateNow = () => {  
 return new Date().toISOString()
}
export const dateExpire = (time:number) => {  
  time = time * 1000 * 60
 return (Date.now() + time).toString()
}

export const newError = (value:any, status:number, err:string) => {
  if (!value) {
    const error:any = new Error(`${err}`)
    error.status = status
    throw error
  }
}
//Константы
export const options: CookieOptions = {
  httpOnly: false,   // если true, JS не сможет читать куку
  secure: false,     // если true, кука отправляется только по HTTPS
  maxAge: 24 * 60 * 60 * 1000, // 1 день
  sameSite: 'lax',   // или 'strict' / 'none'
}


//Проверка на пользователя
export const isUser = (data: unknown): data is UsersType => {
  const user = data as UsersType
  return Boolean(user && typeof user === 'object' && user.id && user.email && user.password_hash && user.status && user.created_at && user.updated_at)
}


//Хеширование пароля
export const hashedString = async (string: string): Promise<string> => {
  const hashedResult = await bcrypt.hash(string, 10)
  return hashedResult
}


//Сравнение паролей

export const comparePass = async (password_hash: string, passwordInput: string): Promise<boolean> => {
  return await bcrypt.compare(password_hash, passwordInput)
}

// Создание токена
function createTokenUtils(data: UsersType, secret: string): string {
  const payload: PayloadType = {
    email: data.email,
    id: data.id
  }
  const token = jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn: "60m"
  })

  return token
}
const accsesSecret = process.env.JWT_SECRET_ACCESS || "super_secret_key_accses"
const refreshSecret = process.env.JWT_SECRET_REFRESH || "super_secret_key_refresh"

export const createToken = (data: UsersType): string[] => {

  const accsesToken = createTokenUtils(data, accsesSecret)
  const refreshToken = createTokenUtils(data, refreshSecret)

  const tokensArr = [accsesToken, refreshToken]
  return tokensArr
}

// Првоерка токена
export const refreshToken = (refresh_token: string, data: UsersType): string | null => {
  try {
    jwt.verify(refresh_token, refreshSecret)
    const accsesToken = createTokenUtils(data, accsesSecret)
    return accsesToken
  } catch (error) {
    console.error(error);
    return null
  }
}

//Декодирование токена
export const decodedAccsesToken = (token: string): PayloadType | null => {
  try {
    const decoded = jwt.verify(token, accsesSecret) as jwt.JwtPayload & PayloadType
    return decoded
  } catch (error) {
    console.error(error);
    return null
  }
}
export const decodedRefreshToken = (token: string): PayloadType | null => {
  try {
    const decoded = jwt.verify(token, refreshSecret) as jwt.JwtPayload & PayloadType
    return decoded
  } catch (error) {
    console.error(error);
    return null
  }
}

//Отправка письма
export const sendlerEmailCode = (email: string, code: string, subject?:string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.SENDLER_PASS
    }
  })

  const mailOptions = {
    from: 'Authly',
    to: email,
    subject: subject ? subject : "Confirm your email",
    text: code,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error(error);
    }
    console.log("Send message:", info.response);
  })
}

//Установка лимита запросов
export const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  message: "To many trys, try latter again",
	standardHeaders: true, // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
	// store: ... , // Redis, Memcached, etc. See below.
})


//Достаю user_id
export const chekUser = (req:Request) => {
  let user = req.user
  let user_id: number | undefined = 0
  if (user && typeof user !== "string") {
     return user_id = user.id      
  }  else {
     return user_id = req.user_id
  } 
}
//Достаю id из query
export const chekQueryId = (req:Request) => {
  
  let order_id = 0
  if ( req.query.id && !Array.isArray(req.query.id)) {
      order_id = +req.query.id      
  }  else {
      return 0
  } 
  return order_id
}

// Удаляю фото после загрузки
export const removeLocalFile = (filePath: string) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
    } else {
      console.log("File deleted:", filePath);
    }
  });
};
