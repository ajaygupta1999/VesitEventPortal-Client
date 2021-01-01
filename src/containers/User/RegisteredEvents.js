import React, { Component } from 'react';
import Event from "./Event";
import { connect } from "react-redux";
import {  fetchregisteredEvents } from "../../stores/actions/events";
import "../../asserts/css/EventCards.scss";


class RegisteredEvents extends Component{
    
   componentDidMount = () => {
        if(this.props.currentUser.isAuthenticated){
            this.props.fetchregisteredEvents(this.props.currentUser.user.id);
        }
   }
   
    render(){
        let userdata = this.props.currentUser;
        let registeredEvents = this.props.registeredEvents.data;

        return(
            <div className="MY-on-going-evenets-session profile-page-session-content-div">
                <div className="row">
                {
                    registeredEvents.map(event => (
                        <Event key={event.id} {...event} userdata={userdata} isRegistered={true}/>
                    ))
                }
                </div>
            </div>
            
        )
    }
}

const mapStateToProps = (state) => ({
    currentUser : state.currentUser,
    registeredEvents : state.registeredEvents
});


export default connect(mapStateToProps ,  { fetchregisteredEvents })(RegisteredEvents);