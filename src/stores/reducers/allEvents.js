import { 
    LOAD_ALL_EVENTS,
    FETCH_ALL_EVENTS,
    FETCH_ALL_EVENTS_ERROR 
} from "../actionTypes";


// Default state
const DEFAULT_STATE = {
    data : [],
    isFetching : false,
    error : false 
}


const allEvents = (state = DEFAULT_STATE , action) => {
    switch(action.type){

        case FETCH_ALL_EVENTS:
            return { ...state , isFetching : true , error : false }

        case LOAD_ALL_EVENTS:
            return {
                data : [ ...action.events.allEvents ],
                isFetching : false, 
                error : false
            } 
        
        case FETCH_ALL_EVENTS_ERROR:
            return {
                ...state,
                isFetching : false,
                error : true,
            }
        
        default:
            return state;
    }
}


export default allEvents;