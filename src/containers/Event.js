import React, { Component } from 'react';
import { connect } from "react-redux";
import { registerEvent , unregisterEvent } from "../stores/actions/events";
import { Link } from "react-router-dom";


class Event extends Component{

    handleRegister = () => {
        if(this.props.userdata.isAuthenticated){
            this.props.registerEvent( this.props.userdata.user._id , this.props._id);
        }
    }

    handleUnregister = () => {
        if(this.props.userdata.isAuthenticated){
            this.props.unregisterEvent( this.props.userdata.user._id , this.props._id);
        }
    }

    render(){
        const {name , shortdesc , date , time , isRegistered } = this.props;
        const imgurl = this.props.imgurl.dataurl;
        const registedEventStyle = {
            backgroundColor : "blue !important"
        }
        let societyimgurl = "";
        console.log("event ==> " , this.props.society.name)
        if(Object.keys(this.props.society.name).length > 0){
            if(this.props.society.name === "ieee"){
                societyimgurl = "ieee_logo.jpg";
            }
            if(this.props.society.name === "iste"){
                societyimgurl = "iste_logo.jpg";
            }
            if(this.props.society.name === "isa"){
                societyimgurl = "isa_logo.gif";
            }
            if(this.props.society.name === "csi"){
                societyimgurl = "csi_logo.jpg";
            }
        }

        return(
                <div className="col-12 col-md-6 col-lg-4">
                    <Link to={ `/event/${this.props._id}` }>
                       <div className="each-event-container">
                            <div className="img-session">
                                <img src={ this.props.imgurl ? this.props.imgurl.dataurl : "/images/profile_image.png" } alt="event-image" />
                            </div>
                            <div className="content-session">
                                <div className="upper-content d-flex flex-column">
                                    <p className="main-title">{ name }</p>
                                    {
                                        shortdesc.length > 170 ? (
                                            <p className="short-desc">{ shortdesc.substring(0 , 170)  } <a href={ `/event/${this.props._id}` } style={{ color : "red" , fontWeight: "600" }}>...Read more</a></p>
                                        ) : (
                                            <p className="short-desc">{ shortdesc }</p>
                                        )
                                    }
                                    <div className="society-name-section-each-card d-flex justify-content-start align-items-center">
                                        <img src={ `/images/${societyimgurl}` } />
                                        <p>{ this.props.society.name.toUpperCase()  } VESIT</p>
                                    </div>
                                    <div className="date-time-div d-flex justify-content-start align-items-center">
                                        <p className="date-session"><span><i className="far fa-calendar-alt"></i></span>{ date }</p>
                                        <p><span><i className="far fa-clock"></i></span> { time } </p>
                                    </div>
                                    {
                                        isRegistered ? (
                                            <div className="register-button-div">
                                                <button style={ registedEventStyle } id="each-event-unregister-button" className="btn btn-md btn-success" onClick={this.handleUnregister}>Un-Register</button>        
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
                    </Link>
                </div>
        );
    }
}




export default connect(null , { registerEvent , unregisterEvent })(Event);