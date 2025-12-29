import { sqlRun } from "../db.constructor.js"

export const createTablePromocodes = async () => {
    await sqlRun(`CREATE TABLE IF NOT EXISTS promocodes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT UNIQUE NOT NULL,
        discount_percent INTEGER NOT NULL,
        is_active TEXT NOT NULL
    )`)
}