// All Functions here
import { apiCall } from "./services/api";

export const getSocietyMembers = async () => {
    try{
        var res = await apiCall("get" , "https://vesit-events-portal.herokuapp.com/api/society/ieee/allmembers");
        let members_data = [];
        let states = Object.entries(res).map(async ([key , value]) => {
            if(key !== "facult_details"){
                if(value.length > 0){
                    value.forEach(async function(eachdata){
                        await members_data.push(eachdata);
                    });
                }   
            }else{
                if(Object.keys(value).length > 0) {
                    await members_data.push(value);
                }
            }
        });
        return members_data;

    }catch(err){
        console.log(err);
        return err;
    }  
}

export const getAllEvents = async (society) => {
    try{
        let data = await apiCall("get" , `https://vesit-events-portal.herokuapp.com/api/society/${society}/allevents`);
        return data;
    }catch(err){
        console.log(err);
        return err;
    }
}
