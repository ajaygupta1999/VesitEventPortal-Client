import { apiCall, apiUploadCall } from "../../services/api";
import { config } from "../../Constants";


import {  
   LOAD_SOCIETY_DATA,
   FETCH_SOCIETY_DATA,
   FETCH_SOCIETY_ERROR,
   SHOW_SEARCH_MODAL,
   HIDE_MODAL
} from "../actionTypes";

import { addError , removeError } from "../actions/error";

export const showSearchModal = () => ({
    type : SHOW_SEARCH_MODAL
});

export const hideSearchModal = () => ({
    type : HIDE_MODAL
});


export const loadSocietyData = (name) => async dispatch => {
    try{
        dispatch({ type : FETCH_SOCIETY_DATA });
        let societyData = await apiCall("get" , `${config.Api.API_URL}/api/society/${name}/allData`);
        dispatch({ type : LOAD_SOCIETY_DATA , data : societyData.society});
        dispatch(removeError());
        return societyData;
    }catch(err){
        console.error("gor error while fetching society details ===> " , err.message);
        dispatch({ type : FETCH_SOCIETY_ERROR  });
        dispatch(addError(err.message));
    }
}

export const fetchSocietyMembersFullDetails = (societyid) => async ( dispatch ) => {
    try{
        let { normal_members , council_members , council_heads , faculty , chairperson } = await apiCall("get" , `${config.Api.API_URL}/api/society/${societyid}/get/membersfulldetails`);
        dispatch({
            type : "LOAD_MEMBERS_DATA",
            normal_members,
            council_heads,
            council_members,
            faculty,
            chairperson
        });
    }catch(err){

    }
} 


export const updateSocietyDetails = (societyname , userid ,  data) => async (dispatch) => {
    try{
        let { society } = await apiUploadCall("post" , `${config.Api.API_URL}/api/society/${societyname}/edit/societydetails/editor/${userid}` , data);
        dispatch({
            type : "LOAD_SOCIETY_DATA",
            data : society
        })
    }catch(err){
        console.log(err);
    }
}


export const updateAboutSocietyDetails = (societyname , userid ,  data) => async (dispatch) => {
    try{
        let { society } = await apiCall("post" , `${config.Api.API_URL}/api/society/${societyname}/edit/aboutsociety/editor/${userid}` , data);
        dispatch({
            type : "LOAD_SOCIETY_DATA",
            data : society
        })

    }catch(err){
        console.log(err);
    }
}


export const updateSocietyAddChairpersonOrFaculty = (societyname , userid ,  data) => async (dispatch) => {
     try{
        let { society } = await apiCall("post" , `${config.Api.API_URL}/api/society/${societyname}/edit/facultyorchairperson/editor/${userid}` , data);
        let { normal_members , council_members , council_heads , faculty , chairperson } = await apiCall("get" , `${config.Api.API_URL}/api/society/${society._id}/get/membersfulldetails`);
        dispatch({
            type : "LOAD_SOCIETY_DATA",
            data : society
        });
        dispatch({
            type : "LOAD_MEMBERS_DATA",
            normal_members,
            council_heads,
            council_members,
            faculty,
            chairperson
        });
     }catch(err){
         console.log(err);
     }
}


export const createSpreadSheet = ( societyname , societyid , data) => async (dispatch) => {
    try{
        let society  = await apiCall("post" ,  `${config.Api.API_URL}/api/society/${societyname}/${societyid}/edit/createspreadsheet` , data);
        let { normal_members , council_members , council_heads , faculty , chairperson } = await apiCall("get" , `${config.Api.API_URL}/api/society/${societyid}/get/membersfulldetails`);
        console.log("Society data ==> " , society);
        dispatch({
            type : "LOAD_SOCIETY_DATA",
            data : society
        });

        dispatch({
            type : "LOAD_MEMBERS_DATA",
            normal_members,
            council_heads,
            council_members,
            faculty,
            chairperson
        });

        return society;
    }catch(err){
        console.log(err);
    }
}


export const dataSync = (societyname ,  societyid , data) => async (dispatch) => {
     try{
        let society = await apiCall("post" , `${config.Api.API_URL}/api/society/${societyname}/${societyid}/edit/syncdata` , data);
        let { normal_members , council_members , council_heads , faculty , chairperson } = await apiCall("get" , `${config.Api.API_URL}/api/society/${societyid}/get/membersfulldetails`);

        dispatch({
            type : "LOAD_SOCIETY_DATA",
            data : society
        });

        dispatch({
            type : "LOAD_MEMBERS_DATA",
            normal_members,
            council_heads,
            council_members,
            faculty,
            chairperson
        });
     }catch(err){
         console.log(err);
     }
}


export const handleAddSocietyMemeber = (societyname , societyid , data) => async (dispatch) => {
      try{
          let society = await apiCall("post" , `${config.Api.API_URL}/api/society/${societyname}/${societyid}/edit/managemembers/add/societymember` , data);
          let { normal_members , council_members , council_heads , faculty , chairperson } = await apiCall("get" , `${config.Api.API_URL}/api/society/${societyid}/get/membersfulldetails`);
          dispatch({
            type : "LOAD_SOCIETY_DATA",
            data : society
          });

        dispatch({
            type : "LOAD_MEMBERS_DATA",
            normal_members,
            council_heads,
            council_members,
            faculty,
            chairperson
        });
        console.log("Process is done.");
      }catch(err){
         console.log(err);
      }
} 


