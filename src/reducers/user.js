import Items from '../constants/items';
import * as ActionTypes from '../constants/ActionTypes';


const initialState={
    loggedIn:false,
    loggingIn:false,
    userInfo:{
        status:"",
        user:{}
    }
}

const user = (state=initialState,action) =>{
    switch(action.type){
        case ActionTypes.LOGGIN_REQUEST:
            return {
                ...state,loggingIn:true,userInfo:{
                    status:"pendding",
                    user
                }
            };
        
        default:
            return state;
    }
         


}

export default user