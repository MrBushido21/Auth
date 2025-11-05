import { isUser } from "../utils/utils.js";
import { sqlAll, sqlGet, sqlRun } from "./db.constructor.js";
// Create
export const createUsers = async (user) => {
    const { id, password_hash, email, status, created_at, updated_at, refresh_token, verifeid, verifeid_code, verifeid_expire_time } = user;
    await sqlRun(`
            INSERT INTO users (id, email, password_hash, status, created_at, updated_at, refresh_token, verifeid, verifeid_code, verifeid_expire_time)
            VALUES (?,?,?,?,?,?,?,?,?,?);        
        `, [id, email, password_hash, status, created_at, updated_at, refresh_token, verifeid, verifeid_code, verifeid_expire_time]);
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
    if (!isUser(user)) {
        console.log(`Unknow format of data, Data: ${user}`);
    }
    return user;
};
export const getUserForEmail = async (email) => {
    const user = await sqlGet(`
           SELECT * FROM users
           WHERE email = ?
       `, [email]);
    if (!isUser(user)) {
        console.log(`Unknow format of data in 'getUserForEmail', Data: ${user}`);
    }
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
export const getUserForRestToken = async (token) => {
    const user = await sqlGet(`
           SELECT * FROM users
           WHERE rest_token = ?
       `, [token]);
    console.log(token);
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
//Update
export const updateRefreshToken = async (id, refreshToken) => {
    await sqlRun(`
        UPDATE users SET refresh_token = ? WHERE id = ?
        `, [refreshToken, id]);
};
export const updateVerifyStatus = async (id, verifeid, verifeid_code, dateExpire) => {
    await sqlRun(`
        UPDATE users 
        SET verifeid = ?, verifeid_code = ?,  verifeid_expire_time = ?  
        WHERE id = ?
        `, [verifeid, verifeid_code, dateExpire, id]);
};
export const updateVerifyCode = async (id, verifeid_code, dateExpire) => {
    await sqlRun(`
        UPDATE users 
        SET verifeid_code = ?,  verifeid_expire_time = ?  
        WHERE id = ?
        `, [verifeid_code, dateExpire, id]);
};
export const addRestToken = async (id, token, dateExpire) => {
    await sqlRun(`
        UPDATE users 
        SET rest_token = ?, rest_expire = ?  
        WHERE id = ?
        `, [token, dateExpire, id]);
};
export const changePassword = async (id, password, rest_token) => {
    await sqlRun(`
        UPDATE users 
        SET password_hash = ?
        SET rest_token = ?
        WHERE id = ?
        `, [password, rest_token, id]);
};
//# sourceMappingURL=db.repository.js.map