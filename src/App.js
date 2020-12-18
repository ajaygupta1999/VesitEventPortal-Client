import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Navbar from './components/navbar';
import Appheader from "./components/Appheader";



class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      data : ""
    }
  }

  // async componentDidMount(){
  //     console.log("doing request");
  //     var resp = "";
  //     let obj =  await axios.get("/google");
  //     this.setState({
  //       data : obj.data
  //     });
  // }

  render(){
    return (
      <div>
          <Navbar />
          <Appheader />
      </div>
    )
  };
}

export default App;
