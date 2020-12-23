import React, { Component } from 'react';
import "../../asserts/css/Forms.css";
import { Link } from "react-router-dom";
import { setEventDetails } from "../../stores/actions/userRegister/userRegisterDetails";
import { connect } from 'react-redux';
import Navbar from "../navbar";


class EventDetailsForm extends Component {
     constructor(props){
         super(props);
         this.state = {
             e : "",
             shortdesc : "",
             fulldesc : "",
             category : "technical",
             image : {},
             date : "",
             time  : "",
         }
     }
     
     componentWillMount(){
         let date = new Date();
         let todaysdate =  date.getFullYear() + "-" + ( date.getMonth() + 1 < 10 ? ("0" + (date.getMonth() + 1 )): (date.getMonth() + 1) ) + "-" +  ( date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
         var time = (date.getHours() < 10 ? ("0" + date.getHours()) : date.getHours()) + ":" + (date.getMinutes() < 10 ? ("0" + date.getMinutes()) : date.getMinutes());
         this.setState({
             ...this.state,
             date : todaysdate,
             time : time
         });
     }

     handleChange = (e) => {
         this.setState({
             [e.target.name] : e.target.value
         });
     }

     handleFileChange = (e) => {
        this.setState({
            ...this.state,
            image : e.target.files[0]
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.props.currentUser.isAuthenticated){
            this.props.setEventDetails(this.state , this.props.currentUser.user.id)
            .then(() => {
                this.props.history.push(`/user/${this.props.currentUser.user.id}/add/${this.props.addingEvent.id}/guestandsponsor`);    
            }).catch(() => {
                return;
            });
        }
    }

    render(){
        return(
            <div>
                <Navbar />
                <div className="our-login-page-content">
			     <div id="login-container">
                    <div className="login-page-contant">
                        <form className="submit-forms" encType="multipart/form-data" onSubmit={this.handleSubmit}>
                            <center><h1 className="new-h1">Add New Event</h1></center>
                            <div className="form-group">
                                <label htmlFor="username" className="label">Event Name</label>
                                <input type="text" className="form-control" id="username" aria-describedby="emailHelp" placeholder="Event Name"
                                    name="eventname" value={this.state.eventname} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlTextarea1" className="label">Event-Short Description</label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="4" name="shortdesc" placeholder="Short description about Event" value={this.state.shortdesc} onChange={this.handleChange}></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlTextarea1" className="label">Event-Full Description</label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="6" name="fulldesc" placeholder="Full description about Event" 
                                    value={this.state.fulldesc} onChange={this.handleChange}></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect1" className="label">Event Category</label>
                                <select className="form-control" id="exampleFormControlSelect1" name="category" value={this.state.category} onChange={this.handleChange}>
                                    <option value="technical">Technical Event</option>
                                    <option value="non-technical">Non-technical Event</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="username"  className="label">Event Image</label>
                                <input type="file" className="form-control" aria-describedby="emailHelp" accept="image/*" name="image" onChange={this.handleFileChange}/>
                            </div>
                            <div className="row">
                                <div className="form-group col-12 col-md-6">
                                    <label htmlFor="username" className="label">Event Date</label>
                                    <input type="Date" className="form-control" id="username" aria-describedby="emailHelp" 
                                        name="date" value={this.state.date} onChange={this.handleChange}/>
                                </div>
                                <div className="form-group col-12 col-md-6">
                                    <label htmlFor="username" className="label">Event Timining</label>
                                    <input type="time" className="form-control" id="username" aria-describedby="emailHelp" 
                                        name="time" value={this.state.time} onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between" id="forgotpassword">
                                <div>
                                    <a id="our-back-button" className="btn btn-md btn-light" href="/">Back</a>
                                </div>
                                <div>
                                    <button type="submit" className="btn btn-primary btn-md btn-block">Next</button>
                                </div>
                            </div>
					</form>
				</div>
			</div>
        </div>
    </div>
        )
    }
}

function mapStateToProps(state){
    return {
        currentUser : state.currentUser,
        addingEvent : state.addingEvent
    }
} 

export default connect(mapStateToProps , {  setEventDetails })(EventDetailsForm);
