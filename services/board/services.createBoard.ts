import { boardRepository } from "../../db/board/boardRepository.js"
import { dateNow, newError } from "../../utils/utils.js"

export const createBoardServices = {
    async create({user_id, title}: {user_id:number, title:string}) {
        const boards = await boardRepository.getAllBoards()
        newError(boards, 500, "Somthing wrong, try again")
        const board = {
            user_id,
            title: title,
            order_index: boards.length + 1,
            created_at: dateNow()
        }
        await boardRepository.createBoard(board.user_id, board.title, board.order_index, board.created_at)
    }
}