import * as ActionTypes from '../constants/ActionTypes';

export const addToCart = (id) =>{
    return {
        type: ActionTypes.ADD_TO_CART,
        id
    }
}
export const removeFromCart = (id) =>{
    return {
        type: ActionTypes.REMOVE_FROM_CART,
        id
    }
}
export const delFromCart = (id) =>{
    return {
        type:ActionTypes.DEL_FROM_CART,
        id
    }
}
export const checkOut = () =>{
    return {
        type:ActionTypes.CHECKOUT
    }
}
export const clearCart = (cart) =>{
    return {
        type:ActionTypes.CLEAR_CART,
        cart
    }
}