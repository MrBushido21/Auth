import type { CodesType, TokensType, UserRecordType, UsersType } from "../types/types.js";
import { isUser } from "../utils/utils.js";
import { sqlAll, sqlGet, sqlRun } from "./db.constructor.js";
// Create
export const createUsers = async (user: UsersType): Promise<void> => {
    const { id, password_hash, email, status, created_at, updated_at, verifeid_at } = user

    await sqlRun(`
            INSERT INTO users (id, email, password, status, created_at, updated_at, verifeid)
            VALUES (?,?,?,?,?,?,?,?,?,?);        
        `, [id, email, password_hash, status, created_at, updated_at, verifeid_at])
}


export const addVerificationCode = async (user_id: number, code: string): Promise<void> => {
    await sqlRun(`
            INSERT INTO user_codes (user_id, type, code, created_at, expires_at)
            VALUES (?, 'verification', ?, datetime('now'), datetime('now', '+2 minutes'))
        `, [user_id, code])
}

export const addRefreshToken = async (user_id: number, refresh_token: string | undefined): Promise<void> => {
    await sqlRun(`
        INSERT INTO refresh_tokens (user_id, refresh_token, created_at, expires_at)
        VALUES (?, ?, datetime('now'), datetime('now', '+10 minutes'))
        `, [user_id, refresh_token])
}

export const addRestToken = async (user_id: number, token: string) => {
    await sqlRun(`
        INSERT INTO user_codes (user_id, type, created_at, expires_at)
            VALUES (?, 'reset', datetime('now'), datetime('now', '+2 minutes'))
        `,
        [token, user_id])
}
//Update
export const updateUsers = async (user: UsersType): Promise<void> => {
    const { id, password_hash, email } = user

    await sqlRun(`
            UPDATE users SET email = ? password_hash = ? 
            WHERE id = ?             
        `, [email, password_hash, id])
}

//GetOne
export const getUserForId = async (id: number | undefined): Promise<UsersType> => {
    const user: UsersType = await sqlGet(`
            SELECT * FROM users
            WHERE id = ?;
        `, [id])
    if (!isUser(user)) {
        console.log(`Unknow format of data, Data: ${user}`);
    }
    return user
}

export const getCodeForId = async (user_id: number): Promise<UserRecordType> => {
    const record: UserRecordType = await sqlGet(`
        SELECT id, code, expires_at
        FROM user_codes
        WHERE user_id = ?
        AND type = 'verification'
        AND expires_at > datetime('now')
        ORDER BY created_at DESC LIMIT 1
        `, [user_id])
    return record
}
export const getTokenForId = async (user_id: number): Promise<TokensType> => {
    const token: TokensType = await sqlGet(`
            SELECT * FROM refresh_tokens WHERE user_id = ?
        `, [user_id])
    return token
}
export const getResetTokenForId = async (user_id: number | undefined): Promise<CodesType> => {
    const token: CodesType = await sqlGet(`
        SELECT id, token, expires_at
        FROM user_codes
        WHERE user_id = ?
        AND type = 'reset'
        AND expires_at > datetime('now')
        ORDER BY created_at DESC LIMIT 1
        `, [user_id])
    return token
}
export const getUserForEmail = async (email: string): Promise<UsersType> => {
    const user: UsersType = await sqlGet(`
           SELECT * FROM users
           WHERE email = ?
       `,
        [email]
    );
    if (!isUser(user)) {
        console.log(`Unknow format of data in 'getUserForEmail', Data: ${user}`);
    }
    return user
}
export const getUserForToken = async (token: string): Promise<UsersType> => {
    const user: UsersType = await sqlGet(`
           SELECT * FROM users
           WHERE refresh_token = ?
       `,
        [token]
    );
    if (!isUser(user)) {
        console.log(`Unknow format of data in 'getUserForEmail', Data: ${user}`);
    }
    return user
}
export const getUserForRestToken = async (token: string): Promise<UsersType> => {
    const user: UsersType = await sqlGet(`
           SELECT * FROM user_codes
           WHERE token = ?
       `,
        [token]
    );
    console.log(token);

    return user
}
//GetAll
export const getUsers = async (): Promise<UsersType[]> => {
    const users: UsersType[] = await sqlAll(`SELECT * FROM users`);
    if (!Array.isArray(users)) {
        console.log(`Unknow format of data, Data: ${users}`);
    }

    return users
}

//Delete
export const deleteUser = async (id: number): Promise<void> => {
    await sqlRun(`
        DELETE FROM users
        WHERE id = ?
        `, [id]);
}
export const deleteAll = async (): Promise<void> => {
    await sqlRun(`DELETE FROM users`);
}

export const deleteUserCode = async (id: number) => {
    await sqlRun(`DELETE FROM user_codes WHERE id = ?`, [id])
}

//Update
export const updateRefreshToken = async (id: number, refreshToken: string): Promise<void> => {
    await sqlRun(`
        UPDATE refresh_tokens SET refresh_token = ? WHERE user_id = ?
        `,
        [refreshToken, id])
}
export const updateVerifyStatus = async (id: number, verifeid: string, verifeid_code: number | null, dateExpire: number | null): Promise<void> => {
    await sqlRun(`
        UPDATE users 
        SET verifeid = ?, verifeid_code = ?,  verifeid_expire_time = ?  
        WHERE id = ?
        `,
        [verifeid, verifeid_code, dateExpire, id])
}
export const updateVerifyCode = async (id: number, verifeid_code: string): Promise<void> => {
    await sqlRun(`
        UPDATE user_codes
        SET verifeid_code = ?,  expires_at = datetime('now', '+2 minutes')  
        WHERE id = ?
        `,
        [verifeid_code, id])
}
export const changePassword = async (id: number, password: string) => {
    await sqlRun(`
        UPDATE users 
        SET password = ?
        WHERE id = ?
        `,
        [password, id])
}

