import { authRepository } from "../../db/auth/authRepository.js";
import { createToken, dateExpire, dateNow, hashedString, newError } from "../../utils/utils.js";

export const verifyService = {
    async veify ({id, verifeid_code}: {id: number; verifeid_code: string}) {
      const record = await authRepository.getCodeForId(id)
      const data = await authRepository.getUserForId(id)
      
      newError(record, 404, "User not found")

      const match = record.code === verifeid_code.toString()
      
      const isExpired =  Date.now() < +record.expires_at
      
      newError(match, 400, "Invalid verification code")
      newError(isExpired, 400, "Code expired")
    
      try {
        // await authRepository.deleteUserCode(record.id)
        await authRepository.updateVerifyStatus(id, dateNow())
        console.log("code deleting");
        
      } catch (error) {        
        console.error(error);
      }
      newError(data, 400, "User unfound")

      const token = createToken(data)
      const [accsesToken, refreshToken] = token
      let hashedRefreshToken = ""
      if (refreshToken) {
        hashedRefreshToken = await hashedString(refreshToken)
      }

      hashedRefreshToken ? authRepository.addRefreshToken(id, hashedRefreshToken, dateNow(), dateExpire(600000)) : console.error("refresh_token is undefined")      
      return token
    }
}
