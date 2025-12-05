import type { RewieType } from "../../types/types.js"
import { sqlAll, sqlGet, sqlRun } from "../db.constructor.js"

//Create
export const createRewie = async (product_id:number, user_id:number, comment:string, advantage:string, flaws:string, rating:number, created_at:string) => {
    await sqlRun(`
        INSERT INTO rewies (product_id, user_id, comment, advantage, flaws, rating, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [product_id, user_id, comment, advantage, flaws, rating, created_at])
}

export const getRewies = async (product_id:number):Promise<RewieType[]> => {
    const rewies:RewieType[] = await sqlAll(`
        SELECT * FROM rewies WHERE product_id = ? 
        `, [product_id])
    return rewies
}
