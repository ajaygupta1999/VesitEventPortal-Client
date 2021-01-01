import { apiCall } from "../../services/api";

import { 
  FETCH_ALL_EVENTS, 
  LOAD_ALL_EVENTS,
  FETCH_ALL_EVENTS_ERROR,
  FETCH_REGISTERED_EVENTS,
  LOAD_REGISTERED_EVENTS,
  FETCH_REGISTERED_EVENTS_ERROR,
  FETCH_REGISTER_EVENT,
  LOAD_REGISTER_EVENT,
  FETCH_REGISTER_EVENT_ERROR

 } from "../actionTypes";

import { addError, removeError } from "./error";


export const fetchAllEvents = () => async (dispatch) => {
      
     try{
        dispatch({ type : FETCH_ALL_EVENTS }); 
        let allEvents = await apiCall("get" , "/api/event/allevents");
        dispatch({ type : LOAD_ALL_EVENTS  , events : allEvents});
        dispatch(removeError());
        console.log("got all events data ==> ", allEvents);

     }catch(err){
       console.log("got error while loading all events ===> " , err.message);
       dispatch({ type : FETCH_ALL_EVENTS_ERROR });
       dispatch(addError(err.message));
     }
  }


export const registerEvent = (userid , eventid) => async (dispatch) => {
  try{
    dispatch({ type : FETCH_REGISTER_EVENT });
    let { event } = await apiCall("post" , `/api/event/${eventid}/register/user/${userid}`);
    dispatch({ type : LOAD_REGISTER_EVENT , event });
    dispatch({ type : FETCH_REGISTERED_EVENTS });
    let { events } = await apiCall("get" , `/api/event/user/${userid}/registeredevents`);
    dispatch({ type : LOAD_REGISTERED_EVENTS , events });
    dispatch(removeError());
    console.log("got the registering event data and all events ===> " , event , events);
  }catch(err){
      console.log("Got error while registering event ====>" , err.message);
      dispatch({ type : FETCH_REGISTER_EVENT_ERROR });
      dispatch(addError(err.message));
  }
}

export const unregisterEvent = (userid , eventid) => async (dispatch) => {
  try{
   
    let { event } = await apiCall("post" , `/api/event/${eventid}/unregister/user/${userid}`);
    dispatch({ type : FETCH_REGISTERED_EVENTS });
    let { events } = await apiCall("get" , `/api/event/user/${userid}/registeredevents`);
    dispatch({ type : LOAD_REGISTERED_EVENTS , events });
    dispatch(removeError());
    console.log("got the unregistering event data and all events ===> " , event , events);
  }catch(err){
      console.log("Got error while unregistering event ====>" , err.message);
      dispatch({ type : FETCH_REGISTERED_EVENTS_ERROR });
      dispatch(addError(err.message));
  }
}



export const fetchregisteredEvents = (userid) => async (dispatch) => {
    try{
       dispatch({ type : FETCH_REGISTERED_EVENTS });
       let { events } = await apiCall("get" , `/api/event/user/${userid}/registeredevents`);
       dispatch({ type : LOAD_REGISTERED_EVENTS , events });
       dispatch(removeError());
       console.log("Got data of registered events ===> " , events);

    }catch(err){
        console.log("Got error while registering event ====>" , err.message);
        dispatch({ type : FETCH_REGISTERED_EVENTS_ERROR });
        dispatch(addError(err.message));
    }
  }
