import React, { Component } from 'react';

class Event extends Component{
    render(){
        const {name , shortdesc , fulldesc , date , time } = this.props;
        const imgurl = this.props.imgurl.dataurl;
        return(
                <div className="col-12 col-md-4">
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
                                <div className="register-button-div">
                                    <a id="each-event-register-button" className="btn btn-md btn-success" href="/event/">Register</a>        
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Event;