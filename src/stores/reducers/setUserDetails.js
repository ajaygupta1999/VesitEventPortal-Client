import SET_USER_PERSONAL_DETAILS from "../actionTypes";


const DEFAULT_STATE = {
    isAuthenticated : false,  // Is Authenticated 
    user : {} // User details when logged in
}


export const setUserPersonalDetails = (state = DEFAULT_STATE , action) => {
    switch(action.type){
        case SET_USER_PERSONAL_DETAILS:
            return {
                isAuthenticated : state.isAuthenticated,
                user : {
                    ...state.user,
                    ...action.data
                }
            }
        
        default:
            return state;
    }
}

