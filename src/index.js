import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import reportWebVitals from './reportWebVitals';
import { Provider} from "react-redux";
import  { configureStore } from "./stores";
import { BrowserRouter as Router } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { setAuthorizationToken, setCurrentUser , getUserData } from "./stores/actions/auth";


// Central Store ============
const store = configureStore();


// For setting up jwt-token header and 

const localStorageSetup = async () => {
    if (localStorage.jwtToken) {
      setAuthorizationToken(localStorage.jwtToken);
      // prevent someone from manually tampering with the key of jwtToken in localStorage
      try {
          let userobj = jwtDecode(localStorage.jwtToken);
          let user = await getUserData(userobj.id);
          store.dispatch(setCurrentUser(user.userdata , user.registeredevents));
      }catch(e){
         console.log(e);
         store.dispatch(setCurrentUser({}));
      }
    }
} 

localStorageSetup();


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
