import * as wish from "./db.dao.js"
export const wishlistRepository = {
    createWishlist: wish.createWishlist, 
    getItemsWishList: wish.getItemsWishList, 
    deleteWishList: wish.deleteWishList, 
}