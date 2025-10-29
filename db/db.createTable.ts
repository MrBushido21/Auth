import { sqlRun } from "./db.constructor.js"

export const createTableUsers = async (): Promise<void> => {
    // await sqlRun(`DROP TABLE users`)
    await sqlRun(`
        CREATE TABLE IF NOT EXISTS users (
        id NUMBER PRIMARY KEY,
        email TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        status TEXT NOT NULL,
        refresh_token TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        verifeid TEXT NOT NULL,
        verifeid_code INTEGER,
        verifeid_expire_time INTEGER,
        rest_token TEXT,
        rest_expire INTEGER
        );
        `)
}
