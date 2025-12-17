import type { ProductType } from "../../types/types.js"
import { sqlAll, sqlGet, sqlRun } from "../db.constructor.js"

//Create

export const createProduct = async (title: string, description: string, price: number, 
     category_id: number, category:string, quantity:number, rating:number, qntrewies:number,
     sale: number, image_url:string, created_at: string, updated_at: string):Promise<void> => {
    await sqlRun(`
        INSERT INTO products (title, description, price, category_id, category, quantity, rating, qntrewies, 
        sale, image_url, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `, [title, description, price, category_id, category, quantity, rating, qntrewies, sale, image_url, created_at, updated_at])
}

//GetOne

export const getProduct = async (id:number | string):Promise<ProductType> => {
    const product: ProductType = await sqlGet(`
        SELECT * FROM products WHERE id = ?
        `, [id])
    return product
}

export const getProductWithCartId = async (id:number):Promise<ProductType> => {
    const product:ProductType = await sqlGet(`
        SELECT * FROM products WHERE id = ?
        `, [id])
        return product
}


//GetAll
export const getAllProducts = async (search:string, sort:string, category_id:number): Promise<ProductType[]> => {  
   if (category_id) {
    return await sqlAll(
      `
      SELECT * FROM products
      WHERE category_id = ?
      ORDER BY price ${sort}
      `,
      [category_id]
    );
  }

  return await sqlAll(
    `
    SELECT * FROM products
    WHERE title LIKE ? OR id = ?
    ORDER BY price ${sort}
    `,
    [`%${search}%`, search]
  );
}


//Update
 export const updateProduct = async (id:number, title:string, description:string, price:number,
   quantity:number, sale:number, category_id:number, category:string, image_url:string, public_id:string):Promise<void> => {
    await sqlRun(`
        UPDATE products SET title = ?, description = ?, price = ?, quantity = ?, sale = ?,
        category_id = ?, category = ?, image_url = ?, public_id = ?
        WHERE id = ? 
        `, [title, description, price, quantity, sale, category_id, category, image_url, public_id, id])
 }

 export const updateQuantityProduct = async (id:number, quantity:number):Promise<void> => {

  await sqlRun(`
        UPDATE products SET quantity = quantity - ?
        WHERE id = ?
        `, [quantity, id])
 }
 export const updateRating = async (id:number, rating:number):Promise<void> => {
  await sqlRun(`
        UPDATE products SET rating = ROUND(((rating + ?) * 1.0 ) / (qntrewies + 1) + 0.05, 1),
        qntrewies = qntrewies + 1
        WHERE id = ?
        `, [rating, id])
 }

 export const updateSale = async (sale: number, id:number) => {
    await sqlRun(`
        UPDATE products SET sale = ? 
        WHERE id = ?
        `, [sale, id])
 }
 //Delete

 export const deleteProduct = async (id:number):Promise<void> => {
    await sqlRun(`DELETE FROM products WHERE id = ?`, 
        [id])
 }


