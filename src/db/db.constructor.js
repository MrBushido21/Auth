import sqlite3 from "sqlite3";
const { Database } = sqlite3;
export const db = new Database('users.db', (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    else {
        console.log('Database ok');
    }
});
export const sqlRun = (sqlText, sqlParams) => {
    return new Promise((resolve, reject) => {
        db.run(sqlText, sqlParams, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
};
export const sqlGet = (sqlText, sqlParams) => {
    return new Promise((resolve, reject) => {
        db.get(sqlText, sqlParams, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
};
export const sqlAll = (sqlText, sqlParams) => {
    return new Promise((resolve, reject) => {
        db.all(sqlText, sqlParams, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
};
//# sourceMappingURL=db.constructor.js.map