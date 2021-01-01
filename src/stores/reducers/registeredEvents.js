import {
    FETCH_REGISTERED_EVENTS,
    LOAD_REGISTERED_EVENTS,
    FETCH_REGISTERED_EVENTS_ERROR
} from "../actionTypes";



const DEFAULT_STATE = {
    data : [],
    isFetching : false,
    error : false
}

const registeredEvents = (state = DEFAULT_STATE , action) => {
        switch(action.type){
            case FETCH_REGISTERED_EVENTS:
                return { ...state , isFetching : true , error : false }

            case LOAD_REGISTERED_EVENTS:
                return { data : [ ...action.events ] , isFetching : false , error : false }

            case FETCH_REGISTERED_EVENTS_ERROR:
                return { ...state , isFetching : false , error : true }

            default:
                return state;
        }
}


export default registeredEvents;