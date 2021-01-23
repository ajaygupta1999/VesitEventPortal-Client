import { apiCall, apiUploadCall , apiComplexCall } from "../../services/api";
import { setAuthorizationToken } from "./auth";

import {
    FETCH_USER_PERSONAL_DETAILS,
    LOAD_USER_PERSONAL_DETAILS,
    FETCH_USER_PERSONAL_DETAILS_ERROR,
    FETCH_CLASS_AND_SCOEITY_DETAILS,
    LOAD_CLASS_AND_SCOEITY_DETAILS,
    FETCH_CLASS_AND_SCOEITY_DETAILS_ERROR,
    FETCH_CREATED_EVENT,
    LOAD_CREATED_EVENT,
    FETCH_CREATED_EVENT_ERROR,
    FETCH_GUESTANDSPONSOR_DATA,
    LOAD_GUESTANDSPONSOR_DATA,
    FETCH_GUESTANDSPONSOR_DATA_ERROR,
    FETCH_ALLUSERS_ERROR
} from "../actionTypes";

import { addError , removeError } from "./error";


export const setPersonalDetails = (data , id) => async (dispatch) => {
        try{
            dispatch({ type : FETCH_USER_PERSONAL_DETAILS });
            let { token ,  ...user } = await apiUploadCall("POST" , `/api/user/${id}/create/personaldetails` , data);
            localStorage.setItem("jwtToken", token);
            setAuthorizationToken(token);     
            dispatch({ type : LOAD_USER_PERSONAL_DETAILS , user });
            dispatch(removeError());
            console.log("got data from personalDetails ===>" , user);
        }catch(err){
            console.error("got error from personal details ===> " , err.message);
            dispatch({ type : FETCH_USER_PERSONAL_DETAILS_ERROR });
            dispatch(addError(err.message));
        }
}




export const setClassAndSocietyDetails = (data , id) => async (dispatch) => {
        try{
            dispatch({ type : FETCH_CLASS_AND_SCOEITY_DETAILS });
            let { token ,  ...user } = await apiCall("post", `/api/user/${id}/create/classandsociety`, data);
            localStorage.setItem("jwtToken", token);
            setAuthorizationToken(token);
            dispatch({ type : LOAD_CLASS_AND_SCOEITY_DETAILS , user });  
            dispatch(removeError());
            console.log("Got data from classandsocietydetails  =>>>> " , user);
        }catch(err){
            console.error("got error from classandsocietydetails ===> " , err.message);
            dispatch({ type : FETCH_CLASS_AND_SCOEITY_DETAILS_ERROR  });
            dispatch(addError(err.message));
        }
}


export const setEventDetails = (data , id) => async (dispatch) => {
      try{
            dispatch({ type : FETCH_CREATED_EVENT  });
            let event = await apiUploadCall("post", `/api/user/${id}/add/eventdetails`, data);
            dispatch({ type : LOAD_CREATED_EVENT , event });
            dispatch(removeError()); 
            console.log("got data of event ====> " , event );
      }catch(err){
            console.error("Got error while creating error ==>>>" , err);
            dispatch({ type : FETCH_CREATED_EVENT_ERROR });
            dispatch(addError(err.message));
    }
}


// export const setGuestAndSponsorsDetails = (data , id , eventid) => async (dispatch) => {
//         try{
//             dispatch({ type : FETCH_GUESTANDSPONSOR_DATA });
//             let event = await apiUploadCall("post" , `/api/user/${id}/add/${eventid}/guestandsponsor` , data);
//             dispatch({ type : LOAD_GUESTANDSPONSOR_DATA , event });
//             dispatch(removeError());
//             console.log("got data of guest ===> " , event);

//         }catch(err){
//             console.error("Got error while setting up guest details ===>>" , err.message);
//             dispatch({ type : FETCH_GUESTANDSPONSOR_DATA_ERROR  });
//             dispatch(addError(err.message));
//         }
// }

export const setGuestAndSponsorsDetails = (data , id , eventid) => async (dispatch) => {
    try{
        dispatch({ type : FETCH_GUESTANDSPONSOR_DATA });
        let event = await apiComplexCall("post" , `/api/user/${id}/addevent/${eventid}/guestandsponsor` , data);
        dispatch({ type : LOAD_GUESTANDSPONSOR_DATA , event });
        dispatch(removeError());
        console.log("got data of guest ===> " , event);

    }catch(err){
        console.error("Got error while setting up guest details ===>>" , err.message);
        dispatch({ type : FETCH_GUESTANDSPONSOR_DATA_ERROR  });
        dispatch(addError(err.message));
    }
}


export const fetchAllUsers = (id) => async (dispatch) => {
    try{
        let allUsers = await apiCall("get" , `/api/user/${id}/getallusers`);
        console.log("got all users ==>> " , allUsers);
        return allUsers;  
    }catch(err){
        console.error("Got error while fetching all users ===>>" , err.message);
        dispatch({ type : FETCH_ALLUSERS_ERROR  });
        dispatch(addError(err.message));
    }
}