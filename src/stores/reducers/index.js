import { combineReducers } from "redux";

import currentUser from "./currentUser";
import error from "./error";
import allEvents from "./allEvent";
import addingEvent from "./addingEvent";
import society  from "./society";

const rootReducer = combineReducers({
    currentUser,
    error,
    allEvents,
    addingEvent,
    society
});

export default rootReducer;