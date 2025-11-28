import type { CartItem, CartType } from "../../types/types.js"
import { sqlAll, sqlGet, sqlRun } from "../db.constructor.js"


//Create
export const createCart = async (user_id: number, created_at: string, updated_at: string):Promise<void> => {
    const result:any = await sqlRun(`
        INSERT INTO carts (user_id, created_at, updated_at)
        VALUES (?, ?, ?);
        `, [user_id, created_at, updated_at])
}
export const createCartItem = async (cart_id: number, product_id: number, product_name:string, quantity: number, price: number, added_at: string):Promise<void> => {
    const result:any = await sqlRun(`
        INSERT INTO cart_items (cart_id, product_id, product_name, quantity, price, added_at)
        VALUES (?, ?, ?, ?, ?, ?);
        `, [cart_id, product_id, product_name, quantity, price, added_at])
}

//GetOne
export const getCart = async (user_id:number):Promise<CartType> => {
    const cart:CartType = await sqlGet(`
        SELECT * FROM carts WHERE user_id = ?
        `, [user_id])
        
        return cart
}

export const getCartItem = async (cart_id:number, product_id:number):Promise<CartItem> => {
    const cartItem:CartItem = await sqlGet(`
        SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?
        `, [cart_id, product_id])
    
    return cartItem
}


export const getCartItemsWithCartId = async (cart_id:number):Promise<CartItem[]> => {
    const cartItems:CartItem[] = await sqlAll(`
        SELECT * FROM cart_items WHERE cart_id = ?
        `, [cart_id])
        
    return cartItems
}

//Update

export const updateCartItem = async (product_id:number, quantity:number, price:number):Promise<void> => {
    await sqlRun(`
        UPDATE cart_items  
        SET quantity = quantity + ?,  
        price = price + ?  
        WHERE product_id = ?
        `,
        [quantity, price, product_id])
}

export const increaseQuntity = async (id:number):Promise<void> => {
    await sqlRun(`
        UPDATE cart_items  
        SET quantity = quantity + 1,
        price = (price / quantity) + price
        WHERE id = ?
        `,
        [id])
}
export const decreaseQuntity = async (id:number):Promise<void> => {
    await sqlRun(`
        UPDATE cart_items  
        SET quantity = quantity - 1,
        price = price - (price / quantity)
        WHERE id = ?
        `,
        [id])
}



//Delete

export const deleteCart = async (id:number):Promise<void> => {
    await sqlRun(`
        DELETE FROM carts WHERE id = ?
        `, [id])
}
export const deleteCartItem = async (id:number):Promise<void> => {
    await sqlRun(`
        DELETE FROM cart_items WHERE id = ?
        `, [id])
}
export const deleteCartItemWithCartId = async (cart_id:number):Promise<void> => {
    await sqlRun(`
        DELETE FROM cart_items WHERE cart_id = ?
        `, [cart_id])
}
