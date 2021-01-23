import axios from "axios";

export const setTokenHeader = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export const apiCall = async (method, path, data) => {
  try {
      let res = await axios[method.toLowerCase()](path, data);
      return res.data;
  }catch(err){
      return err.response.data.error;
  }
}


export const apiUploadCall = async (method, path, data) => {
    let formData = new FormData();
    console.log("Api Upload call is called => " , data);
    for (const [key, value] of Object.entries(data)) {
      formData.append( key , value);
    }
  
    try{
        // This is for File Upload requests
        let res = await axios.post(path , formData , {
            headers : {
              'Content-type' : 'multipart/form-data'
            }
        });
        return res.data;
    }catch(err){
      return err.response.data.error;
    }
}


export const apiComplexCall = async (method , path , data) => {
   try{
      let res = await axios.post(path , data , {
          headers : {
            'Content-type' : 'multipart/form-data'
          }
      });
      console.log(res);
   }catch(err){
       return err.response.data.error;
   }
}
