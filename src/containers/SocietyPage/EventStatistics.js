import React, { Component } from 'react';
import moment from "moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";


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
        if(Object.keys(this.props.society.data).length > 0){
            let todaysEvents = this.getTodaysEvents(this.props.society.data.events);
            let upcomingEvents = this.getUpcomingEvents(this.props.society.data.events);
            allEvents = todaysEvents.concat(upcomingEvents);
        }

        return(
            <div className="event-statistics-session">
                <h5>All Events Statistics</h5>
                <div className="row">

                    {
                        allEvents.map(event => (

                            <div className="col-12 col-md-6 col-lg-3">
                                <div className="card event-statistics-card">
                                    <div className="card-body">
                                        <h5 className="card-title">{ event.name }</h5>
                                        <p className="card-text"> { event.shortdesc }</p>
                                        <p className="date-and-time-session">
                                            <span><i className="far fa-calendar-alt"></i> { event.date }</span>
                                            <span><i className="far fa-clock"></i> { event.time } </span>
                                        </p>
                                        
                                        <div className="all-registrations-class-wise">
                                            <span>D12C-15</span>
                                            <span>D12C-15</span>
                                            <span>D12C-15</span>
                                            <span>D12C-15</span>
                                            <span>D12C-15</span>
                                            <span>D12C-15</span>
                                        </div>
                                        <p className="total-registrations-text"><i class="fas fa-user-friends"></i> 25 Registrations</p>
                                        <div className="event-statistics-button-session">
                                            <Link to="/event/:id">View Event</Link>
                                            <button className="btn btn-sm btn-light see-registrations-button">See All registrations</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
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