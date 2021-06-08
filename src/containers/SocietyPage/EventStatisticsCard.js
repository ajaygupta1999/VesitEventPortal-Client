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
                            <Link to={ `/event/${event._id}` }>View Event</Link>
                            <button className="btn btn-sm btn-light see-registrations-button">See All registrations</button>
                        </div>
                    </div>
                </div>
            </div>
        );
}



export default EventStatisticsCard;
