import type { NextFunction, Request, Response} from "express"
import * as crypto from 'crypto'
import { getCachedMonoPublicKey } from "../cfg/payment/mono.publickKey.js";

 
export async function verifyMonoSignMiddleware( 
  req: Request,
  res: Response,
  next: NextFunction
) {

// example pubkey, you should receive one at https://api.monobank.ua/api/merchant/pubkey 
let pubKeyBase64 = await getCachedMonoPublicKey()

// value from X-Sign header in webhook request
let xSignBase64 = req.headers['x-sign'] as string;

let message = `${req.body}`

let signatureBuf = Buffer.from(xSignBase64, 'base64');
let publicKeyBuf = Buffer.from(pubKeyBase64, 'base64');

let verify = crypto.createVerify('SHA256');

verify.write(message);
verify.end();

try {
  let result = verify.verify(publicKeyBuf, signatureBuf);

next();
} catch (error) {
  console.error(error);
  
}
}
