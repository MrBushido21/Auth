import { productsRepository } from "../../db/products/productsRepository.js"
import { newError } from "../../utils/utils.js"

export const servicesGetProducts = {
    async getProducts({ search, sort, page }: { search: string, sort: "asc" | "desc", page:number }) {
        sort === "asc" ? "ASC" : "DESC"
        let data = await productsRepository.getAllProducts(search, sort)
        newError(data, 500, "Somthing wrong")

        let start = page * 5
        let end = start + 5
        if (start === data.length) {
            return data = []
        }
        let sliceDate = data.slice(start, end)
        page++

        return sliceDate
    }
}