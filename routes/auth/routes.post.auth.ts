import { Router, type CookieOptions, type Request, type Response } from "express";
import type { UsersType } from "../../types/types.js";
import { getCodeForId, getUserForEmail, getUserForId, updateRefreshToken} from "../../db/auth/db.dao.js";
import { createToken, dateExpire, decodedAccsesToken, generateCode, limiter, options, sendlerEmailCode, } from "../../utils/utils.js";
import { checkAuth } from "../../middleware/middleware.auth.js";
import { registerShemas } from "../../shemas/validation.js";
import { validation } from "../../middleware/middleware.validation.js";
import { userService } from "../../services/auth/services.registration.js";
import { verifyService } from "../../services/auth/services.verify.js";
import { authRepository } from "../../db/auth/authRepository.js";
import { loginService } from "../../services/auth/services.login.js";
import { refreshService } from "../../services/auth/services.refresh.js";
import { resetpasswordService } from "../../services/auth/services.resetpassword.js";
import { changepasswordService } from "../../services/auth/services.changepassword.js";
import type { AuthType, ChangepasswordoremailType, ResetType, VerifyType } from "../../types/requests.js";
import { error } from "console";


const router = Router();

// регистрация
router.post("/registration", async (req: Request<{}, {}, AuthType>, res: Response) => { //validation(registerShemas),
  const { email, password_hash } = req.body;

 try {
  const user = await userService.register({email, password_hash})

  return res.status(200).json({ message: {id: user.id, email: user.email} })
 } catch (error: any) {
  if (error.message === "Email taken") {
    return res.status(409).json({error: "Email alredy exists"})
  }
  console.error(error);
  return res.status(500).json({error: "Internal Server error"})
 }
});

//Верификация емейла

router.post('/verify', limiter, async (req: Request<{}, {}, VerifyType>, res: Response) => {
  const { id, verifeid_code } = req.body.data

  //Проблема в sql запросе
 try {
  const [accsesToken, refreshToken] = await verifyService.veify({ id, verifeid_code })
  res.cookie("refresh_token", refreshToken, options);
  return res.status(200).json({access_token: accsesToken})
 } catch (error:any) {
  return res.status(error.status || 500).json({error: error.message})
 }
})

//Отправить код повторно

router.post('/verify/new', async (req: Request<{}, {}, {id:number, email:string}>, res: Response) => {//==================
  let verifeid_code = generateCode().toString()
  const { id, email } = req.body
  const record = await getCodeForId(id)
  // Дописать отправку ссілки при смене пароля

  if (!record) {
    return res.status(403).json({ message: 'Not found user' })
  }

  await authRepository.updateVerifyCode(record.id, verifeid_code, dateExpire(120000))

 sendlerEmailCode(email, verifeid_code)
  return res.status(200).json({message: "ok"})
})

// логин
router.post("/login", limiter, async (req: Request<{}, {}, AuthType, {}>, res: Response) => {
  const { email, password_hash } = req.body;
  
  try {
    const [accsesToken, refreshToken] = await loginService.login({ email, password_hash })
    res.cookie("refresh_token", refreshToken, options);
    res.cookie("cart_id", 40567, options);

    return res.status(200).json({
      access_token: accsesToken,
    })
  } catch (error:any) {
    return res.status(error.status || 500).json({error: error.message})
  }
});

//Обновление акцес токена
router.post("/refresh", async (req: Request<{}, {}, {id:number}, {}>, res: Response) => {
  const {id} = req.body
  const refresh_token = req.cookies.refresh_token

  try {
    const token = await refreshService.refresh({id, refresh_token})
    res.status(200).json({ access_token: token }) 
  } catch (error:any) {
    return res.status(error.status || 500).json({error: error.message})
  }
})

//Логаут
router.post("/logout", async (req: Request<{}, {}, {}, {}, CookieOptions>, res: Response) => {
  const token = req.headers.authorization
  let decoded = null
  if (token) {
    decoded = decodedAccsesToken(token)
  }
  const id = decoded?.id

  if (id) {
    res.clearCookie("refresh_token"); // удаляем cookie
    await authRepository.updateRefreshToken(id, "")
    return res.json({ message: "Logged out" });
  }
});


// Сброс пароля
router.post('/reset', async (req: Request<{}, {}, ResetType, {}>, res: Response) => {
  const { email, type } = req.body
  if (!(type === "email" || type === "password")) {
    return res.status(400).json({message: "Type of 'reset' must be or 'email' or 'password'"})
  }
  await resetpasswordService.reset({email, type})
  return res.status(200).json({message: "confirm link was send on your email"})
})


//Смена пароля 
router.patch('/changepasswordoremail', async (req: Request<{}, {}, ChangepasswordoremailType, {}>, res: Response) => {
  const token = req.body.token
  const newvalue = req.body.newvalue
  const key = req.body.key
 const type = req.body.type

  try {
    const access_token = await changepasswordService.changepasswordoremail({token, key, newvalue, type})

  if (!access_token) {
    return res.status(403).json({ message: "Your token was expire or unccorect" })
  }

  return res.status(200).json({ message: "Your password was chenged", access_token: access_token })
  
  } catch (error:any) {
    return res.status(error.status || 500).json({ error: error.message })
  }
})

//Админ
router.post('/admin', checkAuth, async (req: Request<{}, {}, {id:number}, {}>, res: Response) => {
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