import { SET_CLASS_AND_SCOEITY_DETAILS, SET_CURRENT_USER , SET_USER_PERSONAL_DETAILS } from "../actionTypes";


const DEFAULT_STATE = {
    isAuthenticated : false,  // Is Authenticated 
    user : {} // User details when logged in
}

// Set user reducer
const currentUser = (state = DEFAULT_STATE , action) => {
    switch(action.type){
        case SET_CURRENT_USER:
            return {
                isAuthenticated : Object.keys(action.user).length > 0,
                user : action.user
            }
        
        case SET_USER_PERSONAL_DETAILS:
           console.log("Set user is called");
           return {
               ...state,
               user : action.user
           }
        
        case SET_CLASS_AND_SCOEITY_DETAILS:
            console.log("Setting class and Socirty Details of user. ....");
            return {
                ...state,
                user : {
                    ...action.user,
                    ...state.user
                }
            }
        
        default:
            return state;
    }
}

export default currentUser;