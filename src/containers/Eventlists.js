import React, { Component } from 'react';
import Event from "./Event";
import { fetchAllEvents  } from "../stores/actions/events";
import { connect } from "react-redux";
import "../asserts/css/EventCards.scss";
import moment from "moment";
import Spinner from "react-bootstrap/Spinner";
import 'bootstrap/dist/css/bootstrap.min.css';



class Eventlists extends Component{

    componentDidMount = async () => {
       await this.props.fetchAllEvents();
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
        const allEvents  = this.props.allEvents.data;
        let todaysevents = this.getTodaysEvents(allEvents);
        let upcomingevents = this.getUpcomingEvents(allEvents);
        let isFetchingAllEvents = this.props.allEvents.isFetching;


        return(
            <div>
                
                <div class="d-flex justify-content-center align-items-center">
                    <h4 class="my-ongoing-title-index-page">Today's Events</h4>
                </div>
                {
                    isFetchingAllEvents && 
                        <div className="spinner-div text-center">
                            <Spinner className="custom-spinner" animation="border"/>
                        </div>
                }
               
                <div className="MY-on-going-evenets-session container">
                    <div className="row">
                        {
                            todaysevents.map(event => {
                                if(this.props.currentUser.isAuthenticated){
                                    let data = this.props.currentUser.user.registered_events.filter(registered => registered.toString() === event._id.toString());
                                    if(data.length > 0){
                                        return <Event key={event._id} {...event} userdata={this.props.currentUser} isRegistered={true}/>
                                    }else{
                                        return <Event key={event._id} {...event} userdata={this.props.currentUser} isRegistered={false}/>
                                    }
                                }
                                return <Event key={event._id} {...event} userdata={this.props.currentUser} isRegistered={false}/>
                            }) 
                        }
                    </div>
                </div>
                <div class="d-flex justify-content-center align-items-center">
                    <h4 class="my-upcoming-title-index-page">Upcoming's Events</h4>
                </div>
                {
                    isFetchingAllEvents && 
                        <div className="spinner-div text-center">
                            <Spinner className="custom-spinner" animation="border"/>
                        </div>
                }
                <div className="MY-on-going-evenets-session container">
                    <div className="row">
                       {
                            upcomingevents.map(event => {
                                if(this.props.currentUser.isAuthenticated){
                                    let data = this.props.currentUser.user.registered_events.filter(registered => registered._id.toString() === event._id.toString());
                            
                                    if(data.length > 0){
                                        return <Event key={event._id} {...event} userdata={this.props.currentUser} isRegistered={true}/>
                                    }else{
                                        return <Event key={event._id} {...event} userdata={this.props.currentUser} isRegistered={false}/>
                                    }
                                }
                                return <Event key={event._id} {...event} userdata={this.props.currentUser} isRegistered={false}/>
                                
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
    allEvents : state.allEvents,
});
    
export default connect( mapStateToProps , { fetchAllEvents } )(Eventlists);