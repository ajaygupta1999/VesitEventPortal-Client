import { apiCall, apiUploadCall } from "../../services/api";

import { 
  FETCH_ALL_EVENTS, 
  LOAD_ALL_EVENTS,
  FETCH_ALL_EVENTS_ERROR,
  FETCH_REGISTERED_EVENTS,
  LOAD_REGISTERED_EVENTS,
  FETCH_REGISTERED_EVENTS_ERROR,
  FETCH_REGISTER_EVENT,
  LOAD_REGISTER_EVENT,
  FETCH_REGISTER_EVENT_ERROR,
  HIDE_ADDGUESTMODAL,
  SHOW_ADDGUESTMODAL,
  SHOW_ADDEVENTTAKERMODAL,
  HIDE_ADDEVENTTAKERMODAL
 } from "../actionTypes";


import { setAuthorizationToken , setCurrentUser } from "./auth";
import { addError, removeError } from "./error";


export const showAddGuestModal = () => ({
  type : SHOW_ADDGUESTMODAL 
})


export const hideAddGuestModal = () => ({
    type : HIDE_ADDGUESTMODAL 
})

export const showAddEventtakerModal = () => ({
  type : SHOW_ADDEVENTTAKERMODAL 
})


export const hideAddEventtakerModal = () => ({
    type : HIDE_ADDEVENTTAKERMODAL 
})


export const fetchAllEvents = () => async (dispatch) => {
     try{
        dispatch({ type : FETCH_ALL_EVENTS }); 
        let allEvents = await apiCall("get" , "/api/event/allevents");
        dispatch({ type : LOAD_ALL_EVENTS  , events : allEvents});
        dispatch(removeError());

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
  }catch(err){
      console.log("Got error while unregistering event ====>" , err.message);
      dispatch({ type : FETCH_REGISTERED_EVENTS_ERROR });
      dispatch(addError(err.message));
  }
}

export const unregisterEventFromProfile = (userid , eventid) => async (dispatch) => {
  try{
   
      let { event } = await apiCall("post" , `/api/event/${eventid}/unregister/user/${userid}`);
      let userdetailsdata = await apiCall("get" , `/api/user/${userid}/getspecificuser`);
      dispatch({
          type : "LOAD_SPECIFIC_USER_DATA",
          user : userdetailsdata.userdata,
          registeredevents : userdetailsdata.registeredevents
      });
      let { token , userdetails , registeredevents } = await apiCall("get" , `/api/user/${userid}/get/updateddataandtoken`);
      console.log("Updating root data , " ,token , userdetails);
      localStorage.setItem("jwtToken", token);
      setAuthorizationToken(token);     
      dispatch(setCurrentUser(userdetails , registeredevents));  
      dispatch(removeError());          
      return userdetails; 

  }catch(err){
      console.log("Got error while unregistering event ====>" , err.message);
      dispatch({ type : FETCH_REGISTERED_EVENTS_ERROR });
      dispatch(addError(err.message));
  }
}

export const registerSpecificEvent = (userid , eventid) => async (dispatch) => {
   try{
      let { event } = await apiCall("post" , `/api/event/${eventid}/register/user/${userid}` );
      console.log("got event data from server ==> " , event);
      dispatch({ type : "LOAD_SPECIFIC_EVENT_DATA" , event});
      let { token , userdetails , registeredevents } = await apiCall("get" , `/api/user/${userid}/get/updateddataandtoken`);
      console.log("Updating root data , " ,token , userdetails);
      localStorage.setItem("jwtToken", token);
      setAuthorizationToken(token);     
      dispatch(setCurrentUser(userdetails , registeredevents));  
      dispatch(removeError());          
      return userdetails; 

   }catch(err){
       console.log("Error while registering specific event , " , err);
   }
}


export const unregisterSpecificEvent = (userid , eventid) => async (dispatch) => {
  try{
     let { event } = await apiCall("post" , `/api/event/${eventid}/unregister/user/${userid}` );
     console.log("got event data from server ==> " , event);
     dispatch({ type : "LOAD_SPECIFIC_EVENT_DATA" , event});
     let { token , userdetails , registeredevents } = await apiCall("get" , `/api/user/${userid}/get/updateddataandtoken`);
      console.log("Updating root data , " ,token , userdetails);
      localStorage.setItem("jwtToken", token);
      setAuthorizationToken(token);     
      dispatch(setCurrentUser(userdetails , registeredevents));  
      dispatch(removeError());          
      return userdetails; 
  }catch(err){
      console.log("Error while registering specific event , " , err);
  }
}


export const fetchregisteredEvents = (userid) => async (dispatch) => {
    try{
       dispatch({ type : FETCH_REGISTERED_EVENTS });
       let { events } = await apiCall("get" , `/api/event/user/${userid}/registeredevents`);
       dispatch({ type : LOAD_REGISTERED_EVENTS , events });
       dispatch(removeError());

    }catch(err){
        console.log("Got error while registering event ====>" , err.message);
        dispatch({ type : FETCH_REGISTERED_EVENTS_ERROR });
        dispatch(addError(err.message));
    }
}


