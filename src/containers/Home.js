import React, { Component } from 'react';
import Googlelogin from "./Googlelogin";
import Appheader from "../components/Appheader";
import Allsocietys from "../components/Allsocietys";
import Eventlists from "./Eventlists";
import '../App.css';
import Navbar from './navbar';


class Home extends Component {
    render(){
        return(
            <div>
                 <Navbar />
                 <Appheader />
                 <Allsocietys />
                 <Eventlists />
            </div>
        )
    }
}
  

export default Home;
