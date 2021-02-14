import {
    LOAD_SPECIFIC_USER_DATA
} from "../actionTypes";


const DEFAULT_STATE = {
    user : {},
    registeredevents : [],
    isFetching : false,
    error : false
}


const specificUser = ( state = DEFAULT_STATE , action ) => {

    switch(action.type) {

        case LOAD_SPECIFIC_USER_DATA : 
            return { ...state , user : action.user , registeredevents : action.registeredevents }

        default : 
           return state
    }
     
}

export default specificUser;