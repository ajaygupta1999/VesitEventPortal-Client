import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Home from './home';
import Navbar from './components/navbar';
import Appheader from "./components/Appheader";
import Society from "./components/society"
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
    <BrowserRouter>
      <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/society/:name" component={Society} exact/>
      </Switch>
      </BrowserRouter>
    )
  };
}

export default App;