export const fetchCreatedEvent = (userid , eventid ) => async (dispatch) => {
    try{
        let { event } = await apiCall("get" , `/api/user/${userid}/event/${eventid}/createdeventsdetails`);
        dispatch({ type : "LOAD_CREATED_EVENT" , event : event });
    }catch(err){
       console.log(err);
    }
} 


export const fetchguestandsponsorspagedata = (userid , eventid) => async (dispatch) => {
    try{
       let { selectedguests , selectedeventtakers , addedguests , addedeventtakers  , addedsponsors } = await apiCall("get" , `/api/user/${userid}/addevent/${eventid}/getallguestsandsponsorsandeventtakers`);
       let selectedguestsarr = selectedguests.map(eachperson => {
          if(eachperson.roletype === "user"){
              return eachperson.data;
          }
          let newobj = eachperson.data; 
          newobj.roletype = eachperson.roletype;
          return newobj;
       });
 
       let selectedeventtakersarr = selectedeventtakers.map(eachperson => {
            if(eachperson.roletype === "user"){
              return eachperson.data;
            }
            let newobj = eachperson.data;
            newobj.roletype = eachperson.roletype;
            return newobj;
      });

      let addedguestsarr = addedguests.map(eachperson => {
          let newobj = eachperson.data;
          newobj.roletype = eachperson.roletype;
          return newobj;
      });

      let addedeventtakersarr = addedeventtakers.map(eachperson => {
          let newobj = eachperson.data;
          newobj.roletype = eachperson.roletype;
          return newobj;
      });
    
      let addedsponsorsarr = addedsponsors.map(sponsor => {
            let newobj = sponsor;
            newobj.roletype = "sponsor";
            newobj.role = "sponsor"; 
            return newobj;
      });

      dispatch({
          type : "LOAD_SELECTED_GUESTS",
          data : selectedguestsarr
      });

      dispatch({
        type : "LOAD_SELECTED_EVENTTAKERS",
        data : selectedeventtakersarr
      });

      dispatch({
        type : "LOAD_ADDED_GUESTS",
        data : addedguestsarr
      });

      dispatch({
        type : "LOAD_ADDED_EVENTTAKERS",
        data : addedeventtakersarr
      });

      dispatch({
        type : "LOAD_ADDED_SPONSORS",
        data : addedsponsorsarr
      });

    }catch(err){
       console.log("Got error while getting all data ==> " , err);

    }
}

  // Guest and Sponsors and Eventakers details add 
 export const handleAddSelectedPerson = (data , userid , eventid) => async (dispatch) => {
       try{
          let { target , selectedpersons } = await apiCall("post" , `/api/user/${userid}/addevent/${eventid}/addselected/guestoreventaker` , data);
          if(target === "guest"){
              let newdata = selectedpersons.map(eachperson => {
                   if(eachperson.roletype === "user"){
                        return eachperson.data;
                   }
                   let newobj = eachperson.data; 
                   newobj.roletype = eachperson.roletype;
                   return newobj;
              });
              dispatch({
                type : "LOAD_SELECTED_GUESTS",
                data : newdata
              });
          } 

          if(target === "eventtaker"){
              let newdata = selectedpersons.map(eachperson => {
                  if(eachperson.roletype === "user"){
                     return eachperson.data;
                  }
                  let newobj = eachperson.data;
                  newobj.roletype = eachperson.roletype;
                  return newobj;
              });
              dispatch({
                type : "LOAD_SELECTED_EVENTTAKERS",
                data : newdata
              });
          }
          
       }catch(err){
         console.log("Got error in Adding selected person => " , err.message);
       }
 }

 export const handleRemoveSelectedPerson = (data , userid , eventid) => async (dispatch) => {
      try{
        let { target , selectedpersons } = await apiCall("delete" , `/api/user/${userid}/addevent/${eventid}/remove/selected/${data.target}/${data.roletype}/${data.role}/${data.key}`);
          if(target === "guest"){
              let newdata = selectedpersons.map(eachperson => {
                   if(eachperson.roletype === "user"){
                        return eachperson.data;
                   }
                   let newobj = eachperson.data;
                   newobj.roletype = eachperson.roletype;
                   return newobj;
              });
              console.log("modified data ," , newdata );
              dispatch({
                type : "LOAD_SELECTED_GUESTS",
                data : newdata
              });
          } 

          if(target === "eventtaker"){
              let newdata = selectedpersons.map(eachperson => {
                  if(eachperson.roletype === "user"){
                     return eachperson.data;
                  }
                  let newobj = eachperson.data;
                  newobj.roletype = eachperson.roletype;
                  return newobj;
              });
              dispatch({
                type : "LOAD_SELECTED_EVENTTAKERS",
                data : newdata
              });
          }
      }catch(err){
        console.log("Got error in Adding selected person => " , err.message);
      }
 }

 export const handleAddPerson = (data , userid , eventid) => async (dispatch) => {
    try{
        let { target , addedpersons } = await apiCall("post" , `/api/user/${userid}/addevent/${eventid}/addperson/guestoreventakerorsponsor` , data);
       
        if(target === "guest"){
            let newdata = addedpersons.map(eachperson => {
                let newobj = eachperson.data;
                newobj.roletype = eachperson.roletype;
                return newobj;
            });
            dispatch({
              type : "LOAD_ADDED_GUESTS",
              data : newdata
            });
        } 

        if(target === "eventtaker"){
            let newdata = addedpersons.map(eachperson => {
                let newobj = eachperson.data;
                newobj.roletype = eachperson.roletype;
                return newobj;
            });
            dispatch({
              type : "LOAD_ADDED_EVENTTAKERS",
              data : newdata
            });
        }
      
    }catch(err){
      console.log("Got error in Adding selected person => " , err.message);
    }
}

