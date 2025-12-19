import { productsRepository } from "../../db/products/productsRepository.js"
import type { CartItem, ProductType } from "../../types/types.js"

 class Cart {
    //[ { productId: 1, qty: 1 } ] 
    localCart: any[]

    constructor(localCart: any[]) {
        this.localCart = localCart 
    }
    
    async getCartItems() {
        
        let cart:CartItem[] = []
        for (const item of this.localCart) {
            const product = await productsRepository.getProduct(item.productId)
            let cart_item = {
                product_id: product.id,
                product_name: product.title,
                product_img: product.image_url,
                quantity: item.qty, 
                products_qty: product.quantity,
                price: product.price * item.qty
            }
            cart.push(cart_item)
        }
        

        return cart
    }

    async getTotalCartPrice() {
        let cartItems = await this.getCartItems()
        let price = 0
        for (const item of cartItems) {
         const product = await productsRepository.getProduct(item.product_id)
         price += (product.price * (1 - product.sale)) * item.quantity   
        }
        
        return price
    }


}

export default Cart