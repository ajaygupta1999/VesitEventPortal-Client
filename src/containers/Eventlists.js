import React, { Component } from 'react';
import Event from "./Event";
import { fetchAllEvents , fetchregisteredEvents } from "../stores/actions/events";
import { connect } from "react-redux";
import "../asserts/css/EventCards.scss";
import moment from "moment";

class Eventlists extends Component{

    componentDidMount = async () => {
       this.props.fetchAllEvents();
       if(this.props.currentUser.isAuthenticated){
           this.props.fetchregisteredEvents(this.props.currentUser.user.id);
       }
    }

    getUpcomingEvents = (events) => {
        let todaysDate = new Date();
        let wrapper = moment(todaysDate).format("YYYY-MM-DD");
        let upcomingevents = events.filter(event => moment(wrapper).isBefore(event.date)); 
        return upcomingevents;
    }

    getTodaysEvents = (events) => {
        let todaysDate = new Date();
        let wrapper = moment(todaysDate).format("YYYY-MM-DD");  
        let todaysevents = events.filter(event => event.date === wrapper);
        return todaysevents;
    } 


    render(){
        const { allEvents , registerdEvents } = this.props;
        let todaysevents = this.getTodaysEvents(allEvents);
        let upcomingevents = this.getUpcomingEvents(allEvents);
 
        return(
            <div>
                <div class="d-flex justify-content-center align-items-center">
                    <h4 class="my-ongoing-title-index-page">Today's Events</h4>
                </div>
                <div className="MY-on-going-evenets-session container">
                    <div className="row">
                        {
                            todaysevents.map(event => {
                                let data = this.props.registerdEvents.data.filter(registered => registered._id.toString() === event.id.toString());
                                if(data.length > 0){
                                     return <Event key={event.id} {...event} userdata={this.props.currentUser} isRegistered={true}/>
                                }else{
                                    return <Event key={event.id} {...event} userdata={this.props.currentUser} isRegistered={false}/>
                                }
                            }) 
                        }
                    </div>
                </div>
                <div class="d-flex justify-content-center align-items-center">
                    <h4 class="my-upcoming-title-index-page">Upcoming's Events</h4>
                </div>
                <div className="MY-on-going-evenets-session container">
                    <div className="row">
                       {
                            upcomingevents.map(event => {
                                let data = this.props.registerdEvents.data.filter(registered => registered._id.toString() === event.id.toString());
                            
                                if(data.length > 0){
                                     return <Event key={event.id} {...event} userdata={this.props.currentUser} isRegistered={true}/>
                                }else{
                                    return <Event key={event.id} {...event} userdata={this.props.currentUser} isRegistered={false}/>
                                }
                            }) 
                        }
                    </div>
                </div>
            </div>
        );
    }
}



const mapStateToProps = (state) => ({
    currentUser : state.currentUser,
    allEvents : state.allEvents.data,
    registerdEvents : state.registeredEvents
});
    
export default connect( mapStateToProps , { fetchAllEvents , fetchregisteredEvents } )(Eventlists);