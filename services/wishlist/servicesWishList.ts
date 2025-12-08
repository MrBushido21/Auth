import { productsRepository } from "../../db/products/productsRepository.js"
import { wishlistRepository } from "../../db/wishlist/wishlistRepository.js"
import type { ProductType } from "../../types/types.js"
import { newError } from "../../utils/utils.js"

class Wishlist {
    user_id:number
    product_id:number

    constructor(user_id:number, product_id:number) {
        this.product_id = product_id
        this.user_id = user_id
    }

    async create() {
        try {
            await wishlistRepository.createWishlist(this.user_id, this.product_id)
        } catch (error) {
            console.error(error);
            
        }
    }
    async getAll() {
        try {
            const wishList = await wishlistRepository.getItemsWishList(this.user_id)
            newError(wishList, 500, "somthig error")
            let itemsWishList:ProductType[] = []
            
            for (const item of wishList) {
                let product = await productsRepository.getProduct(item.product_id)
                itemsWishList.push(product)
            }
            return itemsWishList              
        } catch (error) {
            console.error(error);            
        }
    }

    async deleteItem() {
        try {
             await wishlistRepository.deleteWishList(this.user_id, this.product_id)
        } catch (error) {
            console.error(error);            
        }
    }
}

export default Wishlist