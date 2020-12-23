import { combineReducers } from "redux";

import currentUser from "./currentUser";
import error from "./error";
import allEvents from "./allEvent";
import addingEvent from "./addingEvent";

const rootReducer = combineReducers({
    currentUser,
    error,
    allEvents,
    addingEvent
});

export default rootReducer;