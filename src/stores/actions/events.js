import { apiCall } from "../../services/api";

import { 
  FETCH_ALL_EVENTS, 
  LOAD_ALL_EVENTS,
  FETCH_ALL_EVENTS_ERROR
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