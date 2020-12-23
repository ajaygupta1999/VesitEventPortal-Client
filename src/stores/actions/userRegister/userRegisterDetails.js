
import { apiCall, apiUploadCall } from "../../../services/api";
import { SET_USER_PERSONAL_DETAILS , SET_CLASS_AND_SCOEITY_DETAILS , ADDING_EVENT_DETAILS } from "../../actionTypes"; 
import { addError , removeError } from "../error";


const setPersonalDetail = (user) => {
    return {
        type : SET_USER_PERSONAL_DETAILS,
        user
    }
}

const setAddingEventDetails = (event) => {
    return {
        type : ADDING_EVENT_DETAILS,
        id : event.id
    }
}

const setClassAndSocietyDetail = (user) => {
    return {
        type : SET_CLASS_AND_SCOEITY_DETAILS,
        user
    }
}

export function setPersonalDetails(data , id){
    return dispatch => {
        return apiUploadCall("POST" , `/api/user/${id}/create/personaldetails` , data)
        .then(data => {
            console.error(data);
            dispatch(removeError()); 
            dispatch(setPersonalDetail(data));
        }).catch(err => {
            dispatch(addError(err.message));
        })
    }
}

export function setClassAndSocietyDetails(data , id){
    return dispatch => {
    
        return apiCall("post", `/api/user/${id}/create/classandsociety`, data)
          .then((user) => {
                console.log(data);
                dispatch(removeError());
                dispatch(setClassAndSocietyDetail(user));       
          })
          .catch(err => {
              console.log(err);
            dispatch(addError(err.message));
          });
    }
}


export function setEventDetails(data , id){
    return dispatch => {
    
        return apiUploadCall("post", `/api/user/${id}/add/eventdetails`, data)
          .then((event) => {
                dispatch(setAddingEventDetails(event));
                dispatch(removeError());      
          })
          .catch(err => {
              console.log(err);
              dispatch(addError(err.message));
          });
    }
}


export function setGuestAndSponsorsDetails(data , id , eventid){
    return dispatch => {
        
        return apiUploadCall("post" , `/api/user/${id}/add/${eventid}/guestandsponsor` , data)
        .then((data) => {
            console.error(data);
            dispatch(removeError())
        })
        .catch(err => {
            console.log(err);
            dispatch(addError(err.message));
        })
    }
}