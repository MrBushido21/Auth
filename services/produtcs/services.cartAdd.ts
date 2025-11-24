import { cartRepository} from "../../db/cart/cartRepository.js"
import { productsRepository } from "../../db/products/productsRepository.js"
import { dateNow, newError } from "../../utils/utils.js"

 class Cart {
    user_id:number
    product_id: number
    quantity: number
    price: number

    constructor(user_id:number, product_id: number, quantity: number, price: number) {
        this.user_id = user_id 
        this.product_id = product_id 
        this.quantity = quantity 
        this.price = product_id 
    }
    
    async getOrCreateCart() {
        let cart = await cartRepository.getCart(this.user_id)
        
        if (!cart) {
          await cartRepository.createCart(this.user_id, dateNow(), dateNow())
          cart = await cartRepository.getCart(this.user_id)
        }
        return cart
    }

    async controllerCartItems() {
        const cart_id = (await cartRepository.getCart(this.user_id)).id
        let cartItem = await cartRepository.getCartItem(cart_id, this.product_id)
        const product = await productsRepository.getProduct(this.product_id)
        const price = product.price * this.quantity
        
        if (cartItem) {
            await cartRepository.updateCartItem(this.product_id, this.quantity, price)
        } else {
            await cartRepository.createCartItem(cart_id, this.product_id, this.quantity, price, dateNow())
            cartItem = await cartRepository.getCartItem(cart_id, this.product_id)
        }
        return cartItem
    }

    async getCartItemsWithCartId() {
        const cart_id = (await cartRepository.getCart(this.user_id))?.id      
        newError(cart_id, 404, "Not found cart user_id is bad") 
        const cartItems = await cartRepository.getCartItemsWithCartId(cart_id)
        return cartItems
    }

    async deleteCartItem() {
        try {
        const cart_id = (await cartRepository.getCart(this.user_id)).id
        const cartItem_id = (await cartRepository.getCartItem(cart_id, this.product_id)).id
        await cartRepository.deleteCartItem(cartItem_id)
        } catch (error) {
            console.error(error);
            
        }
    }

    async deleteCartItemWithCartId() {
        const cart_id = (await cartRepository.getCart(this.user_id)).id
        await cartRepository.deleteCartItemWithCartId(cart_id)
    }

}

export default Cart