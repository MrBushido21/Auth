import { productsRepository } from "../../db/products/productsRepository.js"
import { newError } from "../../utils/utils.js"

export const servicesGetProducts = {
    async getProducts({search, sort}:{search: string, sort: "asc" | "desc"}) {     
        sort === "asc" ? "ASC" : "DESC"   
        const data = await productsRepository.getAllProducts(search, sort)
        newError(data, 500, "Somthing wrong")

        return data
    },
    async getProduct({search}:{search: string | number}) {      
        const data = await productsRepository.getProduct(search)
        newError(data, 500, "Somthing wrong")
        return data
    }
}