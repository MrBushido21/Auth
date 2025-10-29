import sqlite3 from "sqlite3";
import type { UsersType } from "../types/types.js";
export declare const db: sqlite3.Database;
export declare const sqlRun: (sqlText: string, sqlParams?: unknown[]) => Promise<unknown>;
export declare const sqlGet: (sqlText: string, sqlParams?: unknown[]) => Promise<UsersType>;
export declare const sqlAll: (sqlText: string, sqlParams?: unknown[]) => Promise<UsersType[]>;
//# sourceMappingURL=db.constructor.d.ts.map