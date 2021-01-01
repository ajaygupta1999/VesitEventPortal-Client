
import { 
    FETCH_CURRENT_USER,
    LOAD_CURRENT_USER,
    FETCH_CURRENT_USER_ERROR
} from "../actionTypes";

import { addError , removeError } from "./error";
import { apiCall, setTokenHeader } from "../../services/api";

export const setCurrentUser = (user) => {
    return {
      type: LOAD_CURRENT_USER,
      user
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



export const loginOrSignUp = (userData) => async dispatch => {
      try{
          dispatch({ type : FETCH_CURRENT_USER });
          let { token , ...user } = await apiCall("post", "/api/auth/loginOrSignUp/google", userData);
          localStorage.setItem("jwtToken", token);
          setAuthorizationToken(token);     
          dispatch(setCurrentUser(user));  
          dispatch(removeError());          
          return user; 
      }catch(err){
          console.log("Error while login ==>>> " , err.message);
          dispatch({ type : FETCH_CURRENT_USER_ERROR });
          dispatch(addError(err.message));
      }
  }

