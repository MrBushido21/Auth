import type { ProductType } from "../../types/types.js"
import { sqlAll, sqlGet, sqlRun } from "../db.constructor.js"

//Create

export const createProduct = async (title: string, description: string, price: number, category_id: number, created_at: string, updated_at: string):Promise<void> => {
    await sqlRun(`
        INSERT INTO products (title, description, price, category_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?);
        `, [title, description, price, category_id, created_at, updated_at])
}

//GetOne

export const getProduct = async (id:number):Promise<ProductType> => {
    const product: ProductType = await sqlGet(`
        SELECT * FROM products WHERE id = ?
        `, [id])
    return product
}

//GetAll
export const getAllProducts = async (): Promise<any[]> => {
    const products: any[] = await sqlAll(`SELECT * FROM products`);
    if (!Array.isArray(products)) {
        console.log(`Unknow format of data, Data: ${products}`);
    }

    return products
}

