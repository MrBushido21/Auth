import { compare } from "bcryptjs";
import { authRepository } from "../../db/auth/authRepository.js";
import type { CodesType, UsersType } from "../../types/types.js";
import { createToken, hashedString, newError } from "../../utils/utils.js";

export const changepasswordService = {
    async changepasswordoremail({ token, key, newvalue, type }: { token: string; key:string; newvalue: string, type:string }) {
        let codes: CodesType | null = null
        if (typeof key === "string") {
            codes = await authRepository.getResetTokenForKey(key)
        }
               
        if (codes) {
        const data = await authRepository.getUserForId(codes?.user_id)
        const isMatch = await compare(token, codes.token)
        console.log(isMatch);
        
        if (data && codes?.token !== null) {
            if (isMatch && Date.now() < Number(codes.expires_at)) {
                if (type === "password") {
                    const hashedPass = await hashedString(newvalue)
                    authRepository.changePassword(data.id, hashedPass)
                    authRepository.deleteUserCode(codes.id)
                } else {
                    authRepository.changeEmail(data.id, newvalue)
                    authRepository.deleteUserCode(codes.id)
                }

                const token = createToken(data)
                    const [access_token, refresh_token] = token
                    return access_token
            }
            return null
        }
        newError(data, 404, 'User undefined')       
        }
        newError(codes, 400, 'Key uncorrect')
    }
}