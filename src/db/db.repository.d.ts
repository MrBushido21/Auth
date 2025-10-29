import type { UsersType } from "../types/types.js";
export declare const createUsers: (user: UsersType) => Promise<void>;
export declare const updateUsers: (user: UsersType) => Promise<void>;
export declare const getUserForId: (id: number | undefined) => Promise<UsersType>;
export declare const getUserForEmail: (email: string) => Promise<UsersType>;
export declare const getUserForToken: (token: string) => Promise<UsersType>;
export declare const getUserForRestToken: (token: string) => Promise<UsersType>;
export declare const getUsers: () => Promise<UsersType[]>;
export declare const deleteUser: (id: number) => Promise<void>;
export declare const deleteAll: () => Promise<void>;
export declare const updateRefreshToken: (id: number, refreshToken: string) => Promise<void>;
export declare const updateVerifyStatus: (id: number, verifeid: string, verifeid_code: number | null, dateExpire: number | null) => Promise<void>;
export declare const updateVerifyCode: (id: number, verifeid_code: number | null, dateExpire: number | null) => Promise<void>;
export declare const addRestToken: (id: number, token: string, dateExpire: number | null) => Promise<void>;
export declare const changePassword: (id: number, password: string) => Promise<void>;
//# sourceMappingURL=db.repository.d.ts.map