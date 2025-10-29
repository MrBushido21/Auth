import bcrypt from "bcryptjs";
import type { PayloadType, UsersType } from "../types/types.js";
import jwt, { type JwtPayload } from "jsonwebtoken"
import type { CookieOptions, NextFunction, Request, Response } from "express";
import nodemailer from "nodemailer"
import { error } from "console";
import { getUserForId } from "../db/db.repository.js";

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

//Создание текущей даты
export const dateNow = new Date().toISOString()

//Создание истекающей даті
export const dateExpire = Date.now() + 30000

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
    id: data.id,
    status: data.status
  }
  const token = jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn: "10m"
  })

  return token
}
const accsesSecret = "super_secret_key_accses"
const refreshSecret = "super_secret_key_refresh"

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

//проверка атентификации по токену
export const checkAuth = (req: Request, res: Response, next: NextFunction): void | Response => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(403).json({ message: 'haven`t token' })
  }
  try {
    jwt.verify(token, accsesSecret)
    next()
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: 'Uncorrect token' })
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
