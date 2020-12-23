import axios from "axios";

export function setTokenHeader(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export function apiCall(method, path, data) {
  return new Promise((resolve, reject) => {
    return axios[method.toLowerCase()](path, data)
      .then(res => {
          console.log(res);
          // Returing data object
          return resolve(res.data);
      })
      .catch(err => {
         console.log(err);
         // Reject with error
         return reject(err.response.data.error);
      });
  });
}


export function apiUploadCall(method, path, data) {
    let formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append( key , value);
    }
    console.log(formData);
  
    return new Promise((resolve, reject) => {
      return axios.post(path , formData , {
            headers : {
               'Content-type' : 'multipart/form-data'
            }
            }).then(res => {
                // Returing data object
                return resolve(res.data);
            }).catch(err => {
              // Reject with error
              return reject(err.response.data.error);
            });
    });
}

