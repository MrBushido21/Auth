import * as board from "./db.dao.js"

export const boardRepository = {
    createBoard: board.createBoard,
    getAllBoards: board.getAllBoards
}