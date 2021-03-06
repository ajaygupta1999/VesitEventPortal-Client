import { config } from "../../Constants";

import { 
    FETCH_CURRENT_USER,
    LOAD_CURRENT_USER,
    FETCH_CURRENT_USER_ERROR
} from "../actionTypes";

import { addError , removeError } from "./error";
import { apiCall, setTokenHeader } from "../../services/api";

export const setCurrentUser = (user , registeredevents) => {
    return {
      type: LOAD_CURRENT_USER,
      user,
      registeredevents
    };
}

export const setAuthorizationToken = (token) => {
    setTokenHeader(token);
}

export const logout = () => dispatch => {
    localStorage.clear();
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
}

// export const loginUser = (userData) => async dispatch => {
//     try{
//         let { token , ...user } = await apiCall("post", "/api/auth/login/google", userData);
//         localStorage.setItem("jwtToken", token);
//         setAuthorizationToken(token);    
//         dispatch(setCurrentUser(user));   
//         dispatch(removeError());          
//         return user;
//     }catch(err){
//         dispatch(addError(err.message));
//     }
// }


// After relaod fetching user data
export const logUserAfterRefresh = (userid) => async dispatch => {
    try{
        console.log("Api has been called");
        let user = await apiCall("GET" , `${config.Api.API_URL}/api/user/${userid}/getspecificuser`);
        console.log(user);

    }catch(err){
        console.log(err);
        dispatch(addError(err.message));
    }
}



export const getUserData = async (userid) => {
    try{
        console.log("Function has been called");
        let userdata = await apiCall("GET" , `${config.Api.API_URL}/api/user/${userid}/getspecificuser`);
        return userdata;
    }catch(err){
        console.log(err);
    }
}



export const loginOrSignUp = (userData) => async dispatch => {
      try{
          dispatch({ type : FETCH_CURRENT_USER });
          let { token , userdetails , registeredevents } = await apiCall("post", `${config.Api.API_URL}/api/auth/loginOrSignUp/google`, userData);
          localStorage.setItem("jwtToken", token);
          setAuthorizationToken(token);     
          dispatch(setCurrentUser(userdetails , registeredevents));  
          dispatch(removeError());          
          return userdetails; 
      }catch(err){
          console.log("Error while login ==>>> " , err.message);
          dispatch({ type : FETCH_CURRENT_USER_ERROR });
          dispatch(addError(err.message));
      }
}



