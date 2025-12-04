import { sqlRun } from "../db.constructor.js"
export const createTables = async ():Promise<void> => {
   // await sqlRun(`DROP TABLE orders`)
   // await sqlRun(`DROP TABLE order_items`)
   // await sqlRun(`DROP TABLE products`)
    await sqlRun(`
        CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        price NUMBER NOT NULL,
        image_url TEXT,
        category_id NUMBER NOT NULL,
        quantity NUMBER NOT NULL,
        rating NUMBER,
        qntrewies NUMBER,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
        );
        `);

    await sqlRun(`
        CREATE TABLE IF NOT EXISTS carts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id NUMBER NOT NULL,
        total_price NUMBER NOT NULL,        
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
        `);
        
     await sqlRun(`
        CREATE TABLE IF NOT EXISTS cart_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cart_id NUMBER NOT NULL,
        product_id NUMBER NOT NULL,
        product_name TEXT NOT NULL,
        product_img TEXT,
        quantity NUMBER NOT NULL,
        price TEXT NOT NULL,
        added_at TEXT NOT NULL,
        FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id)
        );
        `);   
     await sqlRun(`
        CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id NUMBER NOT NULL,
        full_name TEXT NOT NULL,
        phone_number TEXT NOT NULL,
        city TEXT NOT NULL,
        email TEXT,
        comment TEXT,
        call TEXT NOT NULL,
        total_price NUMBER NOT NULL,
        status TEXT NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
        `);   
     await sqlRun(`
        CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id NUMBER NOT NULL,
        product_id NUMBER NOT NULL,
        quantity NUMBER NOT NULL,
        price NUMBER NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
        );
        `);  
}