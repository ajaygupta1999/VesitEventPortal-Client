import { apiCall } from "../../services/api";
import {  
   LOAD_SOCIETY_DATA,
   FETCH_SOCIETY_DATA,
   FETCH_SOCIETY_ERROR,
   ADD_ERROR,
   REMOVE_ERROR,
   SHOW_SEARCH_MODAL,
   HIDE_SEARCH_MODAL
} from "../actionTypes";

const addError = (error) => ({
    type : ADD_ERROR,
    error 
})
  
const removeError = () => ({
    type: REMOVE_ERROR
});

export const showSearchModal = () => ({
    type : SHOW_SEARCH_MODAL
});

export const hideSearchModal = () => ({
    type : HIDE_SEARCH_MODAL
});


export const loadSocietyData = (name) => async dispatch => {
    try{
        dispatch({ type : FETCH_SOCIETY_DATA });
        let societyData = await apiCall("get" , `/api/society/${name}/allData`);
        dispatch({ type : LOAD_SOCIETY_DATA , data : societyData.society});

    }catch(err){
        console.log(err);
        dispatch({ type : FETCH_SOCIETY_ERROR  });
        dispatch(addError(err.message));
    }

}


