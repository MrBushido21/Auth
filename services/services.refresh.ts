import bcrypt from "bcryptjs";
import { authRepository } from "../db/authRepository.js";
import { newError, refreshToken } from "../utils/utils.js";

export const refreshService = {
    async refresh({ id, refresh_token }: { id: number; refresh_token: string }): Promise<string | null> {

        newError(refresh_token, 403, 'haven`t token')

        const data = await authRepository.getUserForId(id)
        const tokens = await authRepository.getTokenForId(id)

        newError(data, 403, 'Not found user')

        const isMatch = await bcrypt.compare(refresh_token, tokens.refresh_token)

        newError(isMatch, 403, "Token mismatch")

        const token = refreshToken(refresh_token, data)

        newError(token, 403, 'Uncorrect token')

        return token
    }
}