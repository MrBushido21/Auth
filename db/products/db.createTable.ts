import { sqlRun } from "../db.constructor.js"
export const createTables = async ():Promise<void> => {
   // await sqlRun(`DROP TABLE orders`)
   // await sqlRun(`DROP TABLE order_items`)
   // await sqlRun(`DROP TABLE payments`)
//    await sqlRun(`DROP TABLE wishlist`)
    await sqlRun(`
        CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        price NUMBER NOT NULL,
        image_url TEXT,
        public_id TEXT,
        category_id NUMBER NOT NULL,
        category TEXT NOT NULL,
        quantity NUMBER NOT NULL,
        rating NUMBER,
        qntrewies NUMBER,
        sale NUMBER,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
        );
        `);  
}