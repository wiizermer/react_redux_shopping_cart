import Items from '../constants/items';
import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
    showcase: Items,
    cart: { totalCount: 0, totalPrice: 0, items: [] },
}
const showcaseReducer = (state, action,cartLeft) => {
    let left = cartLeft || 0;
    switch (action.type) {
        case ActionTypes.ADD_TO_CART:
            return state.map(x => (x.id === action.id) ? { ...x, inventory: x.inventory - 1 } : x);
        case ActionTypes.REMOVE_FROM_CART:
            return state.map(x => (x.id === action.id) ? { ...x, inventory: x.inventory + 1 } : x);
        case ActionTypes.DEL_FROM_CART:
            return  state.map(x => (x.id === action.id) ? { ...x, inventory: x.inventory + left } : x);
        case ActionTypes.CLEAR_CART:
            let cart = action.cart.items;
            return state.map( (s) => { 
                let cc = cart.filter(c=>c.id===s.id)[0];
                return cc !== undefined ? {...s,inventory:s.inventory+cc.count}:s 
            })
        default:
            return state;
    }
}
const cartReducer = (state, action, cartOut,left) => {
    let cartOutStatus = cartOut || false;
    switch (action.type) {
        case ActionTypes.ADD_TO_CART:
            let sinPrice = Items.filter(x => x.id === action.id)[0].price;
            let check = state.items.findIndex(x => x.id === action.id);
            if (check === -1) {
                let img = Items.filter(x => x.id === action.id)[0].img;
                let name = Items.filter(x => x.id === action.id)[0].name;
                let firstItem = { id: action.id, count: 1, subTotalPrice: sinPrice, img: img, name: name };
                return {
                    ...state, totalCount: state.totalCount + 1, totalPrice: parseFloat((state.totalPrice + sinPrice).toFixed(2)), items: [...state.items, firstItem]
                }
            } else {
                return {
                    ...state, totalCount: state.totalCount + 1, totalPrice: parseFloat((state.totalPrice + sinPrice).toFixed(2)), items: state.items.map((i) => (i.id === action.id) ? { ...i, count: i.count + 1, subTotalPrice: parseFloat((i.subTotalPrice + sinPrice).toFixed(1)) } : i)
                }
            }
        case ActionTypes.REMOVE_FROM_CART:
            let target = state.items.findIndex(x => x.id === action.id);
            sinPrice = Items.filter(x => x.id === action.id)[0].price;
            if (cartOutStatus) {
                state.items.splice(target, 1);
                
                return {
                    ...state, totalCount: state.totalCount - 1, totalPrice: parseFloat((state.totalPrice - sinPrice).toFixed(1)), items: state.items
                }
            } else {
                return {
                    ...state, totalCount: state.totalCount - 1, totalPrice: parseFloat((state.totalPrice - sinPrice).toFixed(1)), items: state.items.map((i) => (i.id === action.id) ? { ...i, count: i.count - 1, subTotalPrice: parseFloat((i.subTotalPrice - sinPrice).toFixed(1)) } : i)
                }
            }
        
        case ActionTypes.DEL_FROM_CART:
            target = state.items.findIndex(x => x.id === action.id);
            state.items.splice(target, 1);
            return {
                ...state, totalCount: state.totalCount - left, totalPrice: parseFloat((state.totalPrice - (sinPrice*left)).toFixed(1)), items: state.items
            }
        case ActionTypes.CHECKOUT:
            return {
                ...state,totalCount:0,totalPrice:0,items:[]
            }
        case ActionTypes.CLEAR_CART:
            return {
                ...state,totalCount:0,totalPrice:0,items:[]
            }
        default:
            return state;
    }
}
const cart = (state = initialState, action) => {
    let cartLeft;
    switch (action.type) {
        case ActionTypes.ADD_TO_CART:
            const inventory = state.showcase.filter(i => i.id === action.id)[0].inventory;
            if (inventory > 0) {
                return {
                    cart: cartReducer(state.cart, action),
                    showcase: showcaseReducer(state.showcase, action)
                }
            } else {
                alert("inventory out")
                return state
            }
        case ActionTypes.REMOVE_FROM_CART:
            cartLeft = state.cart.items.filter(x => x.id === action.id)[0].count;
            if (cartLeft === 1) {
                return {
                    cart: cartReducer(state.cart, action, true),
                    showcase: showcaseReducer(state.showcase, action)
                };
            } else if (cartLeft === undefined) {
                alert("cart out")
                return state;
            } else {
                return {
                    cart: cartReducer(state.cart, action),
                    showcase: showcaseReducer(state.showcase, action)
                };
            }
        case ActionTypes.DEL_FROM_CART:
            cartLeft = state.cart.items.filter(x => x.id === action.id)[0].count;
            return {
                cart:cartReducer(state.cart,action,false,cartLeft),
                showcase:showcaseReducer(state.showcase, action ,cartLeft)
            }
        case ActionTypes.CHECKOUT:
            return {
                cart:cartReducer(state.cart,action),
                showcase:showcaseReducer(state.showcase,action)
            }

        case ActionTypes.CLEAR_CART:
            return{
                cart:cartReducer(state.cart,action),
                showcase:showcaseReducer(state.showcase,action)
            }
        default:
            return state
    }
}

export default cart;