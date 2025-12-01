import { productsRepository } from "../../db/products/productsRepository.js"
import type { CartItem } from "../../types/types.js"
import { newError } from "../../utils/utils.js"

export const servicesUpdateQuantityProduct = {
    async updateQuantityProduct({ cart_items }: { cart_items: CartItem[] }) {
        for (const item of cart_items) {
            const product = await productsRepository.getProduct(item.product_id)
            
            if (item.quantity > product.quantity) {
                newError(undefined, 400, "Quantity orders is biggest then we have")
            }
            await productsRepository.updateQuantityProduct(item.product_id, item.quantity)
        }
    }
}