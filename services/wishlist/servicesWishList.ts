import { wishlistRepository } from "../../db/wishlist/wishlistRepository.js"

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
            //Добавить товары, тут только айдишники пока что 
            const itemsWishList = await wishlistRepository.getItemsWishList(this.user_id)
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