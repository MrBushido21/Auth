import * as cart from "./db.dao.js"

export const cartRepository = {
    createCart: cart.createCart,
    createCartItem: cart.createCartItem,
    getCart: cart.getCart,
    getCartItemsWithCartId: cart.getCartItemsWithCartId,
    getCartItem: cart.getCartItem,
    updateCartItem: cart.updateCartItem,
    deleteCartItem: cart.deleteCartItem,
    deleteCartItemWithCartId: cart.deleteCartItemWithCartId,
    increaseQuntity: cart.increaseQuntity,
    decreaseQuntity: cart.decreaseQuntity,
    incrTotalPrice: cart.incrTotalPrice,
    decrTotalPrice: cart.decrTotalPrice,
    getTotalCartPrice: cart.getTotalCartPrice,
    clearTotalPrice: cart.clearTotalPrice,
}

//Создал корзину, нужно еще создадь товарі и отправлять результат