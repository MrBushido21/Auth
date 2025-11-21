import * as cart from "./db.dao.js"

export const cartRepository = {
    createCart: cart.createCart,
    createCartItem: cart.createCartItem,
    getCart: cart.getCart,
    getCartItemsWithCartId: cart.getCartItemsWithCartId,
    getCartItem: cart.getCartItem,
    updateCartItem: cart.updateCartItem,
    deleteCart: cart.deleteCart,
    deleteCartItem: cart.deleteCartItem,
    deleteCartItemWithCartId: cart.deleteCartItemWithCartId,
}

//Создал корзину, нужно еще создадь товарі и отправлять результат