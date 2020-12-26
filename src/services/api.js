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
    for (const [key, value] of Object.entries(data)) {
      formData.append( key , value);
    }
    console.log(formData);
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

