import { getProduct } from "../../db/products/db.dao.js"
import { productsRepository } from "../../db/products/productsRepository.js"
import { newError } from "../../utils/utils.js"

export const servicesGetProducts = {
    async getProducts({ search, sort, page, category_id }: { search: string, sort: "asc" | "desc", page:number, category_id:number }) {
        sort === "asc" ? "ASC" : "DESC"
        let data = await productsRepository.getAllProducts(search, sort, category_id)
        newError(data, 500, "Somthing wrong")

        let newData = []

        data.map(product => {
            product.price = product.price * (1 - product.sale)
            newData.push(product)
        })

        let start = page * 5
        let end = start + 5
        if (start === data.length) {
            return data = []
        }
        let sliceDate = data.slice(start, end)
        page++

        return sliceDate
    },

    async getProduct({id}: {id:number}) {
        const product = await productsRepository.getProduct(id)
        newError(product, 500, "Somthing wrong")
        return product
    }
}