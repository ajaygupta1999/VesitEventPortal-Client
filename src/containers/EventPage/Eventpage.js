import React, { Component } from 'react';
import Navbar from "../navbar";
import "../../asserts/css/EventPage.scss";
import { Link } from "react-router-dom";


class EventPage extends Component{

    render(){
        return(
            <div>
                <Navbar />
                <div className="each-event-main-div">
                    <div className="row">
                        <div className="col-12">
                            <div className="row each-event-main-div-session">
                                <div className="col-12 col-md-6">
                                    <div className="each-event-content d-flex flex-column">
                                        <p className="event-name">Android Workshiop</p>
                                        <p className="event-short-desc"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                        </p>
            
                                        <p className="event-guest"><span>Guest:</span>
                                            Ajay Gupta , Neel Bhagat
                                        </p>
                                        <p className="event-date-time"><span><i className="far fa-calendar-alt"></i> 20-12-2020 </span> <span><i className="far fa-clock"></i>5:40 pm</span></p>
                                        <Link className="profile-to-society-link" to="/society/ieee">
                                            <div className="society-collections d-flex align-items-center">
                                                <div>
                                                    <img src="/images/ieee_logo.jpg" alt="user-profile-img"/>
                                                </div>
                                                <p className="profile-incharge-name"> IEEE VESIT </p>
                                            </div>
                                        </Link>
                                        <div className="all-registrations-class-wise">
                                            <span>D12C-15</span>
                                            <span>D12C-15</span>
                                            <span>D12C-15</span>
                                            <span>D12C-15</span>
                                            <span>D12C-15</span>
                                            <span>D12C-15</span>
                                        </div>
                                        <div class="call-starts-in-time">
                                            <p>Call Start in : <span>05:04:30</span></p>
                                        </div>
                                        <div className="register-button-div">
                                            <button className="btn btn-md btn-primary register-button-div">Register</button>
                                            <button className="btn btn-md btn-primary register-button-div set-remainder-button">Set Remainder</button>
                                        </div>
                                        
                                    </div>

                                </div>
                                <div className="col-12 col-md-6 d-flex align-items-center event-page-main-image-session">
                                    <div className="img-div">
                                        <img style={{ width : "90%", height : "60%", objectFit: "cover" }} src="/images/download.jpg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        <center><h2 className="main-title-full-detail">Full Detail of Event</h2></center>
                        <div className="full-detail-session">
                            <div className="row">
                                <div className="col-12 col-md-8">
                                    <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    </p>
                                </div>
                                <div className="col-12 col-md-4 d-flex align-items-center">
                                    <div className="full-detail-img-session">
                                        <img src="/images/download.jpg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                
                        <center><h2 className="main-title-event-guest">Event Guests</h2></center>
                        <div className="row">
                            <div className="each-member-card col-12 col-md-6 col-lg-4 col-xl-3">
                                <div className="card">
                                    <img id="card-profile-image" className="card-img-top" src="/images/user-img1.jpg" alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">Ajay Gupta</h5>
                                        <p className="card-text">IEEE VESIT, Techical team.</p>
                                        <p className="card-text">S.E, D12C-21 </p>
                                        <button className="btn btn-sm btn-primary"> Profile </button>
                                    </div>
                                </div>
                            </div>
                            <div className="each-member-card col-12 col-md-6 col-lg-4 col-xl-3">
                                <div className="card">
                                    <img id="card-profile-image" className="card-img-top" src="/images/user-img1.jpg" alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">Ajay Gupta</h5>
                                        <p className="card-text">IEEE VESIT, Techical team.</p>
                                        <p className="card-text">S.E, D12C-21 </p>
                                        <button className="btn btn-sm btn-primary"> Profile </button>
                                    </div>
                                </div>
                            </div>
                            <div className="each-member-card col-12 col-md-6 col-lg-4 col-xl-3">
                                <div className="card">
                                    <img id="card-profile-image" className="card-img-top" src="/images/user-img1.jpg" alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">Ajay Gupta</h5>
                                        <p className="card-text">IEEE VESIT, Techical team.</p>
                                        <p className="card-text">S.E, D12C-21 </p>
                                        <button className="btn btn-sm btn-primary"> Profile </button>
                                    </div>
                                </div>
                            </div>
                            <div className="each-member-card col-12 col-md-6 col-lg-4 col-xl-3">
                                <div className="card">
                                    <img id="card-profile-image" className="card-img-top" src="/images/user-img1.jpg" alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">Ajay Gupta</h5>
                                        <p className="card-text">IEEE VESIT, Techical team.</p>
                                        <p className="card-text">S.E, D12C-21 </p>
                                        <button className="btn btn-sm btn-primary"> Profile </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    <center><h2 className="main-title-full-detail">Sponsored by</h2></center>
                    <div className="full-detail-session container">
                        <div className="row">
                            <div className="col-12 col-md-8 d-flex align-items-center">
                                <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.  
                                </p>
                            </div>
                            <div className="col-12 col-md-4">
                                <div className="full-detail-img-session d-flex justify-content-center">
                                    <img id="github-img"  src="/images/github.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            </div>
        )
    }
}


export default EventPage;