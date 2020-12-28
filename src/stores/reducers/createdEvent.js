import {
    FETCH_CREATED_EVENT,
    LOAD_CREATED_EVENT,
    FETCH_CREATED_EVENT_ERROR,
    FETCH_GUESTANDSPONSOR_DATA,
    LOAD_GUESTANDSPONSOR_DATA,
    FETCH_GUESTANDSPONSOR_DATA_ERROR
} from "../actionTypes";


const DEFAULT_STATE = {
    data : {},
    isFetching : false,
    error : false
} 



const createdEvent = ( state = DEFAULT_STATE , action ) => {

    switch(action.type){
        case FETCH_CREATED_EVENT:
            return {  ...state , isFetching : true , error : false }

        case LOAD_CREATED_EVENT:
            return {  data : { ...action.event } , isFetching : false , error : false }
        
        case FETCH_CREATED_EVENT_ERROR:
            return { ...state , isFetching : false , error: true }

        case FETCH_GUESTANDSPONSOR_DATA:
            return { ...state , isFetching : true , error : false }
        
        case LOAD_GUESTANDSPONSOR_DATA:
            return { data : { ...state.data , ...action.event } , isFetching : false , error : false }

        case FETCH_GUESTANDSPONSOR_DATA_ERROR:
            return { ...state , isFetching : false , error : true }

        default:
            return state;
    }
}


export default createdEvent;
