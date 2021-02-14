import React, { Component } from 'react';
import { connect } from "react-redux";
import { unregisterEventFromProfile } from "../../stores/actions/events";



class Event extends Component{

    handleUnregister = () => {
        if(Object.keys(this.props.eventdata).length > 0){
            this.props.unregisterEventFromProfile( this.props.userdata._id , this.props.eventdata._id);
        }
    }

    render(){
        
        let key = "";
        if(key.length > 0){
            key = this.props.key;
        }
        let event = {};
        let userdata = {};
        if(Object.keys(this.props.eventdata).length > 0){
            event = this.props.eventdata;
        }
        if(Object.keys(this.props.userdata).length > 0){
            userdata = this.props.userdata;
        }

        return(
                <div className="col-12 col-md-6 col-lg-3">
                    <div className="each-event-container">
                        <div className="img-session">
                            <img src={ event.imgurl.dataurl } alt="event-image" />
                        </div>
                        <div className="content-session">
                            <div className="upper-content d-flex flex-column">
                                <p className="main-title">{ event.name }</p>
                                <p className="short-desc">{ event.shortdesc }</p>
                                <p className="guest-text"><span>Guest: </span> Ajay, Neel </p>
                                <div className="date-time-div d-flex justify-content-start align-items-center">
                                    <p className="date-session"><span><i className="far fa-calendar-alt"></i></span>{ event.date }</p>
                                    <p><span><i className="far fa-clock"></i></span> { event.time } </p>
                                </div>
                                <div className="register-button-div">
                                    <button id="each-event-unregister-button" className="btn btn-md btn-success" onClick={this.handleUnregister}>Un-Register</button>        
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}




export default connect(null , { unregisterEventFromProfile })(Event);