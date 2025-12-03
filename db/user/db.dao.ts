import type { UsersType } from "../../types/types.js"
import { sqlGet } from "../db.constructor.js"

export const getUser = async (id:number):Promise<UsersType> => {
    const user:UsersType = await sqlGet(`
        SELECT * FROM users WHERE id = ?
        `, [id])

        return user
}