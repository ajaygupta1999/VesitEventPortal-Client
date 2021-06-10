import React, { Component } from 'react';
import { Link } from "react-router-dom";


const EventStatisticsCard = (props) => {
        let event = props.event;
        return(
            <div className="col-12 col-md-6 col-lg-3">
                <div className="card event-statistics-card">
                    <div className="card-body">
                        <h5 className="card-title">{ event.name }</h5>
                        {
                            event.shortdesc.length > 120 ? (
                                <p className="short-desc">{ event.shortdesc.substring(0 , 120)  } <Link to={ `/event/${event._id}` } style={{ color : "red" , fontWeight: "600" }}>...Read more</Link></p>
                            ) : (
                                <p className="short-desc">{ event.shortdesc }</p>
                            )
                        }
                        
                        <p className="date-and-time-session">
                            <span><i className="far fa-calendar-alt"></i> { event.date }</span>
                            <span><i className="far fa-clock"></i> { event.time } </span>
                        </p>
                        {
                            event.classWiseReg.length > 0 && 
                                <div className="all-registrations-class-wise">
                                    {
                                        event.classWiseReg.map(reg => (
                                            <span>{ reg.class.toUpperCase() }-{ reg.reg }</span>
                                        ))
                                    }
                                </div>
                        }
                        <p className="total-registrations-text"><i class="fas fa-user-friends"></i> { event.registrations.length } Registrations</p>
                        <div className="event-statistics-button-session">
                            <Link to={ `/event/${event._id}` }>View Event</Link>
                            <button className="btn btn-sm btn-light see-registrations-button">See All registrations</button>
                        </div>
                    </div>
                </div>
            </div>
        );
}



export default EventStatisticsCard;
