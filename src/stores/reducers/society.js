import { 
    LOAD_SOCIETY_DATA,
    FETCH_SOCIETY_DATA,
    FETCH_SOCIETY_ERROR,
    FETCH_SOCIETY_RETRY,
    SHOW_SEARCH_MODAL,
    HIDE_MODAL
} from "../actionTypes";


const INITIAL_STATE = {
    isFetching : false,
    error : false,
    retry : false,
    data : {},
    isSearchModelVisible : false
}


const society = (state = INITIAL_STATE , action) => {
    switch(action.type){

        case FETCH_SOCIETY_DATA:
            return { ...state , isFetching : true , error : false, retry : false }
        
        case FETCH_SOCIETY_ERROR:
            return {...state , isFetching: false , error : true }

        case FETCH_SOCIETY_RETRY:
            return {...state , isFetching : false , retry : true }
        
        case LOAD_SOCIETY_DATA:
            return { ...state , data : action.data , isFetching : false }

        case SHOW_SEARCH_MODAL:
            return { ...state , isSearchModelVisible : true }
        
        case HIDE_MODAL:
            return { ...state , isSearchModelVisible : false }
        
        default:
          return state;
    }
}


export default society;