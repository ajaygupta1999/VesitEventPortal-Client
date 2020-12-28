import { combineReducers } from "redux";

import currentUser from "./currentUser";
import error from "./error";
import allEvents from "./allEvents";
import society  from "./society";
import createdEvent from "./createdEvent";

const rootReducer = combineReducers({
    currentUser,
    error,
    createdEvent,
    allEvents,
    society
});

export default rootReducer;