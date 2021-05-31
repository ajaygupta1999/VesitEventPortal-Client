import React, { Component } from 'react';
import "../../asserts/css/Forms.scss";
import { setEventDetails } from "../../stores/actions/user";
import { connect } from 'react-redux';
import Navbar from "../navbar";
import { addFormLink , showeventcreatedmodal , fetchCreatedEvent } from "../../stores/actions/events";


class RegistrationFormDetails extends Component {
     constructor(props){
         super(props);
         this.state = {
             haveregistrationform : "true",
             formlink : ""
         }
     }
     
     componentDidMount = async () => {
          let { userid , eventid } = this.props.match.params;
          await this.props.fetchCreatedEvent(userid , eventid);        
     }
  
    handleChange = (e) => {
        this.setState({
            [e.target.name] :  e.target.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        let dataobj = {};
        dataobj.haveregistrationform = true;
        dataobj.formlink = this.state.formlink;
        console.log("Form is submitted =>> " , dataobj );
        let eventdetails = await this.props.addFormLink(dataobj , this.props.currentUser.user._id , this.props.createdEvent.data._id);   
        if(eventdetails._id){
            // Event is successfully created
            this.props.showeventcreatedmodal();
            this.props.history.push(`/home/createdevent/user/${this.props.currentUser.user._id}/event/${this.props.createdEvent.data._id}?showmodal=createdeventmodal`);
        }
        
        
    }
    

    render(){
        return(
            <div>
                <Navbar />
                <div className="our-login-page-content">
                 <div className="event-page-navigation">
                    <div className="society-page-navigation-session d-flex flex-row justify-content-center"> 
                        <div class="event-details-session">
                            <span>Event Details</span>
                        </div>
                        <div class="event-details-session">
                            <span>Guest and Sponsors</span>
                        </div>
                        <div class="event-details-session current-event-details-filling">
                            <span>Registration form</span>
                        </div>                        
                    </div>
                </div>
                 </div>
			     <div id="login-container">
                    <div className="login-page-contant">
                        <center><h1 className="new-h1">Registration Form</h1></center>
                        <div className="alert-about-form-registration d-flex justify-content-start align-items-start">
                            <p className="alert-icon"><i className="fas fa-exclamation-circle"></i></p>
                            <p className="alert-text">
                            Do you have Registration form for our event?. If yes then you can give the link below (google form's sharable link).
                            for example you can craete form on google form and share that link below.
                            Otherwise you can create your Registration from here. just click the link below to create form on our website.
                            if you create forms on our website then we can give you form details, and visual analysis of that data. It is recomanded to create form on our website.
                            If you don't want to create registration form then you can skip this page.
                            </p>
                        </div>
                        <form className="submit-forms mx-4" onSubmit={this.handleSubmit}>
                            <p className="not-registered-guest-session">Do you have Registration form ?</p>
                            <div className="doeshavesponsor d-flex justify-content-start">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="haveregistrationform" id="exampleRadios1" value="true" onChange={this.handleChange}  checked={this.state.haveregistrationform === "true"}/>
                                    <label className="form-check-label" htmlFor="exampleRadios1">
                                        Yes
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="haveregistrationform" id="exampleRadios2" value="false" onChange={this.handleChange} checked={this.state.haveregistrationform === "false"}/>
                                    <label className="form-check-label" htmlFor="exampleRadios2">
                                        No
                                    </label>
                                </div>
                            </div>
                            {
                                this.state.haveregistrationform === "true" ?  (
                                <div className="my-2">
                                    <div className="form-group">
                                        <label htmlFor="formlink" className="label">Registration Form Link</label>
                                        <input type="url" className="form-control" id="formlink" aria-describedby="emailHelp" placeholder="Form link"
                                            name="formlink" value={this.state.formlink} onChange={this.handleChange}/>
                                    </div>
                                    <div className="d-flex justify-content-between" id="forgotpassword">
                                        <div>
                                            <a id="our-back-button" className="btn btn-md btn-light back-buttons" href="addevent/aboutevent">Back</a>
                                        </div>
                                        <div>
                                           <button type="submit" className="btn btn-primary btn-md btn-block next-buttons">Submit</button>
                                        </div>
                                    </div>
                                </div> 
                                ) : (
                                    <div className="d-flex justify-content-between" id="forgotpassword">
                                        <div>
                                            <a id="our-back-button" className="btn btn-md btn-light back-buttons" href="addevent/aboutevent">Back</a>
                                        </div>
                                        <div>
                                           <button type="submit" className="btn btn-primary btn-md btn-block next-buttons">Submit</button>
                                        </div>
                                    </div>
                                )
                            }
                        </form>
                        {/* <div className="new-registration-form d-flex flex-column align-items-center mt-4 mb-4">
                            <h4 className="create-new-form-text mb-3">Create New Form Here.</h4>
                            <Link to={ `/user/${this.props.currentUser.user._id}/add/${this.props.createdEvent.data._id}/formdetails/createnewform` } type="button" className="btn btn-primary btn-md btn-block create-new-form-button">Create New Form</Link>
                        </div> */}
				</div>
			</div>
        </div>
        )
    }
}

function mapStateToProps(state){
    return {
        currentUser : state.currentUser,
        createdEvent : state.createdEvent
    }
} 

export default connect(mapStateToProps , {  setEventDetails , addFormLink , showeventcreatedmodal , fetchCreatedEvent })(RegistrationFormDetails);
