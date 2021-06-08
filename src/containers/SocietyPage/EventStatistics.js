import React, { Component } from 'react';
import moment from "moment";
import { connect } from "react-redux";
import EventVisualization from "./EventVisualization";
import EventStatisticsCard from "./EventStatisticsCard";




class EventStatistics extends Component{
 
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

        let allEvents = [];
        let todaysEvents = [];
        let upcomingEvents = [];
        if(Object.keys(this.props.society.data).length > 0){
            todaysEvents = this.getTodaysEvents(this.props.society.data.events);
            upcomingEvents = this.getUpcomingEvents(this.props.society.data.events);
            allEvents = todaysEvents.concat(upcomingEvents);
        }


        let allEventsData = [];
        if(this.props.society && (Object.keys(this.props.society.data).length > 0)){
            if(this.props.society.data.events.length > 0){
                allEventsData = this.props.society.data.events;
            }
            
        }

        return(
            <div className="event-statistics-session">
                <h5>All Events Statistics</h5>
                <div className="row">
                    {
                        allEvents.map(event => (
                            <EventStatisticsCard key={event._id} event={event} />
                        ))
                    }
                </div>
                {
                   allEventsData.length > 0 &&
                      <EventVisualization todaysEvents={allEventsData} />
                }
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        society : state.society
    }
} 


export default connect(mapStateToProps , null)(EventStatistics);