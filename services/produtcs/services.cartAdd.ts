import { cartRepository} from "../../db/cart/cartRepository.js"
import { productsRepository } from "../../db/products/productsRepository.js"
import { dateNow } from "../../utils/utils.js"

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
        const cart_id = (await cartRepository.getCart(this.user_id)).id
        const cartItems = await cartRepository.getCartItemsWithCartId(cart_id)
        return cartItems
    }

    async deleteCart() {
        const cart_id = (await cartRepository.getCart(this.user_id)).id
        await cartRepository.deleteCart(cart_id)
    }
    async deleteCartItem() {
        const cart_id = (await cartRepository.getCart(this.user_id)).id
        const cartItem_id = (await cartRepository.getCartItem(cart_id, this.product_id)).id
        await cartRepository.deleteCartItem(cartItem_id)
    }
    async deleteCartItemWithCartId() {
        const cart_id = (await cartRepository.getCart(this.user_id)).id
        await cartRepository.deleteCartItemWithCartId(cart_id)
    }

//1. Нажали кнопку добавили товар в корзину и делаем проверку есть ли уже єтот товар или нет
//2. Если єтот же товар снова добавили делаем проверку есть ли уже єтот товар в таблице товаров и если есть то добавляем
//3. Удалять товар из корзині
}

export default Cart