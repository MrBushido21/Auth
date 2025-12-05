import { sqlRun } from "../db.constructor.js"

export const createTableRewies = async ():Promise<void> => {
    await sqlRun(`DROP TABLE rewies`)
    await sqlRun(`
        CREATE TABLE IF NOT EXISTS rewies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id NUMBER NOT NULL,
        user_id NUMBER NOT NULL,
        user_name TEXT NOT NULL,
        comment TEXT NOT NULL,
        advantage TEXT NOT NULL,
        flaws TEXT NOT NULL,
        rating NUMBER NOT NULL, 
        created_at TEXT NOT NULL,
        FOREIGN KEY (product_id) REFERENCES products(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
        );        
        `)
}