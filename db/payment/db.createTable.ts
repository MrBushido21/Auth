import { sqlRun } from "../db.constructor.js"

export const CreatePaymentTable = async() => {
    await sqlRun(`
        CREATE TABLE IF NOT EXISTS payments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id NUMBER NOT NULL,
        status TEXT NOT NULL,
        amount NUMBER NOT NULL,
        final_amount NUMBER NOT NULL,
        currency NUMBER NOT NULL,
        pay_method TEXT NOT NULL,
        tran_id NUMBER NOT NULL,
        rrn NUMBER NOT NULL,
        fee NUMBER NOT NULL,
        paid_at TEXT NOT NULL,
        created_at TEXT NOT NULL
        );
        `)
}