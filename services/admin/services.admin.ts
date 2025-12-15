import { productsRepository } from "../../db/products/productsRepository.js";
import type { ProductType } from "../../types/types.js";

class Admin {
    data: ProductType
    constructor(data: ProductType) {
        this.data = data
    }

    async createdProduct() {
        const rating = 0
        const qntrewies = 0
        await productsRepository.createProduct(
            this.data.title,
            this.data.description,
            this.data.price,
            this.data.category_id,
            this.data.quantity,
            rating,
            qntrewies,
            0,
            this.data.created_at,
            this.data.updated_at
        )
        return 1     
    }

    async editProduct() {
        await productsRepository.updateProduct(this.data.id, this.data.title, this.data.description, this.data.price, this.data.quantity, this.data.sale)
    }
    async updateRating() {
        await productsRepository.updateRating(this.data.id, this.data.rating)
    }
    
    async deleteProduct() {
        await productsRepository.deleteProduct(this.data.id)
    }
    
}

export default Admin