import React, { Component } from 'react';
import Event from "./Event";
import { connect } from "react-redux";
import {  fetchregisteredEvents } from "../../stores/actions/events";
import "../../asserts/css/EventCards.scss";
import { withRouter } from "react-router-dom";

class RegisteredEvents extends Component{
    
    render(){
        let { userid } = this.props.match.params;
        let userdata = {};
        let registeredEvents = [];
        if(Object.keys(this.props.specificUser.user).length > 0){
            userdata = this.props.specificUser.user;
            registeredEvents = this.props.specificUser.registeredevents;
        }
    
        return(
            <div className="MY-on-going-evenets-session profile-page-session-content-div">
                <div className="row">
                {
                     this.props.currentUser.isAuthenticated &&
                         ( userid.toString() === this.props.currentUser.user._id.toString() ) &&
                            registeredEvents.map(event => (
                                <Event key={event._id} eventdata={event} userdata={userdata} isRegistered={true}/>
                            ))
                }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentUser : state.currentUser,
    specificUser : state.specificUser
});


export default withRouter(connect(mapStateToProps ,  { fetchregisteredEvents })(RegisteredEvents));