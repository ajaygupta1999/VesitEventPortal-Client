import React, { Component } from 'react';
import { connect } from "react-redux";
import { registerEvent , unregisterEvent } from "../stores/actions/events";



class Event extends Component{

    handleRegister = () => {
        if(this.props.userdata.isAuthenticated){
            console.log("user is Authenticated");
            this.props.registerEvent( this.props.userdata.user.id , this.props.id);
        }
    }

    handleUnregister = () => {
        if(this.props.userdata.isAuthenticated){
            console.log("user is Authenticated");
            this.props.unregisterEvent( this.props.userdata.user.id , this.props.id);
        }
    }

    render(){
        const {name , shortdesc , date , time , isRegistered } = this.props;
        const imgurl = this.props.imgurl.dataurl;
        const registedEventStyle = {
            backgroundColor : "blue !important"
        }

        return(
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="each-event-container">
                        <div className="img-session">
                            <img src={imgurl} alt="event-image" />
                        </div>
                        <div className="content-session">
                            <div className="upper-content d-flex flex-column">
                                <p className="main-title">{ name }</p>
                                <p className="short-desc">{ shortdesc }</p>
                                <p className="guest-text"><span>Guest: </span> Ajay, Neel </p>
                                <div className="date-time-div d-flex justify-content-start align-items-center">
                                    <p className="date-session"><span><i className="far fa-calendar-alt"></i></span>{ date }</p>
                                    <p><span><i className="far fa-clock"></i></span> { time } </p>
                                </div>
                                {
                                    isRegistered ? (
                                        <div className="register-button-div">
                                            <button style={registedEventStyle} id="each-event-unregister-button" className="btn btn-md btn-success" onClick={this.handleUnregister}>Un-Register</button>        
                                        </div> 
                                    ) : (
                                        <div className="register-button-div">
                                            <button id="each-event-register-button" className="btn btn-md btn-primary" onClick={this.handleRegister}>Register</button>        
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}




export default connect(null , { registerEvent , unregisterEvent })(Event);