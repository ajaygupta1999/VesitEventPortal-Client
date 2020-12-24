import { apiCall, setTokenHeader } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import { addError , removeError } from "./error";

export function setCurrentUser(user) {
    return {
      type: SET_CURRENT_USER,
      user
    };
}

export function setAuthorizationToken(token) {
    setTokenHeader(token);
}

export function logout() {
  return dispatch => {
    localStorage.clear();
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}


export function authUser(userData) {
  
    return dispatch => {
      // wrap our thunk in a promise so we can wait for the API call
      return new Promise((resolve, reject) => {
        return apiCall("post", "/api/auth/signup/google", userData)
          .then(({ token , ...user }) => {
                localStorage.setItem("jwtToken", token);
                setAuthorizationToken(token);     // To add Authrization header all axios requests 
                dispatch(setCurrentUser(user));   // Action object for setting userData to store
                dispatch(removeError());          // Action object for removing error
                resolve(user); // indicate that the API call succeeded
          })
          .catch(err => {
            dispatch(addError(err.message));
            reject(); // indicate the API call failed
          });
      });
    };
  }