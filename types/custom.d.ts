import type { JwtPayload } from "jsonwebtoken";
import type { PayloadType } from "./types.ts";

declare global {
    namespace Express {
        interface Request {
            user?: string | PayloadType
            user_id?: number
            rawBody?: Buffer;
        }
    }
}