import React, { Component } from 'react';
import "../../asserts/css/Forms.css";
import { Link } from "react-router-dom";
import { setPersonalDetails } from "../../stores/actions/userRegister/userRegisterDetails";
import { connect } from 'react-redux';
import Navbar from "../navbar";

class PersonalDetailsForm extends Component {
     constructor(props){
         super(props);
         this.state = {
             firstname : "",
             lastname : "",
             phonenum : "",
             image : ""
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
        if(this.props.currentUser.isAuthenticated){
            this.props.setPersonalDetails(this.state , this.props.currentUser.user.id)
            .then(() => {
                console.warn(this.props.history);
                this.props.history.push(`/user/${this.props.currentUser.user.id}/create/classandsociety`); 
               
            }).catch(() => {
                return;
            });
        }
    }

    render(){
        const { firstname , lastname , phonenum }  = this.state;
        return(
            <div>
                <Navbar />
                <div className="our-login-page-content">
                    <div id="login-container">
                        <div className="login-page-contant">
                            <form className="submit-forms" action="personaldetails/add" encType="multipart/form-data" onSubmit={this.handleSubmit}>
                                <center><h1 className="new-h1">Personal Details</h1></center>
                                <div className="form-group">
                                    <label htmlFor="username"  className="label">First Name</label>
                                    <input type="text" className="form-control" id="username" placeholder="Enter Your firstname"
                                            name="firstname" value={firstname} onChange={this.handleChange}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="login-login"  className="label">Last Name</label>
                                    <input type="text" className="form-control" id="login-login" aria-describedby="emailHelp"  placeholder="Enter Your Last Name"
                                            name="lastname" value={lastname} onChange={this.handleChange}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="username"  className="label">Profile Image</label>
                                    <input type="file" className="form-control" aria-describedby="emailHelp" accept="image/*" name="image" onChange={this.handleFileChange}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="username"  className="label">Phone Number</label>
                                    <input type="number" className="form-control" id="username" aria-describedby="emailHelp" placeholder="Enter Phone Number"
                                        name="phonenum" value={phonenum} onChange={this.handleChange}/>
                                </div>
                                
                                <div className="d-flex justify-content-between" id="forgotpassword">
                                    <div>
                                        <button id="our-back-button" className="btn btn-md btn-light">
                                            <Link to="/">Home</Link>
                                        </button>
                                    </div>
                                    <div>
                                        <button type="submit" id="our-back-button" className="btn btn-primary btn-md btn-block">
                                            Next
                                        </button>
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
        currentUser : state.currentUser
    }
} 


export default connect(mapStateToProps , {  setPersonalDetails })(PersonalDetailsForm);