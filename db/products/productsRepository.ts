import * as product from "./db.dao.js"

export const productsRepository = {
    createProduct: product.createProduct,
    getAllProducts: product.getAllProducts,
    getProductWithCartId: product.getProductWithCartId,
    getProduct: product.getProduct,
    updateProduct: product.updateProduct,
    deleteProduct: product.deleteProduct,
    updateQuantityProduct: product.updateQuantityProduct,
    updateRating: product.updateRating,
    updateSale: product.updateSale
}