export const handleRemovePerson = (data , userid , eventid) => async (dispatch) => {
  try{

    let { target , removedpersons } = await apiCall("delete" , `/api/user/${userid}/addevent/${eventid}/remove/added/${data.target}/${data.roletype}/${data.role}/${data.key}` , data);
    
    let newdata = removedpersons.map(person => {
        let newobj = person; 
        newobj.roletype = target;
        return newobj;
    });
    
    if(target === "guest"){
        dispatch({
          type : "LOAD_ADDED_GUESTS" ,
          data : newdata
        });
    }
    if(target === "eventtaker"){
        dispatch({
            type : "LOAD_ADDED_EVENTTAKERS",
            data : newdata
        });
    }
  }catch(err){
    console.log("Got error in Adding selected person => " , err.message);
  }
}


export const handleAddSponsor = (data , userid , eventid) => async (dispatch) => {
    try{
       let { target , sponsors } = await apiUploadCall("post" , `/api/user/${userid}/addevent/${eventid}/addsponsor/sponsor` , data);
       let newdata = sponsors.map(sponsor => {
            let newobj = sponsor;
            newobj.roletype = target;
            newobj.role = target; 
            return newobj;
       });

       dispatch({
         type : "LOAD_ADDED_SPONSORS",
         data : newdata
       });
       
    }catch(err){
      console.log("Got error while adding sponsor ==> " , err.message)
    }
}

export const handleRemoveSponsor = (data , userid , eventid) => async (dispatch) => {
    try{
      let { target , sponsors } = await apiCall("delete" , `/api/user/${userid}/addevent/${eventid}/remove/sponsor/${data.target}/${data.key}`)
      let newdata = sponsors.map(sponsor => {
          let newobj = sponsor;
          newobj.roletype = target;
          newobj.role = target; 
          return newobj;
      });

      dispatch({
          type : "LOAD_ADDED_SPONSORS",
          data : newdata
      });
      }catch(err){
       console.log(err.message);

    }
}


export const addFormLink = (data , userid , eventid) => async (dispatch) => {
    try{
        let { eventdetails }  = await apiCall("post" , `/api/user/${userid}/addevent/${eventid}/add/registrationlink` , data);
        console.log("Got Form data from server =>>> " , eventdetails);        
        dispatch({
            type : "LOAD_CREATED_EVENT",
            event : eventdetails
        });
        return eventdetails;
    }catch(err){
        console.log(err);
    }
}

export const showeventcreatedmodal = () =>  async (dispatch) => {
    try{
       dispatch({
          type : "SHOW_EVENT_CREATED_SUCCESSFUL_MODAL"
       });
    }catch(err){
        console.log("Got error while ");
    }
}

export const hideeventcreatedmodal = () =>  async (dispatch) => {
  try{
     dispatch({
        type : "HIDE_EVENT_CREATED_SUCCESSFUL_MODAL"
     });
  }catch(err){
      console.log("Got error while ");
  }
}

export const fetchEventDetails = (userid , eventid) => async (dispatch) => {
  try{
      let { eventdetails } = await apiCall("get" , `/geteventdetails/user/${userid}/event/${eventid}`);
      dispatch({
          type : "LOAD_EVENT_DETAILS",
          data : eventdetails
      });

  }catch(err){
      console.log(err);
  }
}


export const getspecificevent = (eventid) => async (dispatch) => {
     try { 
         let { event } = await apiCall("get" , `/api/event/${eventid}/getspecificevent`);
         dispatch({ type : "LOAD_SPECIFIC_EVENT_DATA", event });
     }catch(err){
         console.log(err);
     }
} 

export const getFileData = (dataobj ) => async (dispatch) => {
     try{
       setAuthorizationToken(dataobj.token);
       let data = await apiCall("get" , `https://www.googleapis.com/drive/v2/files/${dataobj.data.id}?alt=media`);
       console.log(data);
     }catch(err){
       console.log(err);
     }
}