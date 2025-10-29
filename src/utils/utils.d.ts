import type { PayloadType, UsersType } from "../types/types.js";
import type { CookieOptions, NextFunction, Request, Response } from "express";
export declare const options: CookieOptions;
export declare const isUser: (data: unknown) => data is UsersType;
export declare const dateNow: string;
export declare const dateExpire: number;
export declare const hashedString: (string: string) => Promise<string>;
export declare const comparePass: (password_hash: string, passwordInput: string) => Promise<boolean>;
export declare const createToken: (data: UsersType) => string[];
export declare const refreshToken: (refresh_token: string, data: UsersType) => string | null;
export declare const checkAuth: (req: Request, res: Response, next: NextFunction) => void | Response;
export declare const decodedAccsesToken: (token: string) => PayloadType | null;
export declare const decodedRefreshToken: (token: string) => PayloadType | null;
export declare const sendlerEmailCode: (email: string, code: string) => void;
export declare const limiter: import("express-rate-limit").RateLimitRequestHandler;
//# sourceMappingURL=utils.d.ts.map