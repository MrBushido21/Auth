import { authRepository } from "../db/authRepository.js";
import { comparePass, createToken, hashedString, newError } from "../utils/utils.js";

export const loginService = {
    async login({email, password_hash}: {email: string; password_hash: string}): Promise<string[]> {
        const data = await authRepository.getUserForEmail(email)
          newError(data, 404, "User not found")
          const isMatch: boolean = await comparePass(password_hash, data.password_hash)
          
          const token = createToken(data)
          const [access_token, refresh_token] = token
        
          let hashedRefreshToken = ""
          if (refresh_token) {
            hashedRefreshToken = await hashedString(refresh_token)
          }
        
          if (data && isMatch) {
            hashedRefreshToken ? await authRepository.updateRefreshToken(data.id, hashedRefreshToken) : console.error("refresh_token is undefined")
          } else {
            const error: any = new Error("Unkorrect email or password")
            error.status = 400
            throw error
          }
        return token
    }
}
