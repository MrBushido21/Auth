import { productsRepository } from "../../db/products/productsRepository.js"
import { wishlistRepository } from "../../db/wishlist/wishlistRepository.js"
import type { OrderFilter, ProductType, SortDirection, wishListType } from "../../types/types.js"
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
    async getAll( search: string, sort:SortDirection, page:number, category_id:number, in_stock?: boolean | undefined, 
            sale?: boolean | undefined, filter?: OrderFilter) {
                
        try {
            const wishList = await wishlistRepository.getItemsWishList(this.user_id)
            newError(wishList, 500, "somthig error")
            
            const products = await productsRepository.getAllProducts(search, sort, category_id, in_stock, sale, 
                filter)
           const wishlistIds = new Set(wishList.map(w => w.product_id))

            const itemsWishList = products.filter(p => wishlistIds.has(p.id))
            
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