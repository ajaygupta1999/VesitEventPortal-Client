import { combineReducers } from "redux";

import currentUser from "./currentUser";
import error from "./error";
import allEvents from "./allEvents";
import society  from "./society";
import registerEvent from "./registerEvent";
import registeredEvents from "./registeredEvents";
import createdEvent from "./createdEvent";

const rootReducer = combineReducers({
    currentUser,
    registerEvent,
    registeredEvents,
    error,
    createdEvent,
    allEvents,
    society
});

export default rootReducer;