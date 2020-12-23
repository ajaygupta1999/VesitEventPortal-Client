import { ADD_ERROR , REMOVE_ERROR } from "../actionTypes";


// Error handle reducer
const errorHandler = ( state = {message : null} , action ) => {
    switch(action.type){
        case ADD_ERROR:
            return {...state , messgae : action.error}
        
        case REMOVE_ERROR:
            return { ...state , messgae : null }

        default :
             return state; 
    }
}

export default errorHandler;