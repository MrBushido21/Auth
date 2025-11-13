import { isUser } from "../utils/utils.js";
import { sqlAll, sqlGet, sqlRun } from "./db.constructor.js";
// Create
export const createUser = async (user) => {
    const { id, password_hash, email, status, created_at, updated_at, verifeid_at } = user;
    await sqlRun(`
            INSERT INTO users (id, email, password_hash, status, created_at, updated_at, verifeid_at)
            VALUES (?,?,?,?,?,?,?);        
        `, [id, email, password_hash, status, created_at, updated_at, verifeid_at]);
};
export const addVerificationCode = async (user_id, code, created_at, expires_at) => {
    await sqlRun(`
            INSERT INTO user_codes (user_id, type, code, created_at, expires_at)
            VALUES (?, 'verification', ?, ?, ?)
        `, [user_id, code, created_at, expires_at]);
};
export const addRefreshToken = async (user_id, refresh_token, created_at, expires_at) => {
    await sqlRun(`
        INSERT INTO refresh_tokens (user_id, refresh_token, created_at, expires_at)
        VALUES (?, ?, ?, ?)
        `, [user_id, refresh_token, created_at, expires_at]);
};
export const addRestToken = async (user_id, token, key, created_at, expires_at) => {
    await sqlRun(`
        INSERT INTO user_codes (token, key, user_id, type, created_at, expires_at)
            VALUES (?, ?, ?, 'reset', ?, ?)
        `, [token, key, user_id, created_at, expires_at]);
};
//Update
export const updateUsers = async (user) => {
    const { id, password_hash, email } = user;
    await sqlRun(`
            UPDATE users SET email = ? password_hash = ? 
            WHERE id = ?             
        `, [email, password_hash, id]);
};
//GetOne
export const getUserForId = async (id) => {
    const user = await sqlGet(`
            SELECT * FROM users
            WHERE id = ?;
        `, [id]);
    return user;
};
export const getCodeForId = async (user_id) => {
    const record = await sqlGet(`
        SELECT id, code, expires_at
        FROM user_codes
        WHERE user_id = ?
        AND type = 'verification'
        ORDER BY created_at DESC LIMIT 1
        `, [user_id]);
    return record;
};
export const getTokenForId = async (user_id) => {
    const token = await sqlGet(`
            SELECT * FROM refresh_tokens WHERE user_id = ?
        `, [user_id]);
    return token;
};
export const getResetTokenForKey = async (key) => {
    const tokenObj = await sqlGet(`
        SELECT user_id, id, token, expires_at
        FROM user_codes
        WHERE key = ?
        AND type = 'reset'
        ORDER BY created_at DESC LIMIT 1
        `, [key]);
    return tokenObj;
};
export const getUserForEmail = async (email) => {
    const user = await sqlGet(`
           SELECT * FROM users
           WHERE email = ?
       `, [email]);
    return user;
};
export const getUserForToken = async (token) => {
    const user = await sqlGet(`
           SELECT * FROM users
           WHERE refresh_token = ?
       `, [token]);
    if (!isUser(user)) {
        console.log(`Unknow format of data in 'getUserForEmail', Data: ${user}`);
    }
    return user;
};
//GetAll
export const getUsers = async () => {
    const users = await sqlAll(`SELECT * FROM users`);
    if (!Array.isArray(users)) {
        console.log(`Unknow format of data, Data: ${users}`);
    }
    return users;
};
//Delete
export const deleteUser = async (id) => {
    await sqlRun(`
        DELETE FROM users
        WHERE id = ?
        `, [id]);
};
export const deleteAll = async () => {
    await sqlRun(`DELETE FROM users`);
};
export const deleteUserCode = async (id) => {
    await sqlRun(`DELETE FROM user_codes WHERE id = ?`, [id]);
};
//Update
export const updateRefreshToken = async (id, refreshToken) => {
    await sqlRun(`
        UPDATE refresh_tokens SET refresh_token = ? WHERE user_id = ?
        `, [refreshToken, id]);
};
export const updateVerifyStatus = async (id, verifeid_at) => {
    await sqlRun(`
        UPDATE users 
        SET verifeid_at = ?  
        WHERE id = ?
        `, [verifeid_at, id]);
};
export const updateVerifyCode = async (id, code, expires_at) => {
    await sqlRun(`
        UPDATE user_codes
        SET code = ?,  expires_at = ?
        WHERE id = ?
        `, [code, expires_at, id]);
};
export const changePassword = async (id, password) => {
    await sqlRun(`
        UPDATE users 
        SET password_hash = ?
        WHERE id = ?
        `, [password, id]);
};
//# sourceMappingURL=db.repository.js.map