import React, { Component } from 'react';
import Appheader from "../components/Appheader";
import Allsocietys from "../components/Allsocietys";
import Eventlists from "./Eventlists";
import '../App.css';
import Navbar from './navbar';
import EventCreatedModal from './model/EventCreatedModal';
import { connect } from "react-redux";


class Home extends Component {
    render(){
        return(
            <div>
                 <Navbar />
                 {
                     this.props.createdEvent.showeventcreatedmodal &&
                     <EventCreatedModal />
                 }
                 <Appheader />
                 <Allsocietys />
                 <Eventlists />
            </div>
        )
    }
}


function mapStateToProps(state){
    return {
       createdEvent : state.createdEvent
    }
}


export default connect(mapStateToProps , {})(Home);
