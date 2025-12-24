import { sqlRun } from "../db.constructor.js"

export const createPayment = async (order_id:number, invoiceId:number, status:string, payMethod:string, amount:number, 
    ccy:number, finalAmount:number, modifiedDate:string, tran_id:number, rrn:number, fee:number, created_at:string) => {
    await sqlRun(`
        INSERT INTO payments (order_id, invoice_id, status, pay_method, amount, currency, final_amount, 
        tran_id, rrn, fee, paid_at, created_at)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?); 
        `, [order_id, invoiceId, status, payMethod, amount, ccy, finalAmount, tran_id, rrn, fee, modifiedDate,
             created_at])
}