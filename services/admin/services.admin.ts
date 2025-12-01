import { productsRepository } from "../../db/products/productsRepository.js";
import type { ProductType } from "../../types/types.js";

class Admin {
    data: ProductType
    constructor(data: ProductType) {
        this.data = data
    }

    async createdProduct() {
        await productsRepository.createProduct(
            this.data.title,
            this.data.description,
            this.data.price,
            this.data.category_id,
            this.data.created_at,
            this.data.updated_at
        )
        return 1     
    }

    async editProduct() {
        await productsRepository.updateProduct(this.data.id, this.data.title, this.data.description, this.data.price)
    }
    async deleteProduct() {
        await productsRepository.deleteProduct(this.data.id)
    }

}

export default Admin