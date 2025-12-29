import e from "express"
import type { PromocodeType } from "../../types/types.js"
import { sqlAll, sqlGet, sqlRun } from "../db.constructor.js"

// Create a new promocode
export const createPromocode = async (code: string, discountPercent: number) => {
    await sqlRun(`INSERT INTO promocodes (code, discount_percent, is_active) VALUES (?, ?, ?)`, 
        [code, discountPercent, 'true'])
}

//Get one
export const findPromocodeByCode = async (code: string):Promise<PromocodeType> => {
    const promocode:PromocodeType = await sqlGet(`
        SELECT * FROM promocodes WHERE code = ?
    `, [code]) 
    return promocode
}

//Update
export const deactivatePromocode = async (code: string):Promise<void> => {
    await sqlRun(`
        UPDATE promocodes SET is_active = 'false' WHERE code = ?
    `, [code])
}

//GetAll   
export const getAllPromocodes = async ():Promise<PromocodeType[]> => {
    const promocodes:PromocodeType[] = await sqlAll(`
        SELECT * FROM promocodes
    `) 
    return promocodes
}