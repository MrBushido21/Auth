import { sqlRun } from "./db.constructor.js";
export const createTableUsers = async () => {
    // await sqlRun(`DROP TABLE users`)
    await sqlRun(`
        CREATE TABLE IF NOT EXISTS users (
        id NUMBER PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        status TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        verifeid_at TEXT
    );
    `);
    await sqlRun(`
        CREATE TABLE IF NOT EXISTS refresh_tokens (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        refresh_token TEXT NOT NULL,
        user_id NUMBER NOT NULL,
        created_at TEXT NOT NULL,
        expires_at TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    `);
    await sqlRun(`
        CREATE TABLE IF NOT EXISTS user_codes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id NUMBER NOT NULL,
        type TEXT NOT NULL,
        code TEXT,
        token TEXT,
        key TEXT,
        created_at TEXT NOT NULL,
        expires_at TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    `);
};
//# sourceMappingURL=db.createTable.js.map