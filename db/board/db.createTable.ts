import { sqlRun } from "../db.constructor.js"
export const createTableBoard = async ():Promise<void> => {
    
    await sqlRun(`
        CREATE TABLE IF NOT EXISTS board (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id NUMBER NOT NULL,
        title TEXT NOT NULL,
        order_index NUMBER NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
        `);

    await sqlRun(`
        CREATE TABLE IF NOT EXISTS list (
        id PRIMARY KEY AUTOINCREMENT,
        board_id NUMBER NOT NULL,
        title TEXT NOT NULL,
        order_index NUMBER NOT NULL,
        FOREIGN KEY (boadr_id) REFERENCES board(id) ON DELETE CASCADE
        );
        `)
        
     await sqlRun(`
        CREATE TABLE IF NOT EXISTS card (
        id PRIMARY KEY AUTOINCREMENT,
        list_id NUMBER NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (list_id) REFERENCES list(id) ON DELETE CASCADE
        )
        `)   
}