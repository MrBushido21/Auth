import bcrypt from "bcryptjs";
import type { PayloadType, UsersType } from "../types/types.js";
import jwt, { type JwtPayload } from "jsonwebtoken"
import type { CookieOptions, NextFunction, Request, Response } from "express";
import nodemailer from "nodemailer"
import { error } from "console";
import { getUserForId } from "../db/auth/db.dao.js";
import rateLimit from "express-rate-limit";

export const generateCode = () => {
  return Math.floor(Math.random() * 100000)
}
//Создание текущей даты
export const dateNow = () => {  
 return new Date().toISOString()
}
export const dateExpire = (time:number) => {  
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
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
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
    expiresIn: "10m"
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
export const sendlerEmailCode = (email: string, code: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "",
      pass: ""
    }
  })

  const mailOptions = {
    from: 'Authly',
    to: email,
    subject: "Confirm your email",
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