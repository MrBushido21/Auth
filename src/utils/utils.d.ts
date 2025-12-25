import type { PayloadType, target_idType, UsersType } from "../types/types.js";
import type { CookieOptions, Request } from "express";
export declare const chekOrderStatus: (invoiceId: string) => Promise<void>;
export declare const generateCode: () => number;
export declare const dateNow: () => string;
export declare const dateExpire: (time: number) => string;
export declare const newError: (value: any, status: number, err: string) => void;
export declare const options: CookieOptions;
export declare const isUser: (data: unknown) => data is UsersType;
export declare const hashedString: (string: string) => Promise<string>;
export declare const comparePass: (password_hash: string, passwordInput: string) => Promise<boolean>;
export declare const createToken: (data: UsersType) => string[];
export declare const refreshToken: (refresh_token: string, data: UsersType) => string | null;
export declare const decodedAccsesToken: (token: string) => PayloadType | null;
export declare const decodedRefreshToken: (token: string) => PayloadType | null;
export declare const sendlerEmailCode: (email: string, code: string, subject?: string) => void;
export declare const limiter: import("express-rate-limit").RateLimitRequestHandler;
export declare const chekUser: (req: Request) => number | undefined;
export declare const chekQueryId: (req: Request) => number;
export declare const removeLocalFile: (filePath: string) => void;
export declare const createLog: (user_id: number, action: string, target_id: target_idType, target_type: string, description: string) => {
    user_id: number;
    action: string;
    target_id: target_idType;
    target_type: string;
    description: string;
};
//# sourceMappingURL=utils.d.ts.map