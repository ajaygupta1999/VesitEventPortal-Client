import { LOAD_ALL_EVENTS } from "../actionTypes";


// Set user reducer
const allEvents = (state = [] , action) => {
    switch(action.type){
        case LOAD_ALL_EVENTS:
            return [...action.events.allEvents]
              
        default:
            return state;
    }
}

export default allEvents;