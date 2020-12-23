import { apiCall } from "../../services/api";
import { LOAD_ALL_EVENTS } from "../actionTypes";
import { addError } from "./error";

export const loadAllEvents = ( events ) => ({
    type : LOAD_ALL_EVENTS,
    events
  }   
)


export function fetchAllEvents() {
    return dispatch => {
      // wrap our thunk in a promise so we can wait for the API call
      return apiCall("get" , "/api/event/allevents")
      .then(res => {
         console.log("Got events list" , res);
         dispatch(loadAllEvents(res));
      }).catch(err => {
        console.log("Got errors" , err.message);
        dispatch(addError(err.message));
      })
    };
  }