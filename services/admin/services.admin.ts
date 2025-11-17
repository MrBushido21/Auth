import { boardRepository } from "../../db/service/boardRepository.js";
import type { ProductType } from "../../types/types.js";

class Admin {
    data: ProductType
    constructor(data: ProductType) {
        this.data = data
    }

    async createdProduct() {
        await boardRepository.createBoard(
            this.data.title,
            this.data.description,
            this.data.price,
            this.data.category_id,
            this.data.created_at,
            this.data.updated_at
        )
        return 1
    }

}

export default Admin