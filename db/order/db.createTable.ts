import { sqlRun } from "../db.constructor.js"
export const createTablesOrders = async ():Promise<void> => {
   // await sqlRun(`DROP TABLE orders`)
   // await sqlRun(`DROP TABLE order_items`)   
      await sqlRun(`
        CREATE TABLE IF NOT EXISTS orders (
        order_id TEXT NOT NULL,
        invoiceId TEXT,
        user_id NUMBER NOT NULL,
        full_name TEXT NOT NULL,
        phone_number TEXT NOT NULL,
        city TEXT NOT NULL,
        department TEXT NOT NULL,
        email TEXT,
        comment TEXT,
        call TEXT NOT NULL,
        total_price NUMBER NOT NULL,
        promocode TEXT,
        sale TEXT,
        status TEXT NOT NULL,
        created_at TEXT NOT NULL,
        returning_time TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
        `);   
     await sqlRun(`
        CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id NUMBER NOT NULL,
        product_id NUMBER NOT NULL,
        product_name TEXT NOT NULL,
        product_img TEXT,
        quantity NUMBER NOT NULL,
        price NUMBER NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
        );
        `);
}