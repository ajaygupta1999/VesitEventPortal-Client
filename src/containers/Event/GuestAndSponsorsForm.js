import React, { Component } from 'react';
import "../../asserts/css/Forms.scss";
import { Link } from "react-router-dom";
import { setGuestAndSponsorsDetails } from "../../stores/actions/userRegisterDetails";
import { connect } from 'react-redux';
import Navbar from "../navbar";


class GuestAndSponsorsForm extends Component {
     constructor(props){
         super(props);
         this.state = {
            isguest : "true",
            name : "",
            profession : "",
            description : "",
            eventtakertype : "outsideguest",
            guestname : "",
            guestprofession : "",
            guestdesc : "",
            facultyname : "",
            facultydesc : "",
            othersname : "",
            othersdepartment : "cmpn",
            otherscurrentyear : "3",
            othersclass : "d12c",
            issponsored : "true",
            sponsorsname : "",
            image : {},
            sponsorsdetails : ""
         }
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
        var dataObj = {};
        dataObj.isguest = this.state.isguest;
        if(this.state.isguest === "true"){
            dataObj.name = this.state.name;
            dataObj.profession = this.state.profession;
            dataObj.description = this.state.description
        }
        dataObj.eventtakertype = this.state.eventtakertype;
        dataObj.issponsored = this.state.issponsored;
        if(this.state.eventtakertype === "outsideguest"){
            dataObj.guestname = this.state.guestname;
            dataObj.guestdesc = this.state.guestdesc;
            dataObj.guestprofession = this.state.guestprofession;
        }else if(this.state.eventtakertype === "collegefaculty"){
            dataObj.facultyname = this.state.facultyname;
            dataObj.facultydesc = this.state.facultydesc;
        }else{
            dataObj.othersname = this.state.othersname;
            dataObj.othersclass = this.state.othersclass;
            dataObj.otherscurrentyear = this.state.otherscurrentyear;
            dataObj.othersdepartment = this.state.othersdepartment;
        }

        if(this.state.issponsored === "true"){
            dataObj.sponsorsname = this.state.sponsorsname;
            dataObj.image = this.state.image;
            dataObj.sponsorsdetails = this.state.sponsorsdetails;
        }

        if(this.props.currentUser.isAuthenticated){
            console.log("Last step of submission ===> ");
            this.props.setGuestAndSponsorsDetails(dataObj , this.props.currentUser.user.id , this.props.createdEvent.data.id)
            .then(() => {
                this.props.history.push("/");    
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
                                <center><h1 className="new-h1">About Guest & Sponsors</h1></center>
                                <div className="Add-guest-session">
                                    <p>Add Guests</p>
                                    <div className="guest-img-div">
                                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#guest-select-modal">
                                            <img style={{ width : "50px" , heright : "50px" }} src="/images/useradd2.png" alt="user-image" />
                                        </button>
                                    </div>
                                </div>
                                <div className="about-sponsers-message d-flex justify-content-start">
                                    <p className="alert-icon"><i className="fas fa-exclamation-circle"></i></p>
                                    <p className="alert-text">If the person is not their on this portal then you can add their Details below.
                                        (This is for outside guest and for those people who have not registered in this portal)
                                        </p>
                                </div>
                                <hr />
                                <p>Guest details for this Event (Mostly outside guest)</p>
                                <div className="doeshavesponsor d-flex justify-content-start">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="isguest" id="exampleRadios1" value="true" onChange={this.handleChange} checked={this.state.isguest === "true"} />
                                        <label className="form-check-label" htmlFor="exampleRadios1">
                                            Yes
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="isguest" id="exampleRadios2" value="false" onChange={this.handleChange} checked={this.state.isguest === "false"}/>
                                        <label className="form-check-label" htmlFor="exampleRadios2">
                                           No
                                        </label>
                                    </div>
                                </div>
                                {
                                    this.state.isguest === "true" && (
                                        <div>
                                            <div className="form-group">
                                                    <label htmlhtmlFor="username" className="label">Guest's Name</label>
                                                    <input type="text" className="form-control" id="username" aria-describedby="emailHelp" placeholder="Name of the Faculty"
                                                        name="name" value={this.state.name} onChange={this.handleChange}/>
                                                </div>
                                            <div className="form-group our-add-sponsor-form">
                                                <label htmlhtmlFor="exampleFormControlFile1">Guest's Profession</label>
                                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="4" name="profession" value={this.state.profession}  onChange={this.handleChange}></textarea>
                                            </div>
                                            <div className="form-group our-add-sponsor-form">
                                                <label htmlhtmlFor="exampleFormControlTextarea1">Something about the guest</label>
                                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" name="description" value={this.state.description}  onChange={this.handleChange}></textarea>
                                            </div>
                                            <hr />
                                        </div>
                                    )

                                }
                                <div className="form-group">
                                    <label htmlhtmlFor="exampleFormControlSelect1" className="label">Event Taker Type</label>
                                    <select className="form-control" id="exampleFormControlSelect1" name="eventtakertype" onChange={this.handleChange}>
                                        <option value="outsideguest">Outside-guest</option>
                                        <option value="collegefaculty">College Faculty</option>
                                        <option value="others">Others (Normal Member/Council Member/Council Head)</option>
                                    </select>
                                    {
                                        this.state.eventtakertype === "outsideguest" && 
                                            <div>
                                                <div className="form-group">
                                                    <label htmlhtmlFor="username" className="label">Name(Guest)</label>
                                                    <input type="text" className="form-control" id="username" aria-describedby="emailHelp" placeholder="Event Guest Name"
                                                        name="guestname" value={this.state.guestname} onChange={this.handleChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlhtmlFor="username" className="label">Profession</label>
                                                    <input type="text" className="form-control" id="username" aria-describedby="emailHelp" placeholder="Enter guest's profession"
                                                        name="guestprofession"  value={this.state.guestprofession} onChange={this.handleChange}/>
                                                </div>
                                                <div className="form-group our-add-sponsor-form">
                                                    <label htmlhtmlFor="exampleFormControlTextarea1" className="label">Something About the Guest</label>
                                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" name="guestdesc" value={this.state.guestdesc} onChange={this.handleChange}></textarea>
                                                </div>
                                        </div>
                                    }
                                    {
                                        this.state.eventtakertype === "collegefaculty" && 
                                            <div>
                                                <div className="form-group">
                                                    <label htmlhtmlFor="username" className="label">Name(Faculty Name)</label>
                                                    <input type="text" className="form-control" id="username" aria-describedby="emailHelp" placeholder="Name of the Faculty"
                                                        name="facultyname" value={this.state.facultyname} onChange={this.handleChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlhtmlFor="username" className="label">Sponsors Details</label>
                                                    <textarea className="form-control" id="username" rows="5" name="facultydesc" value={this.state.facultydesc} onChange={this.handleChange}></textarea>
                                                 </div>
                                        </div>
                                    }
                                    {
                                        this.state.eventtakertype === "others" && 
                                            <div>
                                                <div className="form-group">
                                                    <label htmlhtmlFor="username" className="label">Name</label>
                                                    <input type="text" className="form-control" id="username" aria-describedby="emailHelp" placeholder="Name of the Person"
                                                        name="othersname" value={this.state.othersname} onChange={this.handleChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlhtmlhtmlFor="exampleFormControlSelect1" className="label">Department</label>
                                                    <select className="form-control" id="exampleFormControlSelect1" name="othersdepartment" value="IT" onChange={this.handleChange} value={this.state.othersdepartment} placeholder="Select Branch">
                                                        <option value="cmpn">CMPN</option>
                                                        <option value="it">IT</option>
                                                        <option value="extc">EXTC</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlhtmlhtmlFor="exampleFormControlSelect1" className="label">Current Year of Study</label>
                                                    <select className="form-control" id="exampleFormControlSelect1" name="otherscurrentyear" onChange={this.handleChange} value={this.state.otherscurrentyear}>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="label" htmlhtmlhtmlFor="exampleFormControlSelect1">Class</label>
                                                    <select className="form-control" id="exampleFormControlSelect1" name="othersclass" onChange={this.handleChange} value={this.state.othersclass}>
                                                    <option value="d12c">D12C</option>
                                                    <option value="d7c">D7C</option>
                                                    <option value="d2c">D2C</option>
                                                    <option value="d19c">D19C</option>
                                                    <option value="d15c">D15C</option>
                                                    </select>
                                                </div>
                                            </div>
                                    }
                                   
                                </div>
                                <hr /> 

                                <p>Sponsors Details</p>
                                <div className="doeshavesponsor d-flex justify-content-start">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="issponsored" id="exampleRadios1" value="true" onChange={this.handleChange} checked={this.state.issponsored === "true"} />
                                        <label className="form-check-label" htmlFor="exampleRadios1">
                                            Yes
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="issponsored" id="exampleRadios2" value="false" onChange={this.handleChange} checked={this.state.issponsored === "false"}/>
                                        <label className="form-check-label" htmlFor="exampleRadios2">
                                           No
                                        </label>
                                    </div>
                                </div>
                                {
                                    this.state.issponsored === "true" && (
                                        <div>
                                            <div className="form-group">
                                                    <label htmlhtmlFor="username" className="label">Sponsor's Name</label>
                                                    <input type="text" className="form-control" id="username" aria-describedby="emailHelp" placeholder="Name of the Faculty"
                                                        name="sponsorsname" value={this.state.sponsorsname} onChange={this.handleChange}/>
                                                </div>
                                            <div className="form-group our-add-sponsor-form">
                                                <label htmlhtmlFor="exampleFormControlFile1">Sponsor Image</label>
                                                <input type="file" className="form-control" aria-describedby="emailHelp" accept="image/*" name="image" onChange={this.handleFileChange}/>
                                            </div>
                                            <div className="form-group our-add-sponsor-form">
                                                <label htmlhtmlFor="exampleFormControlTextarea1">Sponsors Details</label>
                                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" name="sponsorsdetails" value={this.state.sponsorsdetails}  onChange={this.handleChange}></textarea>
                                            </div>

                                        </div>
                                    )

                                }
                                <div className="d-flex justify-content-between" id="forgotpassword">
                                    <div>
                                        <a id="our-back-button" className="btn btn-md btn-light" href="addevent/aboutevent">Back</a>
                                    </div>
                                    <div>
                                        <button id="our-next-button" type="submit" className="btn btn-md btn-primary">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="guest-select-modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Add Guests</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div className="modal-body">
                            <div className="our-guest-list d-flex flex-column">
                                        <a className="model-each-guest-link" data-id="">
                                            <div className="each-guest d-flex justify-content-between align-items-center">
                                                <div className="name-and-img-session d-flex justify-content-start align-items-center">
                                                    <img style={{width : "50px" , height : "50px"}} src="/images/useradd2.png" alt="user-image" />
                                                    <div className="user-name-and-details">
                                                        <p>Ajay</p>
                                                    </div>
                                                </div>
                                                <div className="add-btn-session">
                                                    <button className="btn btn-md btn-primary"> Add </button>
                                                </div>
                                            </div>
                                        </a>
                            </div>
                        </div>
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
        createdEvent : state.createdEvent
    }
} 

export default connect(mapStateToProps , {  setGuestAndSponsorsDetails })(GuestAndSponsorsForm);
