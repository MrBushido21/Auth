import sqlite3 from "sqlite3";
export declare const db: sqlite3.Database;
export declare const sqlRun: (sqlText: string, sqlParams?: unknown[]) => Promise<unknown>;
export declare const sqlGet: (sqlText: string, sqlParams?: unknown[]) => Promise<any>;
export declare const sqlAll: (sqlText: string, sqlParams?: unknown[]) => Promise<any[]>;
//# sourceMappingURL=db.constructor.d.ts.map