import type { CodesType, TokensType, UserRecordType, UsersType } from "../../types/types.js";
import { isUser } from "../../utils/utils.js";
import { sqlAll, sqlGet, sqlRun } from "../db.constructor.js";
// Create
export const createUser = async (user: UsersType): Promise<void> => {
    const { id, password_hash, email, status,  avatar, created_at, updated_at, verifeid_at} = user

    await sqlRun(`
            INSERT INTO users (id, email, password_hash, status, avatar, created_at, updated_at, verifeid_at)
            VALUES (?,?,?,?,?,?,?,?);        
        `, [id, email, password_hash, status, avatar, created_at, updated_at, verifeid_at])
}


export const addVerificationCode = async (user_id: number, code: string, created_at:string, expires_at:string): Promise<void> => {
    await sqlRun(`
            INSERT INTO user_codes (user_id, type, code, created_at, expires_at)
            VALUES (?, 'verification', ?, ?, ?)
        `, [user_id, code, created_at, expires_at])
}

export const addRefreshToken = async (user_id: number, refresh_token: string | undefined, created_at:string, expires_at:string): Promise<void> => {
    await sqlRun(`
        INSERT INTO refresh_tokens (user_id, refresh_token, created_at, expires_at)
        VALUES (?, ?, ?, ?)
        `, [user_id, refresh_token, created_at, expires_at])
}

export const addRestToken = async (user_id: number, token: string, key:string, created_at:string, expires_at:string) => {
    await sqlRun(`
        INSERT INTO user_codes (token, key, user_id, type, created_at, expires_at)
            VALUES (?, ?, ?, 'reset', ?, ?)
        `,
        [token, key, user_id, created_at, expires_at])
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
    return user
}

export const getCodeForId = async (user_id: number): Promise<UserRecordType> => {
    const record: UserRecordType = await sqlGet(`
        SELECT id, code, expires_at
        FROM user_codes
        WHERE user_id = ?
        AND type = 'verification'
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
export const getResetTokenForKey = async (key: string): Promise<CodesType> => {
    const tokenObj: CodesType = await sqlGet(`
        SELECT user_id, id, token, expires_at
        FROM user_codes
        WHERE key = ?
        AND type = 'reset'
        ORDER BY created_at DESC LIMIT 1
        `, [key])
    return tokenObj
}
export const getUserForEmail = async (email: string): Promise<UsersType> => {
    const user: UsersType = await sqlGet(`
           SELECT * FROM users
           WHERE email = ?
       `,
        [email]
    );
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

const cleanExpiredCodes = async (id: number) => {
  await sqlRun(`DELETE FROM user_codes WHERE expires_at < CURRENT_TIMESTAMP`)
}

// запуск каждые 10 минут (600000 мс)
setInterval(cleanExpiredCodes, 10 * 60 * 1000);

//Update
export const updateRefreshToken = async (id: number, refreshToken: string): Promise<void> => {
    await sqlRun(`
        UPDATE refresh_tokens SET refresh_token = ? WHERE user_id = ?
        `,
        [refreshToken, id])
}
export const updateVerifyStatus = async (id: number, verifeid_at: string): Promise<void> => {
    await sqlRun(`
        UPDATE users 
        SET verifeid_at = ?  
        WHERE id = ?
        `,
        [verifeid_at, id])
}
export const updateVerifyCode = async (id: number, code: string, expires_at: string): Promise<void> => {
    await sqlRun(`
        UPDATE user_codes
        SET code = ?,  expires_at = ?
        WHERE id = ?
        `,
        [code, expires_at, id])
}
export const changePassword = async (id: number, password: string) => {
    await sqlRun(`
        UPDATE users 
        SET password_hash = ?
        WHERE id = ?
        `,
        [password, id])
}
export const changeEmail = async (id: number, email: string) => {
    await sqlRun(`
        UPDATE users 
        SET email = ?
        WHERE id = ?
        `,
        [email, id])
}


