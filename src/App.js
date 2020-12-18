import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Navbar from './components/navbar';



class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      data : ""
    }
  }

  async componentDidMount(){
      console.log("doing request");
      var resp = "";
      let obj =  await axios.get("/google");
      this.setState({
        data : obj.data
      });
  }

  render(){
    return (
      <div>
          <Navbar />
          <center><h1>
            {
               this.state.data === "" ? "Data is Loading.." : this.state.data
            }
          </h1>
          </center>
          <center><h1>Hey, This is vesit EventPortal</h1></center>
      </div>
    )
  };
}

export default App;
