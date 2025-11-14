import type { BoardType } from "../../types/types.js"
import { sqlAll, sqlGet, sqlRun } from "../db.constructor.js"

//Create
export const createBoard = async (user_id: number, title: string, order_index: number, created_at: string):Promise<void> => {
    await sqlRun(`
        INSERT INTO board (user_id, title, order_index, created_at)
        VALUES (?, ?, ?, ?);
        `, [user_id, title, order_index, created_at])
}

//Get
export const getAllBoards = async (): Promise<BoardType[]> => {
    const boards: BoardType[] = await sqlAll(`SELECT * FROM board`);
    if (!Array.isArray(boards)) {
        console.log(`Unknow format of data, Data: ${boards}`);
    }
    return boards
}