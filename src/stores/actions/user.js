import { apiCall, apiUploadCall , apiComplexCall } from "../../services/api";
import { setAuthorizationToken } from "./auth";
import { config } from "../../Constants";

import {
    FETCH_CLASS_AND_SCOEITY_DETAILS,
    LOAD_CLASS_AND_SCOEITY_DETAILS,
    FETCH_CLASS_AND_SCOEITY_DETAILS_ERROR,
    FETCH_CREATED_EVENT,
    LOAD_CREATED_EVENT,
    FETCH_CREATED_EVENT_ERROR,
    FETCH_ALLUSERS_ERROR
} from "../actionTypes";

import { addError , removeError } from "./error";


// export const setPersonalDetails = (data , id) => async (dispatch) => {
//         try{
//             dispatch({ type : FETCH_USER_PERSONAL_DETAILS });
//             let { token ,  userdetails } = await apiUploadCall("POST" , `${config.Api.API_URL}/api/user/${id}/create/personaldetails` , data);
//             localStorage.setItem("jwtToken", token);
//             setAuthorizationToken(token);     
//             dispatch({ type : LOAD_USER_PERSONAL_DETAILS , user : userdetails });
//             dispatch(removeError());
//         }catch(err){
//             console.error("got error from personal details ===> " , err.message);
//             dispatch({ type : FETCH_USER_PERSONAL_DETAILS_ERROR });
//             dispatch(addError(err.message));
//         }
// }






export const setClassAndSocietyDetails = (data , userid) => async (dispatch) => {
        try{
            dispatch({ type : FETCH_CLASS_AND_SCOEITY_DETAILS });
            let { token , userdetails } = await apiCall("post", `${config.Api.API_URL}/api/user/${userid}/create/classandsociety`, data);
            localStorage.setItem("jwtToken", token);
            setAuthorizationToken(token);
            dispatch({ type : LOAD_CLASS_AND_SCOEITY_DETAILS , user : userdetails });  
            dispatch(removeError());
        }catch(err){
            console.error("got error from classandsocietydetails ===> " , err.message);
            dispatch({ type : FETCH_CLASS_AND_SCOEITY_DETAILS_ERROR  });
            dispatch(addError(err.message));
        }
}


export const setEventDetails = (data , userid) => async (dispatch) => {
      try{
            dispatch({ type : FETCH_CREATED_EVENT  });
            let { eventdetails } = await apiUploadCall("post", `${config.Api.API_URL}/api/createevent/user/${userid}/add/eventdetails`, data);
            dispatch({ type : LOAD_CREATED_EVENT , event : eventdetails });
            dispatch(removeError()); 
            
      }catch(err){
            console.error("Got error while creating error ==>>>" , err);
            dispatch({ type : FETCH_CREATED_EVENT_ERROR });
            dispatch(addError(err.message));
    }
}


// export const setGuestAndSponsorsDetails = (data , userid , eventid) => async (dispatch) => {
//     try{
//         dispatch({ type : FETCH_GUESTANDSPONSOR_DATA });
//         let event = await apiComplexCall("post" , `${config.Api.API_URL}/api/user/${userid}/addevent/${eventid}/guestandsponsor` , data);
//         dispatch({ type : LOAD_GUESTANDSPONSOR_DATA , event });
//         dispatch(removeError());

//     }catch(err){
//         dispatch({ type : FETCH_GUESTANDSPONSOR_DATA_ERROR  });
//         dispatch(addError(err.message));
//     }
// }


export const updateUserProfileData = (userid , data) => async (dispatch) => {
    try{
        dispatch({ type : FETCH_CLASS_AND_SCOEITY_DETAILS });
        let { token , userdetails } = await apiUploadCall("post", `${config.Api.API_URL}/api/user/${userid}/edit/profile/personaldetails`, data);
        localStorage.setItem("jwtToken", token);
        setAuthorizationToken(token);
        dispatch({ type : LOAD_CLASS_AND_SCOEITY_DETAILS , user : userdetails });  
        dispatch(removeError());
    }catch(err){
        console.error("got error from classandsocietydetails ===> " , err.message);
        dispatch({ type : FETCH_CLASS_AND_SCOEITY_DETAILS_ERROR  });
        dispatch(addError(err.message));
    }
}

export const updateUserSocietyDetails = (userid , data) => async (dispatch) => {
    try{
        dispatch({ type : FETCH_CLASS_AND_SCOEITY_DETAILS });
        let { token , userdetails } = await apiCall("post", `${config.Api.API_URL}/api/user/${userid}/edit/profile/societydetails`, data);
        console.log("Got data edited data from server, " , token , userdetails);
        localStorage.setItem("jwtToken", token);
        setAuthorizationToken(token);
        dispatch({ type : LOAD_CLASS_AND_SCOEITY_DETAILS , user : userdetails });  
        dispatch(removeError());
    }catch(err){
        console.error("got error from classandsocietydetails ===> " , err.message);
        dispatch({ type : FETCH_CLASS_AND_SCOEITY_DETAILS_ERROR  });
        dispatch(addError(err.message));
    }
}


export const updateUserClassDetails = (userid , data) => async (dispatch) => {
    try{
        dispatch({ type : FETCH_CLASS_AND_SCOEITY_DETAILS });
        let { token , userdetails } = await apiCall("post", `${config.Api.API_URL}/api/user/${userid}/edit/profile/classdetails`, data);
        console.log("Got data edited data from server, " , token , userdetails);
        localStorage.setItem("jwtToken", token);
        setAuthorizationToken(token);
        dispatch({ type : LOAD_CLASS_AND_SCOEITY_DETAILS , user : userdetails });  
        dispatch(removeError());
    }catch(err){
        console.error("got error from classandsocietydetails ===> " , err.message);
        dispatch({ type : FETCH_CLASS_AND_SCOEITY_DETAILS_ERROR  });
        dispatch(addError(err.message));
    }
}

export const fetchAllUsers = (userid) => async (dispatch) => {
    try{
        let allUsers = await apiCall("get" , `${config.Api.API_URL}/api/user/${userid}/getallusers`);
        return allUsers;  
    }catch(err){
        console.error("Got error while fetching all users ===>>" , err.message);
        dispatch({ type : FETCH_ALLUSERS_ERROR  });
        dispatch(addError(err.message));
    }
}


export const fetchusersocietydetails = (userid) => async (dispatch) => {
    try{
        let societydata = await apiCall("get" , `${config.Api.API_URL}/api/user/${userid}/fetch/societydeails`);
        return societydata;
    }catch(err){
        console.log(err);
    }
} 

export const fetchSpecificUser = (userid) => async (dispatch) => {
     try{
        let { userdata , registeredevents } = await apiCall("get" , `${config.Api.API_URL}/api/user/${userid}/getspecificuser`);
        console.log("Userdata ==> " , userdata , registeredevents);
        dispatch({
            type : "LOAD_SPECIFIC_USER_DATA",
            user : userdata,
            registeredevents
        });
        
     }catch(err){
         console.log(err);
     }
}