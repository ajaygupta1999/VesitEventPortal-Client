import {
    LOAD_SPECIFIC_EVENT_DATA
} from "../actionTypes";


const DEFAULT_STATE = {
    data : {},
    isFetching : false,
    error : false
}


const specificEvent = ( state = DEFAULT_STATE , action ) => {

    switch(action.type) {

        case LOAD_SPECIFIC_EVENT_DATA : 
            return { ...state , data : action.event }

        default : 
           return state
    }
     
}

export default specificEvent;