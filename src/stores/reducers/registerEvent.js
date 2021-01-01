import {
    FETCH_REGISTER_EVENT,
    LOAD_REGISTER_EVENT,
    FETCH_REGISTER_EVENT_ERROR
} from "../actionTypes";



const DEFAULT_STATE = {
    data : [],
    isFetching : false,
    error : false
}

const registerEvent = (state = DEFAULT_STATE , action) => {
        switch(action.type){
            case FETCH_REGISTER_EVENT:
                return { ...state , isFetching : true , error : false }

            case LOAD_REGISTER_EVENT:
                return { data : [ ...state.data , action.event ] , isFetching : false , error : false }

            case FETCH_REGISTER_EVENT_ERROR:
                return { ...state , isFetching : false , error : true }

            default:
                return state;
        }
}


export default registerEvent;

