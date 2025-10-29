export type UsersType = {
    id: number;
    email: string;
    password_hash: string;
    status: string;
    refresh_token: string;
    created_at: string;
    updated_at: string;
    verifeid: string;
    verifeid_code: number | null;
    verifeid_expire_time: number | null;
    rest_token: string | undefined;
    rest_expire: number | null;
};
export type PayloadType = {
    id: number;
    email: string;
    status: string;
};
//# sourceMappingURL=types.d.ts.map