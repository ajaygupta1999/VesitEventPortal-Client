import { ADDING_EVENT_DETAILS } from "../actionTypes";


// Set user reducer
const allEvents = (state = {id : undefined} , action) => {
    switch(action.type){
        case ADDING_EVENT_DETAILS:
            return { 
                id : action.id
            }
              
        default:
            return state;
    }
}

export default allEvents;