import { Router, type CookieOptions, type Request, type Response } from "express";
import type { PayloadType, UsersType } from "../types/types.js";
import { addRestToken, changePassword, createUsers, getUserForEmail, getUserForId, getUserForRestToken, getUserForToken, updateRefreshToken, updateVerifyCode, updateVerifyStatus } from "../db/db.repository.js";
import { checkAuth, comparePass, createToken, dateExpire, dateNow, decodedAccsesToken, decodedRefreshToken, hashedString, limiter, options, refreshToken, sendlerEmailCode } from "../utils/utils.js";
import crypto from "crypto";
import { error } from "console";


const router = Router();

// регистрация
router.post("/registration", async (req: Request<{}, {}, UsersType>, res: Response) => {
  const { email, password_hash } = req.body;

  const hashedPass = await hashedString(password_hash)

  const data = await getUserForEmail(email)
  if (data) {
    return res.send("email already taken")
  }
  let id = Math.floor(Math.random() * 100000)
  let verifeid_code = Math.floor(Math.random() * 100000)
  const user: UsersType = {
    id: id,
    email: email,
    password_hash: hashedPass,
    status: "user",
    refresh_token: "",
    created_at: dateNow,
    updated_at: dateNow,
    verifeid: "No",
    verifeid_code,
    verifeid_expire_time: dateExpire,
    rest_token: "",
    rest_expire: null
  }

  const token = createToken(user)
  const [access_token, refresh_token] = token

  if (refresh_token) {
    const hashedRefreshToken = await hashedString(refresh_token)
    user.refresh_token = hashedRefreshToken
  }
  // sendlerEmailCode(email, code.toString())
  createUsers(user)
  res.cookie("refresh_token", refresh_token, options);
  res.json({
    access_token: access_token,
  })
});

//Верификация емейла

router.post('/verify', checkAuth, async (req: Request, res: Response) => {
  const { verifeid_code } = req.body
  const refresh_token = req.cookies.refresh_token

  const data = await getUserForToken(refresh_token)

  if (!data) {
    return res.status(403).json({ message: 'Not found user' })
  }

  if (data.verifeid_code === verifeid_code) {
    if (Date.now() < dateExpire) {
      updateVerifyStatus(data.id, "Yes", null, null)
      return res.status(200).json({ message: "You are verifeid" })
    }
    return res.status(403).json({ message: "expired code" })
  }
  return res.status(403).json({ message: "uncorrect code" })
})

//Отправить код повторно

router.post('/verify/new', checkAuth, async (req: Request, res: Response) => {
  let verifeid_code = Math.floor(Math.random() * 100000)
  const refresh_token = req.cookies.refresh_token

  const data = await getUserForToken(refresh_token)

  if (!data) {
    return res.status(403).json({ message: 'Not found user' })
  }

  updateVerifyCode(data.id, verifeid_code, Date.now() + 30000)


  // sendlerEmailCode(email, code.toString())

  return res.status(200)
})

// логин
router.post("/login", limiter,  async (req: Request<{}, {}, UsersType, {}>, res: Response) => {
  const { email, password_hash } = req.body;

  const data = await getUserForEmail(email)

  const token = createToken(data)
  const [access_token, refresh_token] = token

  const isMatch: boolean = await comparePass(password_hash, data.password_hash)
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

  const refresh_token = req.cookies.refresh_token

  if (!refresh_token) {
    return res.status(403).json({ message: 'haven`t token' })
  }
  const decoded = decodedRefreshToken(refresh_token)

  const data = await getUserForId(decoded?.id)

  if (!data) {
    return res.status(403).json({ message: 'Not found user' })
  }

  const token = refreshToken(refresh_token, data)

  if (!token) {
    return res.status(403).json({ message: 'Uncorrect token' })
  }

  console.log(data);
  res.json({ access_token: token })
})

//Логаут
router.post("/logout", async (req: Request<{}, {}, UsersType, {}, CookieOptions>, res: Response) => {
  const { id } = req.body
  res.clearCookie("refresh_token"); // удаляем cookie
  await updateRefreshToken(id, "")
  return res.json({ message: "Logged out" });
});


// Сброс пароля
router.post('/resetpassword', async (req: Request, res: Response) => {
  const { email } = req.body
  const token = crypto.randomBytes(32).toString("hex")
  const link = `https://localhost:3000/reset-password?token=${token}`

  // sendlerEmailCode(email, link)

  const data = await getUserForEmail(email)
  if (data) {
    addRestToken(data.id, token, Date.now() + 100000)
  }
})

//Смена пароля
router.post('/changepassword', async (req: Request, res: Response) => {
  const token = req.query.token
  const newpassord = req.body.newpassord

  let data: UsersType | null = null

  if (typeof token === "string") {
    data = await getUserForRestToken(token)
  }

  if (!data) {
    res.status(403).json({ message: "User not found" })
  }
  if (data !== null && data?.rest_expire !== null) {
    if (data.rest_token === token && Date.now() < data.rest_expire) {
      const hashedPass = await hashedString(newpassord)
      changePassword(data.id, hashedPass)
      const token = createToken(data)
      const [access_token, refresh_token] = token
      return res.status(200).json({ message: "Your password was chenged", access_token: access_token, })
    }
    return res.status(403).json({ message: "Your token was expire"}) 
  }

})
//
//Админ
router.post('/admin', checkAuth, (req: Request, res: Response) => {
  const token = req.headers.authorization
  let decoded = null
  if (token) {
    decoded = decodedAccsesToken(token)
  }
  const status = decoded?.status

  if (status) {
    status === "admin" ? res.status(200).json({ message: "You are admin" }) : res.status(403).json({ message: "You are not admin" })
  }

})

export default router;