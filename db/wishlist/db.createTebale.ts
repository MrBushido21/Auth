import { sqlRun } from "../db.constructor.js"

export const createTableWishlist = async ():Promise<void> => {
    // await sqlRun(`DROP TABLE wishlist`)
    await sqlRun(`
        CREATE TABLE IF NOT EXISTS wishlist (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id NUMBER NOT NULL,
        product_id NUMBER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
        )
        `)
}