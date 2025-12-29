import { authRepository } from "../../db/auth/authRepository.js"
import { dateExpire, dateNow, hashedString, sendlerEmailCode } from "../../utils/utils.js"
import crypto from "crypto";

export const resetpasswordService = {
    async reset({email, type}:{email:string, type:string}) {
        const token = crypto.randomBytes(32).toString("hex")
        const key = crypto.randomBytes(10).toString("hex")
          const hashedToken = await hashedString(token)
          
          let link:string = ""
          
          if (type === "email") {
          link = `http://localhost:3000/changeemailform?token=${token}&key=${key}&type=${type}`  
          } else {
            link = `http://localhost:3000/changepasswordform?token=${token}&key=${key}&type=${type}`
          }
          
          console.log(link);
        
          sendlerEmailCode(email, link)
        
          const data = await authRepository.getUserForEmail(email)
          if (data) {
            authRepository.addRestToken(data.id, hashedToken, key, dateNow(), dateExpire(300000))
          }
    }
}