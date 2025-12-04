import { authRepository } from "../../db/auth/authRepository.js"
import { dateExpire, dateNow, hashedString } from "../../utils/utils.js"
import crypto from "crypto";

export const resetpasswordService = {
    async reset({email}:{email:string}) {
        const token = crypto.randomBytes(32).toString("hex")
        const key = crypto.randomBytes(10).toString("hex")
          const hashedToken = await hashedString(token)
          console.log(token);
          console.log(key);
          
          const link = `http://localhost:3000/changepassword?token=${token}&key=${key}`
        
          // sendlerEmailCode(email, link)
        
          const data = await authRepository.getUserForEmail(email)
          if (data) {
            authRepository.addRestToken(data.id, hashedToken, key, dateNow(), dateExpire(120000))
          }
    }
}