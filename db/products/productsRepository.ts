import * as product from "./db.dao.js"

export const productsRepository = {
    createProduct: product.createProduct,
    getAllProducts: product.getAllProducts,
    getProduct: product.getProduct,
    updateProduct: product.updateProduct,
    deleteProduct: product.deleteProduct,
    updateQuantityProduct: product.updateQuantityProduct,
}