import React, { Component } from 'react';
import moment from "moment";
import { connect } from "react-redux";
import EventVisualization from "./EventVisualization";
import EventStatisticsCard from "./EventStatisticsCard";
import { addBranchWiseReg, addClassWiseReg } from '../../utils';



class EventStatistics extends Component{

    constructor(props){
        super(props);
        this.state = {
            todaysEvents : [],
            upcomingEvents : [],
            allEvents : [],
            allEventsData : []
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

    componentDidMount = async () => {
        let allEvents = [];
        let todaysEvents = [];
        let upcomingEvents = [];
        if(Object.keys(this.props.society.data).length > 0){
            todaysEvents = this.getTodaysEvents(this.props.society.data.events);
            todaysEvents = await addClassWiseReg(todaysEvents);
            todaysEvents = await addBranchWiseReg(todaysEvents);
            upcomingEvents = this.getUpcomingEvents(this.props.society.data.events);
            upcomingEvents = await addClassWiseReg(upcomingEvents);
            upcomingEvents = await addBranchWiseReg(upcomingEvents);
            allEvents = todaysEvents.concat(upcomingEvents);
        }


        let allEventsData = [];
        if(this.props.society && (Object.keys(this.props.society.data).length > 0)){
            if(this.props.society.data.events.length > 0){
                allEventsData = this.props.society.data.events;
                allEventsData = await addClassWiseReg(allEventsData);
                allEventsData = await addBranchWiseReg(allEventsData);
            }
        }

        this.setState({
            ...this.state,
            todaysEvents,
            upcomingEvents,
            allEvents,
            allEventsData
        });
    }

    
    render(){

        

        return(
            <div className="event-statistics-session">
                <h5>All Events Statistics</h5>
                <div className="row">
                    {
                        this.state.allEvents.map(event => (
                            <EventStatisticsCard key={event._id} event={event} />
                        ))
                    }
                </div>
                {
                   this.state.allEventsData.length > 0 &&
                      <EventVisualization todaysEvents={this.state.allEventsData} />
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