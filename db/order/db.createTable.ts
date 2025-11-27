import { sqlRun } from "../db.constructor.js"
// export const createTables = async ():Promise<void> => {
//    // await sqlRun(`DROP TABLE carts`)
//    // await sqlRun(`DROP TABLE orders`)   
//      await sqlRun(`
//         CREATE TABLE IF NOT EXISTS orders (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         user_id NUMBER NOT NULL,
//         full_name TEXT NOT NULL,
//         phone_number NUMBER NOT NULL,
//         city TEXT NOT NULL,
//         email TEXT,
//         comment TEXT,
//         call TEXT NOT NULL,
//         total_price NUMBER NOT NULL,
//         status TEXT NOT NULL,
//         created_at TEXT NOT NULL,
//         FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
//         );
//         `);   
//      await sqlRun(`
//         CREATE TABLE IF NOT EXISTS order_items (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         order_id NUMBER NOT NULL,
//         product_id NUMBER NOT NULL,
//         quantity NUMBER NOT NULL,
//         price NUMBER NOT NULL,
//         FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
//         FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
//         );
//         `);  
// }