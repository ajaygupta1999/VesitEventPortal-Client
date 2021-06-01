import React, { Component } from 'react';
import Navbar from "../navbar";
import "../../asserts/css/EventPage.scss";
import { Link } from "react-router-dom";
import { getspecificevent , registerSpecificEvent , unregisterSpecificEvent  } from "../../stores/actions/events";
import { connect } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import 'bootstrap/dist/css/bootstrap.min.css'; 




class EventPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            isFetchingEventData : false,
            regregisteringEvent : false,
            unregisteringEvent : false,
        }
    }

    componentDidMount = async () => {
        try {
            this.setState({
                ...this.state,
                isFetchingEventData : true
            });
            let { eventid } = this.props.match.params;
            await this.props.getspecificevent(eventid);
            this.setState({
                ...this.state,
                isFetchingEventData : false
            });
        }catch(err){
            console.log(err);
        }
    }

    handleRegister = async () => {
        if(this.props.currentUser.isAuthenticated){
            this.setState({
                ...this.state,
                regregisteringEvent : true
            });

            await this.props.registerSpecificEvent(this.props.currentUser.user._id , this.props.specificEvent.data._id);

            this.setState({
                ...this.state,
                regregisteringEvent : false
            });
        }
    }

    handleUnregister = async () => {
        if(this.props.currentUser.isAuthenticated){
            this.setState({
                ...this.state,
                unregisteringEvent : true
            });
            await this.props.unregisterSpecificEvent( this.props.currentUser.user._id , this.props.specificEvent.data._id);
            this.setState({
                ...this.state,
                unregisteringEvent : false
            });
        }
    }

    getGuestsNames = (guests) => {

        let guestnames = [];
        
        if(guests){
            let usertype = guests.registered_guests.typeuser;
            let eventtakertype = guests.registered_guests.typeeventtaker;
            let guesttype = guests.registered_guests.typeguest;
            let unregisteredguests = guests.unregistered_guests;

            usertype.forEach(eachuser => {
                guestnames.push(eachuser.username);
            });

            eventtakertype.forEach(eacheventtaker => {
                if(eacheventtaker.role === "outsideperson"){
                    guestnames.push(eacheventtaker.details.outsideperson.name);
                }
                if(eacheventtaker.role === "faculty"){
                    guestnames.push(eacheventtaker.details.faculty.name);
                }
                if(eacheventtaker.role === "others"){
                    guestnames.push(eacheventtaker.details.others.name);
                }
            });

            guesttype.forEach(eachguest => {
                if(eachguest.role === "outsideperson"){
                    guestnames.push(eachguest.details.outsideperson.name);
                }
                if(eachguest.role === "faculty"){
                    guestnames.push(eachguest.details.faculty.name);
                }
                if(eachguest.role === "others"){
                    guestnames.push(eachguest.details.others.name);
                }
            });

            unregisteredguests.forEach(eachunregisteredguests => {
                if(eachunregisteredguests.role === "outsideperson"){
                    guestnames.push(eachunregisteredguests.details.outsideperson.name);
                }
                if(eachunregisteredguests.role === "faculty"){
                    guestnames.push(eachunregisteredguests.details.faculty.name);
                }
                if(eachunregisteredguests.role === "others"){
                    guestnames.push(eachunregisteredguests.details.others.name);
                }
            });
        }

        return guestnames;   
    }

    getEventtakersNames = (eventtakers) => {
        let eventtakernames = [];
        
        if(eventtakers){
            let usertype = eventtakers.registered_eventtakers.typeuser;
            let eventtakertype = eventtakers.registered_eventtakers.typeeventtaker;
            let guesttype = eventtakers.registered_eventtakers.typeguest;
            let unregisteredeventtakers = eventtakers.unregistered_eventtakers;

            usertype.forEach(eachuser => {
                eventtakernames.push(eachuser.username);
            });

            eventtakertype.forEach(eacheventtaker => {
                if(eacheventtaker.role === "outsideperson"){
                    eventtakernames.push(eacheventtaker.details.outsideperson.name);
                }
                if(eacheventtaker.role === "faculty"){
                    eventtakernames.push(eacheventtaker.details.faculty.name);
                }
                if(eacheventtaker.role === "others"){
                    eventtakernames.push(eacheventtaker.details.others.name);
                }
            });

            guesttype.forEach(eachguest => {
                if(eachguest.role === "outsideperson"){
                    eventtakernames.push(eachguest.details.outsideperson.name);
                }
                if(eachguest.role === "faculty"){
                    eventtakernames.push(eachguest.details.faculty.name);
                }
                if(eachguest.role === "others"){
                    eventtakernames.push(eachguest.details.others.name);
                }
            });

            unregisteredeventtakers.forEach(eachunregisteredeventtakers => {
                if(eachunregisteredeventtakers.role === "outsideperson"){
                    eventtakernames.push(eachunregisteredeventtakers.details.outsideperson.name);
                }

                if(eachunregisteredeventtakers.role === "faculty"){
                    eventtakernames.push(eachunregisteredeventtakers.details.faculty.name);
                }

                if(eachunregisteredeventtakers.role === "others"){
                    eventtakernames.push(eachunregisteredeventtakers.details.others.name);
                }
            });
        } 

        return eventtakernames;
        
    }

    getFullDescInHTML = () => {
        if(this.props.specificEvent.data){
            if(this.props.specificEvent.data.fulldesc){
                let data = this.props.specificEvent.data.fulldesc;
                return { __html : data };
            }
            return null;
        }
        return null;
    }

    render(){

        let event = this.props.specificEvent.data;
        let isRegistered = false;
        let eventname = "";
        let eventshortdesc = "";
        let imgurl = "";
        let guestname = "";
        let eventtakername = "";
        let date = "";
        let time = "";
        let guestnames = [];
        let eventtakernames = [];

        if(event){
            eventname = event.name;
            eventshortdesc = event.shortdesc;  
            date = event.date;
            time = event.time;
            guestnames = this.getGuestsNames(this.props.specificEvent.data.guests);
            eventtakernames = this.getEventtakersNames(this.props.specificEvent.data.eventtakers);
            
            for(let i = 0 ; i < guestnames.length ; i++){
                if(guestnames.length -1 === i){
                    guestname = guestname + guestnames[i] + ".";
                }else{
                    guestname = guestname + guestnames[i] + ", ";
                }
            }

            for(let i = 0 ; i < eventtakernames.length ; i++){
                if(eventtakernames.length - 1 === i){
                    eventtakername = eventtakername + eventtakernames[i] + ".";
                }else{
                    eventtakername = eventtakername + eventtakernames[i] + ", ";
                }
            }

            if(Object.keys(event).length > 0){
                if(Object.keys(event.society).length > 0){
                    if(event.society.name === "ieee"){
                        imgurl = "/images/ieee_logo.jpg";
                    }
                    if(event.society.name === "iste"){
                        imgurl = "/images/iste_logo.jpg";
                    }
                    if(event.society.name === "isa"){
                        imgurl = "/images/isa_logo.gif";
                    }
                    if(event.society.name === "csi"){
                        imgurl = "/images/csi_logo.jpg";
                    }
                }
            }

            if(event.registrations){
               let matchedarr = event.registrations.filter(user => user._id === this.props.currentUser.user._id );
               if(matchedarr.length === 1){
                   isRegistered = true;
               }
            }
            
        }

        const registedEventStyle = {
            backgroundColor : "blue !important"
        }

    
        return(
            <div>
                <Navbar />
                {
                    this.state.isFetchingEventData ? (
                        <div className="spinner-div text-center">
                            <Spinner className="custom-modal-spinner" animation="border"/>
                        </div>
                    ) : (
                        <div className="each-event-main-div">
                            <div className="row">
                                <div className="col-12">
                                    <div className="row each-event-main-div-session">
                                        <div className="col-12 col-md-6">
                                            <div className="each-event-content d-flex flex-column">
                                                <p className="event-name">{ eventname }</p>
                                                <p className="event-short-desc">{ eventshortdesc }</p>
                                                {
                                                    guestnames.length > 0 &&
                                                    <p className="event-guest">
                                                    <span>Guests:</span>
                                                    { guestname }
                                                    </p>
                                                }
                                                {
                                                    eventtakernames.length > 0 &&
                                                    <p className="event-guest">
                                                    <span>Speakers:</span>
                                                    { eventtakername }
                                                    </p>
                                                }
                                                <p className="event-date-time"><span><i className="far fa-calendar-alt"></i> { date } </span> <span><i className="far fa-clock"></i>{ time }</span></p>
                                                <Link className="profile-to-society-link" to="/society/ieee">
                                                    <div className="society-collections d-flex align-items-center">
                                                        <div>
                                                            <img src={ imgurl } alt="society-img"/>
                                                        </div>
                                                        <p className="profile-incharge-name"> { event ? ( event.society ?  event.society.name.toUpperCase() : null ) : null } VESIT </p>
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
                                                {
                                                    event &&
                                                    event.registrations && 
                                                        event.registrations.length > 0  && 
                                                        <p className="total-registrations-on-specific-event"> <i class="fas fa-user-friends"></i> <span>{ event.registrations.length } Registrations</span></p>
                                                }
                                                <div className="call-starts-in-time">
                                                    <p>Event Starts in : <span>05:04:30</span></p>
                                                </div>
                                                <div className="register-button-div">
                                                    {
                                                        this.state.regregisteringEvent && (
                                                            <button type="submit" className="btn btn-primary btn-md register-button-div disable-button" disabled>
                                                                <div className="text-center white-spinner-div">
                                                                    <Spinner className="white-small-button-spinner" animation="border"/>
                                                                </div>
                                                                <span className="spinner-text">Registering</span>
                                                            </button>
                                                        )   
                                                    }
                                                    {
                                                         this.state.unregisteringEvent && (
                                                            <button type="submit" className="btn btn-success btn-md register-button-div disable-button" disabled>
                                                                <div className="text-center white-spinner-div">
                                                                    <Spinner className="white-small-button-spinner" animation="border"/>
                                                                </div>
                                                                <span className="spinner-text">Unregistering</span>
                                                            </button>
                                                         )
                                                    }
                                                    {
                                                        ( !this.state.unregisteringEvent && !this.state.regregisteringEvent ) &&
                                                            <div className="d-inline-block">
                                                                {
                                                                        isRegistered ? (
                                                                            <button style={registedEventStyle} id="each-event-unregister-button" 
                                                                                    className="btn btn-md btn-success register-button-div" onClick={this.handleUnregister}>Un-Register</button>
                                                                        ) : (
                                                                            <button id="each-event-register-button" className="btn btn-md btn-primary register-button-div" 
                                                                                onClick={this.handleRegister}>Register</button>
                                                                        )
                                                                    } 
                                                            </div>
                                                        
                                                    }
                                                    
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
                                <center><h2 className="main-title-full-detail">Full Detail of the Event</h2></center>
                                <div className="full-detail-session">
                                <div dangerouslySetInnerHTML={this.getFullDescInHTML()}></div>
                                </div>
                            
                                <center><h2 className="main-title-event-guest mb-3">Events Speakers</h2></center>
                                
                                <div className="row">
                                {
                                    event &&
                                        event.eventtakers && 
                                        event.eventtakers.registered_eventtakers  &&  
                                            ( event.eventtakers.registered_eventtakers.typeuser &&  event.eventtakers.registered_eventtakers.typeuser.length > 0 ) &&
                                            event.eventtakers.registered_eventtakers.typeuser.map(guesttypeuser => (
                                                <div className="each-member-card col-12 col-md-6 col-lg-4 col-xl-3">
                                                    <div className="card">
                                                        <img id="card-profile-image" className="card-img-top" src="/images/user-img1.jpg" alt="Card image cap" />
                                                        <div className="card-body">
                                                            <h5 className="card-title">{ guesttypeuser.username }</h5>
                                                            {
                                                                guesttypeuser.societydetails ? 
                                                                <p className="card-text">{ guesttypeuser.societydetails.name.toUpperCase() } VESIT, { guesttypeuser.societydetails.role.toUpperCase() }</p>
                                                                : null
                                                            }
                                                            {
                                                                guesttypeuser.classdetails ?
                                                                <p className="card-text"> { guesttypeuser.classdetails.department.toUpperCase()  }  , { guesttypeuser.classdetails.class.toUpperCase() }-{guesttypeuser.classdetails.rollno} </p>
                                                                : null
                                                            }
                                                            <div className="each-guest-profile-link-div">
                                                            <Link to={ `/user/${ guesttypeuser._id}/profile` } className="btn btn-sm btn-primary navigation-link-to-profile">
                                                                <span> Profile </span> </Link>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        {
                                            event &&
                                            event.eventtakers && 
                                            event.eventtakers.registered_eventtakers && 
                                            ( event.eventtakers.registered_eventtakers.typeguest && event.eventtakers.registered_eventtakers.typeguest.length > 0 ) &&
                                                event.eventtakers.registered_eventtakers.typeguest.map(guesttypeguest => (
                                                    <div className="each-member-card col-12 col-md-6 col-lg-4 col-xl-3">
                                                        <div className="card">
                                                            <img id="card-profile-image" className="card-img-top" src="/images/user-img1.jpg" alt="Card image cap" />
                                                            {
                                                                guesttypeguest.role === "others" ? 
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">{ guesttypeguest.details.others.name }</h5>
                                                                        <p className="card-text">{ guesttypeguest.details.others.branch.toUpperCase() }, { guesttypeguest.details.others.class.toUpperCase() }</p>
                                                                    </div>
                                                                : (
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">
                                                                            { 
                                                                            guesttypeguest.role === "outsideperson" ?  guesttypeguest.details.outsideperson.name : guesttypeguest.details.faculty.name
                                                                            }
                                                                        </h5>
                                                                        <p className="card-text">
                                                                            {
                                                                                guesttypeguest.role === "outsideperson" ? guesttypeguest.details.outsideperson.profession :  guesttypeguest.details.faculty.profession
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                ))
                                        }
                                        {
                                            event &&
                                            event.eventtakers && 
                                            event.eventtakers.registered_eventtakers && 
                                                ( event.eventtakers.registered_eventtakers.typeeventtaker && event.eventtakers.registered_eventtakers.typeeventtaker.length > 0 ) &&
                                                event.eventtakers.registered_eventtakers.typeeventtaker.map(guesttypeeventtaker => (
                                                    <div className="each-member-card col-12 col-md-6 col-lg-4 col-xl-3">
                                                        <div className="card">
                                                            <img id="card-profile-image" className="card-img-top" src="/images/user-img1.jpg" alt="Card image cap" />
                                                            {
                                                                guesttypeeventtaker.role === "others" ? 
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">{ guesttypeeventtaker.details.others.name }</h5>
                                                                        <p className="card-text">{ guesttypeeventtaker.details.others.branch.toUpperCase() }, { guesttypeeventtaker.details.others.class.toUpperCase() }</p>
                                                                    </div>
                                                                : (
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">
                                                                            { 
                                                                            guesttypeeventtaker.role === "outsideperson" ?  guesttypeeventtaker.details.outsideperson.name : guesttypeeventtaker.details.faculty.name
                                                                            }
                                                                        </h5>
                                                                        <p className="card-text">
                                                                            {
                                                                                guesttypeeventtaker.role === "outsideperson" ? guesttypeeventtaker.details.outsideperson.profession :  guesttypeeventtaker.details.faculty.profession
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                ))
                                        }
                                        {
                                            event &&
                                            event.eventtakers && 
                                            ( event.eventtakers.unregistered_eventtakers &&  event.eventtakers.unregistered_eventtakers.length > 0 ) &&
                                            event.eventtakers.unregistered_eventtakers.map(guesttypeeventtaker => (
                                                <div className="each-member-card col-12 col-md-6 col-lg-4 col-xl-3">
                                                    <div className="card">
                                                        <img id="card-profile-image" className="card-img-top" src="/images/user-img1.jpg" alt="Card image cap" />
                                                        {
                                                            guesttypeeventtaker.role === "others" ? 
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{ guesttypeeventtaker.details.others.name }</h5>
                                                                    <p className="card-text">{ guesttypeeventtaker.details.others.branch.toUpperCase() }, { guesttypeeventtaker.details.others.class.toUpperCase() }</p>
                                                                </div>
                                                            : (
                                                                <div className="card-body">
                                                                    <h5 className="card-title">
                                                                        { 
                                                                        guesttypeeventtaker.role === "outsideperson" ?  guesttypeeventtaker.details.outsideperson.name : guesttypeeventtaker.details.faculty.name
                                                                        }
                                                                    </h5>
                                                                    <p className="card-text">
                                                                        {
                                                                            guesttypeeventtaker.role === "outsideperson" ? guesttypeeventtaker.details.outsideperson.profession :  guesttypeeventtaker.details.faculty.profession
                                                                        }
                                                                    </p>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            ))
                                        }
                                </div>
                                
                        
                                <center><h2 className="main-title-event-guest mb-3">Events Guests</h2></center>
                                
                                <div className="row">
                                    {
                                    event &&
                                        event.guests  &&
                                        event.guests.registered_guests &&
                                            (event.guests.registered_guests.typeuser && event.guests.registered_guests.typeuser.length > 0) &&
                                            event.guests.registered_guests.typeuser.map(guesttypeuser => (
                                                <div className="each-member-card col-12 col-md-6 col-lg-4 col-xl-3">
                                                    <div className="card">
                                                        <img id="card-profile-image" className="card-img-top" src="/images/user-img1.jpg" alt="Card image cap" />
                                                        <div className="card-body">
                                                            <h5 className="card-title">{ guesttypeuser.username }</h5>
                                                            {
                                                                guesttypeuser.societydetails ? 
                                                                <p className="card-text">{ guesttypeuser.societydetails.name.toUpperCase() } VESIT, { guesttypeuser.societydetails.role.toUpperCase() }</p>
                                                                : null
                                                            }
                                                            {
                                                                guesttypeuser.classdetails ?
                                                                <p className="card-text"> { guesttypeuser.classdetails.department.toUpperCase()  }  , { guesttypeuser.classdetails.class.toUpperCase() }-{guesttypeuser.classdetails.rollno} </p>
                                                                : null
                                                            }
                                                            <div className="each-guest-profile-link-div">
                                                            <Link to={ `/user/${ guesttypeuser._id}/profile` } className="btn btn-sm btn-primary navigation-link-to-profile">
                                                                <span> Profile </span> </Link>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        {
                                            event &&
                                            event.guests &&
                                            event.guests.registered_guests && 
                                            ( event.guests.registered_guests.typeguest && event.guests.registered_guests.typeguest.length > 0 ) &&
                                                event.guests.registered_guests.typeguest.map(guesttypeguest => (
                                                    <div className="each-member-card col-12 col-md-6 col-lg-4 col-xl-3">
                                                        <div className="card">
                                                            <img id="card-profile-image" className="card-img-top" src="/images/user-img1.jpg" alt="Card image cap" />
                                                            {
                                                                guesttypeguest.role === "others" ? 
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">{ guesttypeguest.details.others.name }</h5>
                                                                        <p className="card-text">{ guesttypeguest.details.others.branch.toUpperCase() }, { guesttypeguest.details.others.class.toUpperCase() }</p>
                                                                    </div>
                                                                : (
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">
                                                                            { 
                                                                            guesttypeguest.role === "outsideperson" ?  guesttypeguest.details.outsideperson.name : guesttypeguest.details.faculty.name
                                                                            }
                                                                        </h5>
                                                                        <p className="card-text">
                                                                            {
                                                                                guesttypeguest.role === "outsideperson" ? guesttypeguest.details.outsideperson.profession :  guesttypeguest.details.faculty.profession
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                ))
                                        }
                                        {
                                            event &&
                                            event.guests && 
                                            event.guests.registered_guests && 
                                                ( event.guests.registered_guests.typeeventtaker &&  event.guests.registered_guests.typeeventtaker.length > 0 ) &&
                                                event.guests.registered_guests.typeeventtaker.map(guesttypeeventtaker => (
                                                    <div className="each-member-card col-12 col-md-6 col-lg-4 col-xl-3">
                                                        <div className="card">
                                                            <img id="card-profile-image" className="card-img-top" src="/images/user-img1.jpg" alt="Card image cap" />
                                                            {
                                                                guesttypeeventtaker.role === "others" ? 
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">{ guesttypeeventtaker.details.others.name }</h5>
                                                                        <p className="card-text">{ guesttypeeventtaker.details.others.branch.toUpperCase() }, { guesttypeeventtaker.details.others.class.toUpperCase() }</p>
                                                                    </div>
                                                                : (
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">
                                                                            { 
                                                                            guesttypeeventtaker.role === "outsideperson" ?  guesttypeeventtaker.details.outsideperson.name : guesttypeeventtaker.details.faculty.name
                                                                            }
                                                                        </h5>
                                                                        <p className="card-text">
                                                                            {
                                                                                guesttypeeventtaker.role === "outsideperson" ? guesttypeeventtaker.details.outsideperson.profession :  guesttypeeventtaker.details.faculty.profession
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                ))
                                        }
                                        {
                                            event &&
                                            event.guests && 
                                            ( event.guests.unregistered_guests && event.guests.unregistered_guests.length > 0 ) && 
                                                event.guests.unregistered_guests.map(guesttypeguest => (
                                                <div className="each-member-card col-12 col-md-6 col-lg-4 col-xl-3">
                                                    <div className="card">
                                                        <img id="card-profile-image" className="card-img-top" src="/images/user-img1.jpg" alt="Card image cap" />
                                                        {
                                                            guesttypeguest.role === "others" ? 
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{ guesttypeguest.details.others.name }</h5>
                                                                    <p className="card-text">{ guesttypeguest.details.others.branch.toUpperCase() }, { guesttypeguest.details.others.class.toUpperCase() }</p>
                                                                </div>
                                                            : (
                                                                <div className="card-body">
                                                                    <h5 className="card-title">
                                                                        { 
                                                                        guesttypeguest.role === "outsideperson" ?  guesttypeguest.details.outsideperson.name : guesttypeguest.details.faculty.name
                                                                        }
                                                                    </h5>
                                                                    <p className="card-text">
                                                                        {
                                                                            guesttypeguest.role === "outsideperson" ? guesttypeguest.details.outsideperson.profession :  guesttypeguest.details.faculty.profession
                                                                        }
                                                                    </p>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            ))
                                        }
                                </div>
                            {
                                event &&
                                event.sponsors &&
                                event.sponsors.length > 0 && 
                                    <div>
                                        <center><h2 className="main-title-full-detail">Sponsored by</h2></center>
                                        <div className="full-detail-session container">
                                            <div className="row">
                                                <div className="col-12 col-md-8 d-flex flex-column align-items-start">
                                                    <p style={{ fontWeight : "600" , fontSize : "20px" , margin : "0px" }}>{ event.sponsors[0].name }</p>
                                                    <p>{ event.sponsors[0].description }</p>
                                                </div>
                                                <div className="col-12 col-md-4">
                                                    <div className="full-detail-img-session d-flex justify-content-center">
                                                        <img id="github-img"  src={ event.sponsors[0].imgurl ? event.sponsors[0].imgurl.dataurl : "/images/github.png" } alt="sponsors-image" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            }
                        </div>
                    )
                }
            
                
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    specificEvent : state.specificEvent,
    currentUser : state.currentUser
});


export default connect(mapStateToProps , { getspecificevent , registerSpecificEvent , unregisterSpecificEvent })(EventPage);