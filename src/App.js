import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Navbar from './components/navbar';
import Appheader from "./components/Appheader";
import GoogleLogin from 'react-google-login';


class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      data : ""
    }
  }

  onSuccessLogin = async (res) => {
    try{
         console.log("response" , res.tokenId);
         let resdata = await axios.post('/api/auth/signup/google' , {
            tokenId : res.tokenId
         });
         console.log(resdata);
      }catch(err){
          console.error(err.message);
      }
  }

  onFailureLogin = (err) => {
    console.log(err);
  }


  render(){
    return (
      <div>
          <Navbar />
          <h1>
            Login With google
          </h1>
          <GoogleLogin
            clientId="878476685235-rubcpt9de8uo2g1ing0iqnanfkmpb4h5.apps.googleusercontent.com"
            buttonText="Login with google"
            onSuccess={this.onSuccessLogin}
            onFailure={this.onFailureLogin}
            cookiePolicy={'single_host_origin'}
          />
          <Appheader />
      </div>
    )
  };
}

export default App;
