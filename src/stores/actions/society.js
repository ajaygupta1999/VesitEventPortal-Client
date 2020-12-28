import { apiCall } from "../../services/api";
import {  
   LOAD_SOCIETY_DATA,
   FETCH_SOCIETY_DATA,
   FETCH_SOCIETY_ERROR,
   SHOW_SEARCH_MODAL,
   HIDE_SEARCH_MODAL
} from "../actionTypes";

import { addError , removeError } from "../actions/error";

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
        dispatch(removeError());
        console.log("got data of society ===> " , societyData);
    }catch(err){
        console.error("gor error while fetching society details ===> " , err.message);
        dispatch({ type : FETCH_SOCIETY_ERROR  });
        dispatch(addError(err.message));
    }
}


