import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import reportWebVitals from './reportWebVitals';
import { Provider} from "react-redux";
import  { configureStore } from "./stores";
import { BrowserRouter as Router } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { setAuthorizationToken, setCurrentUser } from "./stores/actions/auth";


// Central Store ============
const store = configureStore();

// For setting up jwt-token header and 
if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  // prevent someone from manually tampering with the key of jwtToken in localStorage
  try {
    console.log("got refreshed ===> " , jwtDecode(localStorage.jwtToken));
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch (e) {
    store.dispatch(setCurrentUser({}));
  }
}



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
