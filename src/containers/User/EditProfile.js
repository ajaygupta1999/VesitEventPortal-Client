import React, { Component } from 'react';
import Navbar from "../navbar";
import { connect } from "react-redux";
import  { updateUserProfileData, 
    updateUserSocietyDetails, 
    updateUserClassDetails 
} from "../../stores/actions/user";
import { Redirect , withRouter } from 'react-router-dom';
import "../../asserts/css/EditPages.scss";

class EditProfile extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            role : "",
            firstname : "",
            lastname : "",
            email : "",
            image : {},
            class: "",
            department : "",
            rollno : 0,
            semester : 0,
            currentyear : 0,
            society : "",
            societyrole : "",
            specificrole : "",
        }
    }

    componentDidMount = () => {
        let userdata = this.props.currentUser.user;
        if(Object.keys(userdata).length > 0){
            this.setState({
                role : userdata.role,
                firstname : userdata.firstname,
                lastname : userdata.lastname,
                email : userdata.email,
                image : userdata.imgurl,
                class : userdata.classdetails ? userdata.classdetails.class : "",
                department : userdata.classdetails ? userdata.classdetails.department : "",
                currentyear : userdata.classdetails ? userdata.classdetails.currentyearofstudy : 0,
                semester : userdata.classdetails ?  userdata.classdetails.semester : 0,
                rollno : userdata.classdetails ?  userdata.classdetails.rollno : 0,
                society : userdata.societydetails ? userdata.societydetails.name : "",
                societyrole : userdata.societydetails ? userdata.societydetails.role : "",
                specificrole : userdata.societydetails ? userdata.societydetails.specificrole : ""
            });
        }
    }

   componentDidUpdate = (prevProps , prevState) => {
        if(JSON.stringify(prevProps.currentUser.user) !== JSON.stringify(this.props.currentUser.user)){
            let userdata = this.props.currentUser.user;
            if(Object.keys(userdata).length > 0){
                this.setState({
                    role : userdata.role,
                    firstname : userdata.firstname,
                    lastname : userdata.lastname,
                    email : userdata.email,
                    image : userdata.imgurl,
                    class : userdata.classdetails ? userdata.classdetails.class : "",
                    department : userdata.classdetails ? userdata.classdetails.department : "",
                    currentyear : userdata.classdetails ? userdata.classdetails.currentyearofstudy : 0,
                    semester : userdata.classdetails ?  userdata.classdetails.semester : 0,
                    rollno : userdata.classdetails ?  userdata.classdetails.rollno : 0,
                    society : userdata.societydetails ? userdata.societydetails.name : "",
                    societyrole : userdata.societydetails ? userdata.societydetails.role : "",
                    specificrole : userdata.societydetails ? userdata.societydetails.specificrole : ""
                });
            }
        }
    }

    handleChange = (e) => {
            this.setState({
              ...this.state,
              [e.target.name] : e.target.value
            });
    }

    handleFileChange = (e) => {
        this.setState({
            ...this.state,
            image : e.target.files[0]
        });
    }

    handlePersonalDetailsUpdate = (e) => {
        e.preventDefault();
        let dataobj = {
            firstname : this.state.firstname,
            lastname : this.state.lastname,
            image : this.state.image
        }
        this.props.updateUserProfileData(this.props.currentUser.user._id , dataobj);
    }
    
    handleSocietyDetailsUpdate = (e) => {
        e.preventDefault();
        if(this.state.role === "student"){
            if(this.state.societyrole !== "faculty"){
                let dataobj = {
                    role : this.state.role,
                    specificrole : this.state.specificrole
                }
                this.props.updateUserSocietyDetails(this.props.currentUser.user._id , dataobj);
            }
        }
    }

    handleUpdateClassDetails = (e) => {
        e.preventDefault();
        if(this.state.role === "student"){
            let dataobj = {
                class: this.state.class,
                department : this.state.department,
                rollno : this.state.rollno,
                semester : this.state.semester,
                currentyear : this.state.currentyear,
            }

            this.props.updateUserClassDetails(this.props.currentUser.user._id , dataobj);
        }
    }
    
    
    
     render(){

        let { userid } = this.props.match.params;

         if(!this.props.currentUser.isAuthenticated || this.props.currentUser.user._id !== userid){
             
             return <Redirect to={ `/user/${userid}/profile` } />
         }else{
            return(
                <div>
                    <Navbar />
                        <div className="Edit-profile-page-div">
                        <h3 className="update-profile-heading">Update profile Details</h3>
                        <div className="update-profile-personalDetails row">
                            <div className="update-profile-left-session col-md-5">
                                <h3> Personal Details </h3>
                                <p>Here you can update your personal details. You can not update email address.</p>
                            </div>
                            <div className="col-md-7">
                                <form onSubmit={this.handlePersonalDetailsUpdate}>
                                    <div class="row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="email" className="label">Email</label>
                                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Your Email"
                                                name="email" value={this.state.email} onChange={this.handleChange} disabled/>
                                        </div>                        
                                    </div>
                                    <div class="row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="email" className="label">first Name</label>
                                            <input type="text" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Your Firstname"
                                                name="firstname" value={this.state.firstname} onChange={this.handleChange}/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="lastname" className="label">Last Name</label>
                                            <input type="text" className="form-control" id="lastname" aria-describedby="emailHelp" placeholder="Your Lastname"
                                                name="lastname" value={this.state.lastname} onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="image" className="label">Profile Image</label>
                                            <input type="file" className="form-control" id="image" aria-describedby="emailHelp"
                                                name="image" onChange={this.handleFileChange}/>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-md btn-primary next-buttons">Update</button> 
                                </form>
                            </div>
                        </div>
                        <hr className="line-break-line" />

                        <div className="update-profile-classDetails row">
                            <div className="update-profile-left-session col-md-5">
                                <h3> Society Details </h3>
                                <p>Here you can update your society details.<br />
                                 If you think that your society details are not correct then please contact respective society and tell them to update their rocoed.

                                </p>
                            </div>
                            <div className="col-md-7">
                                <form onSubmit={this.handleSocietyDetailsUpdate}>
                                    <div class="row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="society" className="label">Society Name</label>
                                            <input type="text" className="form-control" id="Society" aria-describedby="emailHelp" placeholder="Your Society Name"
                                                name="society" value={this.state.society.toUpperCase()} onChange={this.handleChange} disabled/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="societyrole" className="label">Role</label>
                                            <input type="text" className="form-control" id="societyrole" aria-describedby="emailHelp" placeholder="Your role in the society"
                                                name="societyrole" value={this.state.societyrole.toUpperCase()} onChange={this.handleChange} disabled/>
                                        </div>
                                    </div>
                                    {
                                        ( this.state.role === "student" && this.state.societyrole !== "faculty" ) &&
                                        <div>
                                            <div class="row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="specificrole" className="label">Specific Role</label>
                                                    <input type="text" className="form-control" id="specificrole" aria-describedby="emailHelp" placeholder="Your specific role"
                                                        name="specificrole" value={this.state.specificrole} onChange={this.handleChange} />
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-md btn-primary next-buttons">Update</button> 
                                        </div>   
                                    }
                        
                                
                                </form>
                            </div>
                        </div>
                        <hr className="line-break-line" />
                        {
                            this.state.role === "student" && (
                                <div className="update-profile-classDetails row">
                                    <div className="update-profile-left-session col-md-5">
                                        <h3> Class Details </h3>
                                        <p>Here you can update your class details.</p>
                                    </div>
                                    <div className="col-md-7">
                                    <form onSubmit={this.handleUpdateClassDetails}>
                                        <div>
                                            <div className="row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="currentyear" className="label">Current Year of Study</label>
                                                    <select className="form-control" id="currentyear" name="currentyear" onChange={this.handleChange} value={this.state.currentyear}>
                                                        <option value="1">FE</option>
                                                        <option value="2">SE</option>
                                                        <option value="3">TE</option>
                                                        <option value="4">BE</option>
                                                    </select>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="department" className="label">Department</label>
                                                    <select className="form-control" id="department" name="department" onChange={this.handleChange} value={this.state.department} >
                                                        <option value="cmpn">CMPN</option>
                                                        <option value="it">IT</option>
                                                        <option value="extc">EXTC</option>
                                                    </select>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="semester"  className="label">Semester</label>
                                                    <div className="password">
                                                        <input type="number" className="form-control" id="semester" aria-describedby="emailHelp"  placeholder="Enter Your Current Semester"
                                                            name="semester" value={this.state.semester} onChange={this.handleChange}/>
                                                        </div>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="label" htmlFor="classname">Class</label>
                                                    <select className="form-control" id="classname" name="class" onChange={this.handleChange} value={this.state.class}>
                                                        <option value="d12c">D12C</option>
                                                        <option value="d7c">D7C</option>
                                                        <option value="d2c">D2C</option>
                                                        <option value="d19c">D19C</option>
                                                        <option value="d15c">D15C</option>
                                                    </select>
                                                </div>
                                                    <div className="form-group col-md-6">
                                                    <label htmlFor="rollno"  className="label">Roll No</label>
                                                    <input type="number" className="form-control" id="rollno" aria-describedby="emailHelp" placeholder="Enter your Roll No"
                                                            name="rollno" value={this.state.rollno} onChange={this.handleChange} />
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-md btn-primary next-buttons">Update</button> 
                                        </div>
                                    </form>
                                    </div>
                            </div>
                            )
                        }
                        </div>
                </div>
            )
        }
     }
}

const mapStateToProps = (state) => ({
    currentUser : state.currentUser
})

export default withRouter(connect( mapStateToProps , { updateUserProfileData , updateUserSocietyDetails , updateUserClassDetails } )(EditProfile));