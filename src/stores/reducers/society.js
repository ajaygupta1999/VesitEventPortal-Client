import { 
    LOAD_SOCIETY_DATA,
    FETCH_SOCIETY_DATA,
    FETCH_SOCIETY_ERROR,
    FETCH_SOCIETY_RETRY,
    SHOW_SEARCH_MODAL,
    HIDE_MODAL,
    LOAD_MEMBERS_DATA
} from "../actionTypes";


const INITIAL_STATE = {
    isFetching : false,
    error : false,
    retry : false,
    data : {},
    council_heads : [],
    council_members: [],
    normal_members : [],
    faculty : {},
    chairperson : {},
    isSearchModelVisible : false
}


const society = (state = INITIAL_STATE , action) => {
    switch(action.type){

        case FETCH_SOCIETY_DATA:
            return { ...state , isFetching : true , error : false, retry : false }
        
        case FETCH_SOCIETY_ERROR:
            return {...state , isFetching: false , error : true }

        case FETCH_SOCIETY_RETRY:
            return {...state , isFetching : false , retry : true }
        
        case LOAD_SOCIETY_DATA:
            return { ...state , data : action.data , isFetching : false }
0
        case LOAD_MEMBERS_DATA:
            return { ...state , 
                council_members : action.council_members , 
                council_heads : action.council_heads , 
                normal_members : action.normal_members , 
                faculty : action.faculty,
                chairperson : action.chairperson
             }

        case SHOW_SEARCH_MODAL:
            return { ...state , isSearchModelVisible : true }
        
        case HIDE_MODAL:
            return { ...state , isSearchModelVisible : false }
        
        default:
          return state;
    }
}


export default society;