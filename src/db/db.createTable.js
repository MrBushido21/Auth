import { sqlRun } from "./db.constructor.js";
export const createTableUsers = async () => {
    // await sqlRun(`DROP TABLE users`)
    await sqlRun(`
        CREATE TABLE IF NOT EXISTS users (
        id NUMBER PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        status TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        verifeid TEXT NOT NULL
    );
    `);
    await sqlRun(`
        CREATE TABLE IF NOT EXISTS tokens (
        id NUMBER PRIMARY KEY,
        refresh_token TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        user_id NUMBER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
    `);
    await sqlRun(`
        CREATE TABLE IF NOT EXISTS verification(
        id NUMBER PRIMARY KEY,
        verifeid_code INTEGER,
        verifeid_expire_time INTEGER,
        rest_token TEXT,
        rest_expire INTEGER,
        user_id NUMBER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
    `);
};
//# sourceMappingURL=db.createTable.js.map