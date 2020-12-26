import { apiCall, setTokenHeader } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import { addError , removeError } from "./error";

export const setCurrentUser = (user) => {
    return {
      type: SET_CURRENT_USER,
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
          let { token , ...user } = await apiCall("post", "/api/auth/loginOrSignUp/google", userData);
          localStorage.setItem("jwtToken", token);
          setAuthorizationToken(token);     
          dispatch(setCurrentUser(user));  
          dispatch(removeError());          
        return user; 
      }catch(err){
          dispatch(addError(err.message));
      }
  }