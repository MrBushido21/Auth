import { cartRepository} from "../../db/cart/cartRepository.js"
import { productsRepository } from "../../db/products/productsRepository.js"
import { dateNow, newError } from "../../utils/utils.js"

 class Cart {
    user_id:number
    product_id: number
    product_name:string
    quantity: number
    price: number
    
    constructor(user_id:number, product_id: number, product_name:string, quantity: number, price: number) {
        this.user_id = user_id 
        this.product_id = product_id 
        this.product_name = product_name 
        this.quantity = quantity 
        this.price = price 
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
            await cartRepository.createCartItem(cart_id, this.product_id, this.product_name, this.quantity, price, dateNow())
            cartItem = await cartRepository.getCartItem(cart_id, this.product_id)
        }
        return cartItem
    }

    async getCartItemsWithCartId() {
        let cart_id = (await cartRepository.getCart(this.user_id))?.id 

        if (!cart_id) {
            cart_id = (await this.getOrCreateCart()).id
        }
        const cartItems = await cartRepository.getCartItemsWithCartId(cart_id)
        
        return cartItems
    }

    async getTotalCartPrice() {
        let price = 0
        const cartItems = await this.getCartItemsWithCartId()
        cartItems.map(item => (price += +item.price))
        return price
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

    async increaseQuntity() {
        const cart_id = (await cartRepository.getCart(this.user_id)).id
        const cartItem_id = (await cartRepository.getCartItem(cart_id, this.product_id)).id
        
        await cartRepository.increaseQuntity(cartItem_id)
    }
    async decreaseQuntity() {
        const cart_id = (await cartRepository.getCart(this.user_id)).id
        const cartItem = (await cartRepository.getCartItem(cart_id, this.product_id))
        const cartItem_id = cartItem.id
        if ((cartItem.quantity - 1) === 0) {
            this.deleteCartItem()
        }
        await cartRepository.decreaseQuntity(cartItem_id)
    }

    async deleteCartItemWithCartId() {
        const cart_id = (await cartRepository.getCart(this.user_id)).id
        await cartRepository.deleteCartItemWithCartId(cart_id)
    }

}

export default Cart