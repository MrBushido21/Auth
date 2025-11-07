import { Router, type CookieOptions, type Request, type Response } from "express";
import type { UsersType } from "../types/types.js";
import { addRefreshToken, addRestToken, addVerificationCode, changePassword, createUsers, deleteUserCode, getCodeForId, getResetTokenForId, getTokenForId, getUserForEmail, getUserForId, getUserForRestToken, getUserForToken, 
  updateRefreshToken, updateVerifyCode, updateVerifyStatus } from "../db/db.repository.js";
import { comparePass, createToken, dateExpire, dateNow, decodedAccsesToken, decodedRefreshToken, hashedString, limiter, options, 
  refreshToken, sendlerEmailCode } from "../utils/utils.js";
import crypto from "crypto";
import { checkAuth } from "../middleware/middleware.auth.js";
import { registerShemas } from "../shemas/validation.js";
import { validation } from "../middleware/middleware.validation.js";
import bcrypt, { compare } from "bcryptjs";


const router = Router();

// регистрация
router.post("/registration", validation(registerShemas), async (req: Request<{}, {}, UsersType>, res: Response) => {
  const { email, password_hash } = req.body;

  const hashedPass = await hashedString(password_hash)

  let id = Math.floor(Math.random() * 100000)
  let code = Math.floor(Math.random() * 100000).toString()
  const user: UsersType = {
    id: id,
    email: email,
    password_hash: hashedPass,
    status: "user",
    created_at: dateNow,
    updated_at: dateNow,
    verifeid_at: "",
  }

  try {
    createUsers(user)
  } catch (error) {
    console.log(error);
  }

  // sendlerEmailCode(email, code)
  addVerificationCode(user.id, code)
  res.status(200).json({ message: {id, email} })
});

//Верификация емейла

router.post('/verify', limiter, async (req: Request, res: Response) => {
  const { id, verifeid_code } = req.body

  const record = await getCodeForId(id)
  const data = await getUserForId(id)

  if (record.code !== verifeid_code) {
    res.status(400).send("Invalid verification code")
  }

  try {
    deleteUserCode(record.id)
  } catch (error) {
    console.error(error);
  }
  if (!data) {
    res.status(403).json({message: "User unfound"})
  }
  const token = createToken(data)
  const [accsesToken, refreshToken] = token
  let hashedRefreshToken = ""
  if (refreshToken) {
    hashedRefreshToken = await hashedString(refreshToken)
  }
  hashedRefreshToken ? addRefreshToken(id, hashedRefreshToken) : console.error("refresh_token is undefined")
  res.cookie("refresh_token", refreshToken, options);
  return res.status(200).json({success: true, access_token: accsesToken,})
})

//Отправить код повторно

router.post('/verify/new', checkAuth, async (req: Request, res: Response) => {
  let verifeid_code = Math.floor(Math.random() * 100000).toString()
  const { id } = req.body
  const record = await getCodeForId(id)

  if (!record) {
    return res.status(403).json({ message: 'Not found user' })
  }

  updateVerifyCode(record.id, verifeid_code)


  // sendlerEmailCode(email, code)

  return res.status(200)
})

// логин
router.post("/login", limiter, async (req: Request<{}, {}, UsersType, {}>, res: Response) => {
  const { email, password_hash } = req.body;

  const data = await getUserForEmail(email)

  const isMatch: boolean = await comparePass(password_hash, data.password_hash)

  const token = createToken(data)
  const [access_token, refresh_token] = token

  let hashedRefreshToken = ""
  if (refresh_token) {
    hashedRefreshToken = await hashedString(refresh_token)
  }


  if (data && isMatch) {
    hashedRefreshToken ? await updateRefreshToken(data.id, hashedRefreshToken) : console.error("refresh_token is undefined")
    res.cookie("refresh_token", refresh_token, options);
    return res.json({
      access_token: access_token,
    })
  }
  return res.send("Unkorrect login or password")
});

//Обновление акцес токена
router.post("/refresh", async (req: Request<{}, {}, UsersType, {}>, res: Response) => {
  const {id} = req.body
  const refresh_token = req.cookies.refresh_token


  if (!refresh_token) {
    return res.status(403).json({ message: 'haven`t token' })
  }

  const data = await getUserForId(id)
  const tokens = await getTokenForId(id)


  if (!data) {
    return res.status(403).json({ message: 'Not found user' })
  }
  const isMatch = await bcrypt.compare(refresh_token, tokens.refresh_token)
  if (!isMatch) return res.status(403).json({ message: "Token mismatch" })

  const token = refreshToken(refresh_token, data)

  if (!token) {
    return res.status(403).json({ message: 'Uncorrect token' })
  }

  console.log(data);
  res.json({ access_token: token })
})

//Логаут
router.post("/logout", async (req: Request<{}, {}, UsersType, {}, CookieOptions>, res: Response) => {
  const token = req.headers.authorization
  let decoded = null
  if (token) {
    decoded = decodedAccsesToken(token)
  }
  const id = decoded?.id

  if (id) {
    res.clearCookie("refresh_token"); // удаляем cookie
    await updateRefreshToken(id, "")
    return res.json({ message: "Logged out" });
  }
});


// Сброс пароля
router.post('/resetpassword', async (req: Request, res: Response) => {
  const { email } = req.body
  const token = crypto.randomBytes(32).toString("hex")
  hashedString(token)
  const link = `https://localhost:3000/reset-password?token=${token}`

  // sendlerEmailCode(email, link)

  const data = await getUserForEmail(email)
  if (data) {
    addRestToken(data.id, token)
  }

  return res.status(200).json({message: "confirm link was send on your email"})
})


//Смена пароля ==================================================================
router.post('/changepassword', async (req: Request, res: Response) => {
  const token = req.body.token
  const newpassord = req.body.newpassord

  let data: UsersType | null = null

  if (typeof token === "string") {
    data = await getUserForRestToken(token)
  }

  if (!data) {
    res.status(403).json({ message: "User not found" })
  }
  const codes = await getResetTokenForId(data?.id)
  const isMatch = await compare(token, codes.token)
  if (data !== null && codes?.token !== null) {
    if (isMatch && Date.now() < Number(codes.expires_at)) {
      const hashedPass = await hashedString(newpassord)
      changePassword(data.id, hashedPass)
      deleteUserCode(codes.id)
      if (data.verifeid_at) {
        const token = createToken(data)
        const [access_token, refresh_token] = token
        res.cookie("refresh_token", refresh_token, options)
        return res.status(200).json({ message: "Your password was chenged", access_token: access_token })
      }
      return res.status(200).json({ message: "Your password was chenged"})
    }
    return res.status(403).json({ message: "Your token was expire" })
  }

})
//
//Админ
router.post('/admin', checkAuth, async (req: Request, res: Response) => {
  const {id} = req.body
  const data = await getUserForId(id)
  if (!data) {
    res.status(403).json({message: "User unfound"})
  }
  const status = data.status

  if (status) {
    status === "admin" ? res.status(200).json({ message: "You are admin" }) : res.status(403).json({ message: "You are not admin" })
  }

})

export default router;