import React, { Component } from 'react';
import Navbar from "../navbar";
import "../../asserts/css/EventPage.scss";
import "../../asserts/css/Reviews.scss";
import { Link } from "react-router-dom";
import { getspecificevent , registerSpecificEvent , unregisterSpecificEvent  } from "../../stores/actions/events";
import { connect } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ReviewCard from "./ReviewCard";
import SponsorCard from "./SponsorCard";
import {  addClassWiseReg , addBranchWiseReg } from "../../utils";


class EventPage extends Component{

    responsiveCarousel = {
        0: {items: 1},
        768: {items: 2},
        992: {items: 3},
        1200: {items: 3},
    }

    responsiveCarouselForSponsors = {
        0: {items: 1},
        768: {items: 1},
        992: {items: 2},
        1200: {items: 2},
    }

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
                isFetchingEventData : false,
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

        let aliceCarouseldataguest = [];
        let aliceCarouseldataeventtaker = [];
        // Eventtakers cards data ==========================
        // Eventtakers ==> (registered , usertype)
        let guesttypedata = "guest";
        let eventtakerdata = "eventtaker";
        let roleuser = "user";
        let roleguest = "guest";
        let roleeventtaker = "eventtaker";
        let registeredguest = true;
        if(event && event.eventtakers && event.eventtakers.registered_eventtakers && 
            (event.eventtakers.registered_eventtakers.typeuser && event.eventtakers.registered_eventtakers.typeuser.length > 0 )){
                let usertype =  event.eventtakers.registered_eventtakers.typeuser.map(guesttypeguest => (
                    <ReviewCard data={guesttypeguest} type={eventtakerdata}  role={roleuser} registeredguest={registeredguest} />
                ));
                console.log("In concat ==> ", usertype)
                aliceCarouseldataeventtaker = aliceCarouseldataeventtaker.concat(usertype);
        }

        // Eventtakers ==> (registered , gueststype)
        if(event && event.eventtakers && event.eventtakers.registered_eventtakers && 
            (event.eventtakers.registered_eventtakers.typeguest && event.eventtakers.registered_eventtakers.typeguest.length > 0))
        {
                let gueststype =  event.eventtakers.registered_eventtakers.typeguest.map(guesttypeguest => (
                    <ReviewCard data={guesttypeguest} type={eventtakerdata}  role={roleguest} registeredguest={registeredguest}/>
                ));
                aliceCarouseldataeventtaker = aliceCarouseldataeventtaker.concat(gueststype);
        }

        // Eventtakers ==> (registered , eventtakerstype)
        if( event && event.eventtakers && event.eventtakers.registered_eventtakers && 
            ( event.eventtakers.registered_eventtakers.typeeventtaker && event.eventtakers.registered_eventtakers.typeeventtaker.length > 0 ))
        {
           let eventtakerstype =  event.eventtakers.registered_eventtakers.typeeventtaker.map(guesttypeeventtaker => (
              <ReviewCard data={guesttypeeventtaker} type={eventtakerdata}  role={roleeventtaker} registeredguest={registeredguest}/>
           ));
           aliceCarouseldataeventtaker = aliceCarouseldataeventtaker.concat(eventtakerstype);
        }

        // Eventtakers ==> (unregistered , eventtakers)
        if(event &&
            event.eventtakers && 
            ( event.eventtakers.unregistered_eventtakers &&  event.eventtakers.unregistered_eventtakers.length > 0 ))
        {
                let unregisterdeventtakers = event.eventtakers.unregistered_eventtakers.map(guesttypeeventtaker => (
                    <ReviewCard data={guesttypeeventtaker} type={eventtakerdata} registeredguest={!registeredguest} />
                ));
                aliceCarouseldataeventtaker = aliceCarouseldataeventtaker.concat(unregisterdeventtakers);
        }
        // ==================    

        // Guests card data ================
        // Guest (reqistered , usertype) ====
        if(event && event.guests  && event.guests.registered_guests &&
            (event.guests.registered_guests.typeuser && event.guests.registered_guests.typeuser.length > 0))
        {
            let usertype = event.guests.registered_guests.typeuser.map(guesttypeuser => (
                <ReviewCard data={guesttypeuser} type={guesttypedata}  role={roleuser} registeredguest={registeredguest} />
            ));
            aliceCarouseldataguest = aliceCarouseldataguest.concat(usertype);
        }
        
