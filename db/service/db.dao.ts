import type { BoardType } from "../../types/types.js"
import { sqlAll, sqlGet, sqlRun } from "../db.constructor.js"

//Create

export const createProduct = async (title: string, description: string, price: number, category_id: number, created_at: string, updated_at: string):Promise<void> => {
    await sqlRun(`
        INSERT INTO products (title, description, price, category_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?);
        `, [title, description, price, category_id, created_at, updated_at])
}
