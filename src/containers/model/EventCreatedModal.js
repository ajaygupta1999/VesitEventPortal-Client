import React, { Component } from 'react';
import Modal from "./Modal";
import "../../asserts/css/EventCreatedModal.scss";
import { Link , withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { hideeventcreatedmodal } from "../../stores/actions/events";
import {  fetchCreatedEvent } from "../../stores/actions/events";



class EventCreatedModal extends Component{

    handleCloseEventCreatedModal = () => {
        this.props.hideeventcreatedmodal();
    }

    componentDidMount = () => {
        let  { userid , eventid } = this.props.match.params; 
        this.props.fetchCreatedEvent(userid , eventid);
    }


    render(){
        return(    
            <Modal className="Event-Created-Modal" hideModal={this.handleCloseEventCreatedModal}>
               <div className="event-created-successful-modal">
                    <h1>Send E-mail</h1>
                    <div className="correct-sign-div-session">
                       <i class="far fa-check-circle"></i>
                    </div>
                    <h5> The <span>{ this.props.createdEvent.data.name }</span> EVENT is successfully created </h5>
                    <p>
                       Now send intractive emails to the students. You can use email templates or you can 
                       create your own template also.  Forget about the simple email body of Gmail. 
                    </p>
                    <div className="send-email-button-div">
                        <Link to="/emails/templates" className="btn btn-md btn-primary send-email-button">
                            <img src="/images/Gmailicon.png" alt="gmailicon" />
                            <span>Send E-mails</span>
                        </Link>
                    </div>
               </div>
            </Modal>
        )
    }
}


const mapStateToProps = ( state ) => ({
    createdEvent : state.createdEvent
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    hideeventcreatedmodal,
    fetchCreatedEvent
} , dispatch);

export default withRouter(connect(mapStateToProps , mapDispatchToProps)(EventCreatedModal)); 