        // Guest (reqistered , guesttype) ==
        if(event && event.guests  && event.guests.registered_guests &&
            (event.guests.registered_guests.typeguest && event.guests.registered_guests.typeguest.length > 0))
        {
            let guesttype = event.guests.registered_guests.typeguest.map(guesttypeguest => (
                <ReviewCard data={guesttypeguest} type={guesttypedata}  role={roleguest} registeredguest={registeredguest}/>
            ));
            aliceCarouseldataguest = aliceCarouseldataguest.concat(guesttype);
        }

        // Guest (reqistered , eventtakertype) ====
        if(event && event.guests  && event.guests.registered_guests &&
            (event.guests.registered_guests.typeeventtaker && event.guests.registered_guests.typeeventtaker.length > 0))
        {
            let eventtakertype = event.guests.registered_guests.typeeventtaker.map(guesttypeeventtaker => (
                <ReviewCard data={guesttypeeventtaker} type={guesttypedata}  role={roleeventtaker} registeredguest={registeredguest}/>
            ));
            aliceCarouseldataguest = aliceCarouseldataguest.concat(eventtakertype);
        }

        // Guest (unreqistered , guest) ====
        if(event && event.guests && 
            ( event.guests.unregistered_guests && event.guests.unregistered_guests.length > 0 ))
        {
                let unregisterdguest =  event.guests.unregistered_guests.map(guesttypeguest => (
                    <ReviewCard data={guesttypeguest} type={guesttypedata}  registeredguest={!registeredguest}/> 
                ));
                aliceCarouseldataguest = aliceCarouseldataguest.concat(unregisterdguest);
        }
        // =================================


        let aliceCarouseldatasponsor = []
        // Sponsors card section
        if(event && event.sponsors && event.sponsors.length > 0){
            let sponsors = event.sponsors.map(sponsor => (
                <SponsorCard data={sponsor} />
            ));
            aliceCarouseldatasponsor = aliceCarouseldatasponsor.concat(sponsors);
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
                                                {
                                                     eventshortdesc && (
                                                        eventshortdesc.length > 100 ? (
                                                            <p className="event-short-desc"> { eventshortdesc.substring(0, 150) } ... </p>
                                                        ) : (
                                                            <p className="event-short-desc"> { eventshortdesc } </p>
                                                        )
                                                     )   
                                                }
                                                
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
                                                {
                                                    event && event.registrations && event.registrations.length > 0  &&
                                                        <div className="all-registrations-class-wise">
                                                            {
                                                                event.classWiseReg.map(reg => (
                                                                    <span>{ reg.class.toUpperCase() }-{ reg.reg }</span>
                                                                ))
                                                            } 
                                                        </div>
                                                }
                                                
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
                            
                                
                                {
                                    aliceCarouseldataeventtaker.length > 0 && 
                                        <div>
                                            <center><h2 className="main-title-event-guest mb-3">Events Speakers</h2></center>
                                            <div className="reviews">
                                                <AliceCarousel 
                                                    mouseTracking 
                                                    responsive={this.responsiveCarousel}
                                                    dotsDisabled={true}
                                                    buttonsDisabled={true}
                                                    autoPlay={true}
                                                    infinite={false}
                                                    autoPlayInterval={3000}
                                                    items={aliceCarouseldataeventtaker} 
                                                />
                                            </div>
                                        </div>
                                }
                                
                                {
                                    aliceCarouseldataguest.length > 0 && 
                                        <div>
                                            <center><h2 className="main-title-event-guest mb-3">Events Guests</h2></center>
                                            <div className="reviews">
                                                <AliceCarousel 
                                                    mouseTracking 
                                                    responsive={this.responsiveCarousel}
                                                    dotsDisabled={true}
                                                    buttonsDisabled={true}
                                                    autoPlay={true}
                                                    infinite={false}
                                                    autoPlayInterval={3000}
                                                    items={aliceCarouseldataguest} 
                                                />
                                            </div>
                                        </div>
                                }
        
                                
                            {
                                event &&
                                event.sponsors &&
                                event.sponsors.length > 0 && 
                                    <div>
                                        <center><h2 className="main-title-full-detail">Sponsored by</h2></center>
                                        <div className="sponsors-cards">
                                            <AliceCarousel 
                                                mouseTracking 
                                                responsive={this.responsiveCarouselForSponsors}
                                                dotsDisabled={true}
                                                buttonsDisabled={true}
                                                autoPlay={true}
                                                infinite={false}
                                                autoPlayInterval={3000}
                                                items={aliceCarouseldatasponsor} 
                                            />
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








export default connect(mapStateToProps , { getspecificevent  , registerSpecificEvent , unregisterSpecificEvent })(EventPage);