export const handleAddCouncilMemeber = (societyname , societyid , data) => async (dispatch) => {
    try{
        let society = await apiCall("post" , `${config.Api.API_URL}/api/society/${societyname}/${societyid}/edit/managemembers/add/councilmember` , data);
        let { normal_members , council_members , council_heads , faculty , chairperson } = await apiCall("get" , `${config.Api.API_URL}/api/society/${societyid}/get/membersfulldetails`);
          dispatch({
            type : "LOAD_SOCIETY_DATA",
            data : society
          });

        dispatch({
            type : "LOAD_MEMBERS_DATA",
            normal_members,
            council_heads,
            council_members,
            faculty,
            chairperson
        });
        console.log("Process is done.");
        
    }catch(err){
       console.log(err);
    }
} 


export const handleAddFacultyAndChairperson = (societyname , societyid , data) => async (dispatch) => {
    try{
        let society = await apiCall("post" , `${config.Api.API_URL}/api/society/${societyname}/${societyid}/edit/managemembers/add/facultyorchairperson` , data);
        let { normal_members , council_members , council_heads , faculty , chairperson } = await apiCall("get" , `${config.Api.API_URL}/api/society/${societyid}/get/membersfulldetails`);
          dispatch({
            type : "LOAD_SOCIETY_DATA",
            data : society
          });

        dispatch({
            type : "LOAD_MEMBERS_DATA",
            normal_members,
            council_heads,
            council_members,
            faculty,
            chairperson
        });
        console.log("Process is done.");
        
    }catch(err){
       console.log(err);
    }
} 



export const handleRemoveSocietyMember = (societyname , societyid , data) => async (dispatch) => {
    try{
        let society = await apiCall("post" , `${config.Api.API_URL}/api/society/${societyname}/${societyid}/edit/managemembers/remove/societymember` , data);
        let { normal_members , council_members , council_heads , faculty , chairperson } = await apiCall("get" , `${config.Api.API_URL}/api/society/${societyid}/get/membersfulldetails`);
          dispatch({
            type : "LOAD_SOCIETY_DATA",
            data : society
          });

        dispatch({
            type : "LOAD_MEMBERS_DATA",
            normal_members,
            council_heads,
            council_members,
            faculty,
            chairperson
        });
        
    }catch(err){
       console.log(err);
    }
} 

export const handleRemoveCouncilMember = (societyname , societyid , data) => async (dispatch) => {
    try{
        let society = await apiCall("post" , `${config.Api.API_URL}/api/society/${societyname}/${societyid}/edit/managemembers/remove/councilmember` , data);
        let { normal_members , council_members , council_heads , faculty , chairperson } = await apiCall("get" , `${config.Api.API_URL}/api/society/${societyid}/get/membersfulldetails`);
          dispatch({
            type : "LOAD_SOCIETY_DATA",
            data : society
          });

        dispatch({
            type : "LOAD_MEMBERS_DATA",
            normal_members,
            council_heads,
            council_members,
            faculty,
            chairperson
        });
        
    }catch(err){
       console.log(err);
    }
} 


export const handleRemoveFacultyOrChairperson = (societyname , societyid , data) => async (dispatch) => {
    try{
        let society = await apiCall("post" , `${config.Api.API_URL}/api/society/${societyname}/${societyid}/edit/managemembers/remove/facultyorchairperson` , data);
        let { normal_members , council_members , council_heads , faculty , chairperson } = await apiCall("get" , `${config.Api.API_URL}/api/society/${societyid}/get/membersfulldetails`);
          dispatch({
            type : "LOAD_SOCIETY_DATA",
            data : society
          });

        dispatch({
            type : "LOAD_MEMBERS_DATA",
            normal_members,
            council_heads,
            council_members,
            faculty,
            chairperson
        });
        
    }catch(err){
       console.log(err);
    }
}


export const handleEditSocietyMemeber = (societyname , societyid , data) => async (dispatch) => {
    try{
        let society = await apiCall("post" , `${config.Api.API_URL}/api/society/${societyname}/${societyid}/edit/managemembers/edit/societymember` , data);
        let { normal_members , council_members , council_heads , faculty , chairperson } = await apiCall("get" , `${config.Api.API_URL}/api/society/${societyid}/get/membersfulldetails`);
          dispatch({
            type : "LOAD_SOCIETY_DATA",
            data : society
          });

        dispatch({
            type : "LOAD_MEMBERS_DATA",
            normal_members,
            council_heads,
            council_members,
            faculty,
            chairperson
        });
        
    }catch(err){
       console.log(err);
    }
}


export const handleEditCouncilMemeber = (societyname , societyid , data) => async (dispatch) => {
    try{
        let society = await apiCall("post" , `${config.Api.API_URL}/api/society/${societyname}/${societyid}/edit/managemembers/edit/councilmember` , data);
        let { normal_members , council_members , council_heads , faculty , chairperson } = await apiCall("get" , `${config.Api.API_URL}/api/society/${societyid}/get/membersfulldetails`);
          dispatch({
            type : "LOAD_SOCIETY_DATA",
            data : society
          });

        dispatch({
            type : "LOAD_MEMBERS_DATA",
            normal_members,
            council_heads,
            council_members,
            faculty,
            chairperson
        });
        
    }catch(err){
       console.log(err);
    }
}


export const handleEditFacultyAndChairperson = (societyname , societyid , data) => async (dispatch) => {
    try{
        let society = await apiCall("post" , `${config.Api.API_URL}/api/society/${societyname}/${societyid}/edit/managemembers/edit/facultyorchairperson` , data);
        let { normal_members , council_members , council_heads , faculty , chairperson } = await apiCall("get" , `${config.Api.API_URL}/api/society/${societyid}/get/membersfulldetails`);
          dispatch({
            type : "LOAD_SOCIETY_DATA",
            data : society
          });

        dispatch({
            type : "LOAD_MEMBERS_DATA",
            normal_members,
            council_heads,
            council_members,
            faculty,
            chairperson
        });
        
    }catch(err){
       console.log(err);
    }
}