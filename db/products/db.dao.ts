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
export const getAllProducts = async (search:string, sort:string): Promise<any[]> => {
    
    
    const products: any[] = await sqlAll(`
        SELECT * FROM products WHERE title LIKE ? 
        ORDER BY price ${sort}
        `, [`%${search}%`]);
    if (!Array.isArray(products)) {
        console.log(`Unknow format of data, Data: ${products}`);
    }

    return products
}

//Update
 export const updateProduct = async (id:number, title:string, description:string, price:number):Promise<void> => {
    await sqlRun(`
        UPDATE products SET title = ?, description = ?, price = ?
        WHERE id = ? 
        `, [title, description, price, id])
 }

 //Delete

 export const deleteProduct = async (id:number):Promise<void> => {
    await sqlRun(`DELETE FROM products WHERE id = ?`, 
        [id])
 }


