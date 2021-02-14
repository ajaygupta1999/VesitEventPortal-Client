import {
    FETCH_CREATED_EVENT,
    LOAD_CREATED_EVENT,
    FETCH_CREATED_EVENT_ERROR,
    FETCH_GUESTANDSPONSOR_DATA,
    LOAD_GUESTANDSPONSOR_DATA,
    FETCH_GUESTANDSPONSOR_DATA_ERROR,
    SHOW_ADDGUESTMODAL,
    HIDE_ADDGUESTMODAL,
    FETCH_ALLUSERS_ERROR,
    SHOW_ADDEVENTTAKERMODAL,
    HIDE_ADDEVENTTAKERMODAL,
    LOAD_SELECTED_GUESTS,
    LOAD_SELECTED_EVENTTAKERS,
    LOAD_ADDED_GUESTS,
    LOAD_ADDED_EVENTTAKERS,
    LOAD_ADDED_SPONSORS,
    SHOW_EVENT_CREATED_SUCCESSFUL_MODAL,
    HIDE_EVENT_CREATED_SUCCESSFUL_MODAL,
    LOAD_EVENT_DETAILS
} from "../actionTypes";


const DEFAULT_STATE = {
    data : {},
    isFetching : false,
    error : false,
    addGuestModalVisible : false,
    addEventtakerModalVisible : false,
    showeventcreatedmodal : false,
    selectedguests : [],
    selectedeventtakers : [],
    addedguests : [],
    addedeventtakers : [],
    addedsponsors : []
} 



const createdEvent = ( state = DEFAULT_STATE , action ) => {

    switch(action.type){
        case FETCH_CREATED_EVENT:
            return {  ...state , isFetching : true , error : false , selectedguests : [] , selectedeventtakers : [] , addedguests : [] , addedeventtakers : [] , addedsponsors : [] }

        case LOAD_CREATED_EVENT:
            return { ...state , data : { ...action.event } , isFetching : false , error : false }
        
        case FETCH_CREATED_EVENT_ERROR:
            return { ...state , isFetching : false , error: true }

        case FETCH_GUESTANDSPONSOR_DATA:
            return { ...state , isFetching : true , error : false , selectedguests : [] , selectedeventtakers : [] , addedguests : [] , addedeventtakers : [] , addedsponsors : [] }
        
        case LOAD_GUESTANDSPONSOR_DATA:
            return { ...state , data : { ...state.data , ...action.event } , isFetching : false , error : false }

        case FETCH_GUESTANDSPONSOR_DATA_ERROR:
            return { ...state , isFetching : false , error : true }
        
        case SHOW_ADDGUESTMODAL:
            return { ...state , addGuestModalVisible : true }

        case HIDE_ADDGUESTMODAL:
            return { ...state , addGuestModalVisible : false }

        case SHOW_ADDEVENTTAKERMODAL:
            return { ...state , addEventtakerModalVisible : true }

        case HIDE_ADDEVENTTAKERMODAL:
            return { ...state , addEventtakerModalVisible : false }
        
        case LOAD_SELECTED_GUESTS:
            return { ...state , selectedguests : action.data }
    
        case LOAD_SELECTED_EVENTTAKERS:
            return { ...state , selectedeventtakers : action.data }
    
        case LOAD_ADDED_GUESTS:
            return { ...state , addedguests : action.data  }
    
        case LOAD_ADDED_EVENTTAKERS:
            return { ...state , addedeventtakers : action.data }
        
        
        case LOAD_ADDED_SPONSORS:
            return { ...state , addedsponsors : action.data }
         
        case FETCH_ALLUSERS_ERROR:
            return { ...state , error : true }
        
        case SHOW_EVENT_CREATED_SUCCESSFUL_MODAL:
            return { ...state , showeventcreatedmodal : true }

        case HIDE_EVENT_CREATED_SUCCESSFUL_MODAL:
            return { ...state , showeventcreatedmodal : false }

        case LOAD_EVENT_DETAILS:
            return { ...state , data : action.data }

        default:
            return state;
    }
}


export default createdEvent;
