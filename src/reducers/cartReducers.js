import Items from '../constants/items';
import * as ActionTypes from '../constants/ActionTypes';

const cartState ={
    cart:{totalCount:0,totalPrice:0,items:{}},
}

const cartReducer = (state=cartState.cart,action)=>{
    // const {showcase} = state;
    switch(action.type){
        case ActionTypes.ADD_TO_CART:
            const sinPrice = Items.filter(x=>x.id===action.id)[0].price;
            console.log(sinPrice)
            // const firstItem = {count:1};
            // const index = state.items.findIndex(s=>(s.id===action.id));
            // console.log(index)
            // (index === -1) ? {...state,items:[...state.items,firstItem]}: {...state,items:[...state.items,{...state.items[index],count : state.items[index].count+1}] } ;
            return {
                ...state,totalCount:state.totalCount+1,totalPrice:parseFloat((state.totalPrice+sinPrice).toFixed(2)),items:{...state.items,[action.id]:(state.items[action.id]||0)+1}
            }
        
        default:
            return state;
    }
}




export default cartReducer;
