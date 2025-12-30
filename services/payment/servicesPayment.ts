import { repositoryPayment } from "../../db/payment/db.repository.js";
import { dateNow } from "../../utils/utils.js";

export const ServicesPayment = {
    async pay({amount, order_id}: {amount:number, order_id:string}) {
        const PAYMENT_SECRET_KEY = process.env.PAYMENT_SECRET_KEY as string;
        console.log();
        
        const params: any = {
            "amount": amount,
            "ccy": 980,
            "merchantPaymInfo": {
                "destination": "Оплата за товари у інтенет магазині",
                "comment": "Оплата за товари у інтенет магазині",
            },
            "redirectUrl": `https://vivian-semipictorial-abiogenetically.ngrok-free.dev/peyment/succes?id=${order_id}`,
            "successUrl": `https://vivian-semipictorial-abiogenetically.ngrok-free.dev/peyment/succes${order_id}`,
            "failUrl": "https://vivian-semipictorial-abiogenetically.ngrok-free.dev/payment/fail",
            "webHookUrl": "https://vivian-semipictorial-abiogenetically.ngrok-free.dev/payment/callback",
        }

        //
        try {
            const response = await fetch('https://api.monobank.ua/api/merchant/invoice/create', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'X-Token': PAYMENT_SECRET_KEY
                },
                body: JSON.stringify(params)
            })

            const data = await response.json();
            console.log(data);

            return data 
        } catch (error) {
            console.error("PAYMENT error:", error);
        }
    },

    async savePayment({invoiceId, status, payMethod, amount, ccy, finalAmount, modifiedDate, paymentInfo}:
        {invoiceId:string, status:string, payMethod:string, amount:number, ccy:number, 
            finalAmount:number, modifiedDate:string, paymentInfo:any}
    ) {
    
   try {
     await repositoryPayment.createPayment(invoiceId, status, payMethod, amount, 
    ccy, finalAmount, modifiedDate, paymentInfo.tranId, paymentInfo.rrn, paymentInfo.fee, dateNow())
   } catch (error) {
    console.error(error); 
   }
    }
}