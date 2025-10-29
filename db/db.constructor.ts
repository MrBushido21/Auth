import sqlite3 from "sqlite3"
import type { UsersType } from "../types/types.js"
const { Database } = sqlite3

export const db = new Database('users.db', (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  } else {
    console.log('Database ok');
  }
})

export const sqlRun = (sqlText: string, sqlParams?: unknown[]): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    db.run(sqlText, sqlParams, (err: unknown, data: unknown) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
} 
export const sqlGet = (sqlText: string, sqlParams?: unknown[]): Promise<UsersType> => {
  return new Promise((resolve, reject) => {
    db.get(sqlText, sqlParams, (err: unknown, data: UsersType) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
} 
export const sqlAll = (sqlText: string, sqlParams?: unknown[]): Promise<UsersType[]> => {
  return new Promise((resolve, reject) => {
    db.all(sqlText, sqlParams, (err: unknown, data: UsersType[]) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
} 