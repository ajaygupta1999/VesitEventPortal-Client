import React, { Component } from 'react';
import "../../asserts/css/Society.scss";
import { getAllEvents } from "../../functions";
import moment from "moment";
import "../../asserts/css/EventCards.scss";
import { Link , withRouter } from "react-router-dom";
import { parse } from "query-string";
import { connect } from "react-redux";

class Events extends Component{
   
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
            const { location : { search } } = this.props;
            let queryObj = parse(search);  
            let todaysevents = [];
            let upcomingevents = [];
            let allEvents = [];
            if(Object.keys(this.props.society.data).length > 0){
                todaysevents = this.getTodaysEvents(this.props.society.data.events);
                upcomingevents = this.getUpcomingEvents(this.props.society.data.events);
                allEvents = this.props.society.data.events;
            }


        return(
            <div className="society-all-events-session about-members-session">
                <div className="row">
                    <div className="col-12 col-md-3 col-lg-2 our-navigation-of-members">
                        <div className="all-members-nev-buttons-div nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">

                            <Link to={ `/society/${ Object.keys(this.props.society.data).length > 0 ? this.props.society.data.name : null }?show=events&eventType=todays-events` }
                                className={ `nav-link ${ (queryObj.eventType === "todays-events" || Object.keys(queryObj).length === 1 ) ? "active" : null } members-navigation-buttons` } 
                                id="v-pills-home-tab" data-toggle="pill" role="tab" aria-controls="v-pills-home" aria-selected="true">Today's Event</Link>

                            <Link to={ `/society/${ Object.keys(this.props.society.data).length > 0 ? this.props.society.data.name : null }?show=events&eventType=upcoming-events` }
                               className={ `nav-link ${ (queryObj.eventType === "upcoming-events") ? "active" : null } members-navigation-buttons` } 
                               id="v-pills-profile-tab" data-toggle="pill"  role="tab" aria-controls="v-pills-profile" aria-selected="false">Upcoming Events</Link>

                            <Link to={ `/society/${ Object.keys(this.props.society.data).length > 0 ? this.props.society.data.name : null }?show=events&eventType=all-events`}
                                className={ `nav-link ${ (queryObj.eventType === "all-events") ? "active" : null } members-navigation-buttons` } 
                                id="v-pills-messages-tab" data-toggle="pill" role="tab" aria-controls="v-pills-messages" aria-selected="false">Event History</Link>
                        </div>
                    </div>
                    <div className="col-12 col-md-9 col-lg-10">
                        <div className="MY-on-going-evenets-session container">
                            <div className="row">
                                {
                                    ( queryObj.eventType === "todays-events" || Object.keys(queryObj).length === 1 ) && (
                                        todaysevents.map(event => (
                                            
                                            <div className="society-page-event-lists col-12 col-md-6 col-lg-4">
                                                <div className="each-event-container society-page-events-each-container">
                                                    <div className="img-session">
                                                        <img src={event.imgurl.dataurl} alt="event-image" />
                                                    </div>
                                                    <div className="content-session">
                                                        <div className="upper-content d-flex flex-column">
                                                            <p className="main-title">{ event.name }</p>
                                                            {
                                                                event.shortdesc.length > 170 ? (
                                                                    <p className="short-desc">{ event.shortdesc.substring(0 , 170)  } <Link to={ `/event/${event._id}` } style={{ color : "red" , fontWeight: "600" }}>...Read more</Link></p>
                                                                ) : (
                                                                    <p className="short-desc">{ event.shortdesc }</p>
                                                                )
                                                            }
                                                            <p className="guest-text"><span>Guest: </span> Ajay, Neel </p>
                                                            <div className="date-time-div d-flex justify-content-start align-items-center">
                                                                <p className="date-session"><span><i className="far fa-calendar-alt"></i></span>{ event.date }</p>
                                                                <p><span><i className="far fa-clock"></i></span> { event.time } </p>
                                                            </div>
                                                            <div className="register-button-div">
                                                                <Link id="each-event-register-button" className="btn btn-md btn-success" to={ `/event/${event._id}` }>Register</Link>        
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))    
                                    )
                                }
                                {
                                    queryObj.eventType === "upcoming-events" && (
                                        upcomingevents.map(event => (
                                            
                                            <div className="society-page-event-lists col-12 col-md-6 col-lg-4">
                                                <div className="each-event-container society-page-events-each-container">
                                                    <div className="img-session">
                                                        <img src={event.imgurl.dataurl} alt="event-image" />
                                                    </div>
                                                    <div className="content-session">
                                                        <div className="upper-content d-flex flex-column">
                                                            <p className="main-title">{ event.name }</p>
                                                            {
                                                                event.shortdesc.length > 170 ? (
                                                                    <p className="short-desc">{ event.shortdesc.substring(0 , 170)  } <Link to={ `/event/${event._id}` } style={{ color : "red" , fontWeight: "600" }}>...Read more</Link></p>
                                                                ) : (
                                                                    <p className="short-desc">{ event.shortdesc }</p>
                                                                )
                                                            }
                                                            
                                                            <p className="guest-text"><span>Guest: </span> Ajay, Neel </p>
                                                            <div className="date-time-div d-flex justify-content-start align-items-center">
                                                                <p className="date-session"><span><i className="far fa-calendar-alt"></i></span>{ event.date }</p>
                                                                <p><span><i className="far fa-clock"></i></span> { event.time } </p>
                                                            </div>
                                                            <div className="register-button-div">
                                                                <Link id="each-event-register-button" className="btn btn-md btn-success" to={ `/event/${event._id}` }>Register</Link>        
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))    
                                    )
                                }
                                {
                                    queryObj.eventType === "all-events" && (
                                        allEvents.map(event => (
                                            <div className="society-page-event-lists col-12 col-md-6 col-lg-4">
                                                <div className="each-event-container society-page-events-each-container">
                                                    <div className="img-session">
                                                        <img src={event.imgurl.dataurl} alt="event-image" />
                                                    </div>
                                                    <div className="content-session">
                                                        <div className="upper-content d-flex flex-column">
                                                            <p className="main-title">{ event.name }</p>
                                                            {
                                                                event.shortdesc.length > 170 ? (
                                                                    <p className="short-desc">{ event.shortdesc.substring(0 , 170)  } <Link to={ `/event/${event._id}` } style={{ color : "red" , fontWeight: "600" }}>...Read more</Link></p>
                                                                ) : (
                                                                    <p className="short-desc">{ event.shortdesc }</p>
                                                                )
                                                            }
                                                            <p className="guest-text"><span>Guest: </span> Ajay, Neel </p>
                                                            <div className="date-time-div d-flex justify-content-start align-items-center">
                                                                <p className="date-session"><span><i className="far fa-calendar-alt"></i></span>{ event.date }</p>
                                                                <p><span><i className="far fa-clock"></i></span> { event.time } </p>
                                                            </div>
                                                            <div className="register-button-div">
                                                                <Link id="each-event-register-button" className="btn btn-md btn-success" to={ `/event/${event._id}` }>Register</Link>    
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))    
                                    )
                                }
                            </div>
                        </div>                    
                    </div>
                </div>
            </div>
        )
    }
}


const mapStatesToProps = (state) => {
    return { 
        society : state.society
    }
}

export default withRouter(connect(mapStatesToProps , null)(Events));