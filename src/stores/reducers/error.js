import { ADD_ERROR , REMOVE_ERROR } from "../actionTypes";


// Error handle reducer
const errorHandler = ( state = {message : null} , action ) => {
    switch(action.type){
        case ADD_ERROR:
            return { messgae : action.error}
        
        case REMOVE_ERROR:
            return { messgae : null }

        default :
             return state; 
    }
}

export default errorHandler;