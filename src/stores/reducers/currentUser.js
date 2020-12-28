import { 
   FETCH_CURRENT_USER,
   LOAD_CURRENT_USER,
   FETCH_CURRENT_USER_ERROR,
   FETCH_USER_PERSONAL_DETAILS,
   LOAD_USER_PERSONAL_DETAILS,
   FETCH_USER_PERSONAL_DETAILS_ERROR,
   FETCH_CLASS_AND_SCOEITY_DETAILS,
   LOAD_CLASS_AND_SCOEITY_DETAILS,
   FETCH_CLASS_AND_SCOEITY_DETAILS_ERROR 
} from "../actionTypes";


const DEFAULT_STATE = {
    isAuthenticated : false, 
    user : {},
    isFetching : false,
    error : false
}

// Set user reducer
const currentUser = (state = DEFAULT_STATE , action) => {
    switch(action.type){

        case FETCH_CURRENT_USER:
            return { ...state , isFetching : true , error : false }

        case LOAD_CURRENT_USER:
            return {
                isAuthenticated : Object.keys(action.user).length > 0,
                user : action.user,
                isFetching :false,
                error : false
            }
        
        case FETCH_CURRENT_USER_ERROR:
            return { ...state , isFetching : false , error : true }

        case FETCH_USER_PERSONAL_DETAILS:
            return { ...state , isFetching : true , error : false }

        case LOAD_USER_PERSONAL_DETAILS:
           return { ...state , user : action.user , isFetching : false , error : false}
        
        case FETCH_USER_PERSONAL_DETAILS_ERROR:
            return { ...state , isFetching : false , error : true }
        
        case FETCH_CLASS_AND_SCOEITY_DETAILS:
            return { ...state , isFetching : true , error : false }
   
        case LOAD_CLASS_AND_SCOEITY_DETAILS:
            return { 
                ...state,
                user : action.user,
                isFetching : false,
                error : false
            }
        
        case FETCH_CLASS_AND_SCOEITY_DETAILS_ERROR:
            return { ...state, isFetching : false, error : true }
        
        default:
            return state;
    }
}

export default currentUser;