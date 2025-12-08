import type { wishListType } from "../../types/types.js"
import { sqlAll, sqlRun } from "../db.constructor.js"

//Create
export const createWishlist = async (user_id:number, product_id:number) => {
    await sqlRun(`
            INSERT INTO wishlist (user_id, product_id)
            VALUES (?, ?)               
        `, [user_id, product_id])
}

//GetAll
export const getItemsWishList = async (user_id:number):Promise<wishListType[]> => {
    const wishList:wishListType[] = await sqlAll(`
        SELECT * FROM wishlist WHERE user_id = ?
        `, [user_id])

        return wishList
}


//Delete
export const deleteWishList = async (user_id:number, product_id:number) => {
    await sqlRun(`DELETE FROM wishlist WHERE user_id = ? AND product_id = ?`, [user_id, product_id])
}