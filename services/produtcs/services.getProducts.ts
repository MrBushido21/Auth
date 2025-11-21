import { productsRepository } from "../../db/products/productsRepository.js"
import { newError } from "../../utils/utils.js"

export const servicesGetProducts = {
    async getProducts() {
        const data = await productsRepository.getAllProducts()
        newError(data, 500, "Somthing wrong")

        return data
    }
}