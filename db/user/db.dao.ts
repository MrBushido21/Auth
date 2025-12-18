import type { UsersType } from "../../types/types.js"
import { sqlGet, sqlRun } from "../db.constructor.js"

//get
export const getUser = async (id:number):Promise<UsersType> => {
    const user:UsersType = await sqlGet(`
        SELECT * FROM users WHERE id = ?
        `, [id])

        return user
}

//Update

export const updataAvatar = async (id:number, img:string, public_id:string):Promise<void> => {
    await sqlRun(`
        UPDATE users SET avatar = ?, public_id = ? WHERE id = ?
        `, [img, public_id, id])
}