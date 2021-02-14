import React, { Component } from 'react';
import { Link ,withRouter } from "react-router-dom";
import "../../asserts/css/UserProfile.scss";
 
class UserpageHeader extends Component{

    componentDidMount = () => {

    }

    render(){
        let username = "";
        let img = "";
        let societyname = "";
        let societyimg = "";
        let societyrole ="";
        let specificrole = "";
        let classname= "";
        let rollno = 0;
        let branch = "";
        let email = "";
        let year = 0;
        if(Object.keys(this.props.user).length > 0){
            let user = this.props.user;
            username = user.username;
            if(user.imgurl){
                img = user.imgurl.dataurl;
            }else{
                img = "/images/profile_image.png";
            }
            
            email = user.email;
            branch = user.classdetails ? user.classdetails.department.toUpperCase() : "";
            classname = user.classdetails ? user.classdetails.class.toUpperCase() : "";
            rollno = user.classdetails ? user.classdetails.rollno : 0;
            if(user.classdetails){
                if(user.classdetails.currentyearofstudy === 1){
                    year = "F.E.";
                }else if(user.classdetails.currentyearofstudy === 2){
                    year = "S.E.";
                }else if(user.classdetails.currentyearofstudy === 3){
                    year = "T.E.";
                }else{
                    year = "B.E.";
                }
            }
            
            if(Object.keys(user.societydetails).length > 0){
                societyname = user.societydetails.name;
                societyrole = user.societydetails.role;
                specificrole = user.societydetails ? ( user.societydetails.specificrole ? user.societydetails.specificrole : ""  ) : "";
                if(user.societydetails.name === "ieee"){
                    societyimg = "ieee_logo.jpg";
                }
                if(user.societydetails.name === "iste"){
                    societyimg = "iste_logo.jpg";
                }
                if(user.societydetails.name === "isa"){
                    societyimg = "isa_logo.gif";
                }
                if(user.societydetails.name === "csi"){
                    societyimg = "csi_logo.jpg";
                }
            }
        }
       

        return(
                <div className="society-header-session">
                    <div className="d-flex flex-column">
                        <img className="cover-img-of-society" src="/images/cover_image.jpg" alt="coverimage" />
                        <div className="d-flex justify-content-center">
                        <img className="society-page-society-icon" src={ img } alt="User-image" />
                        </div>
                        <div className="society-contents-div">
                            <p className="society-page-society-name"> { username } </p>
                            <p className="society-description"><i class="far fa-envelope"></i>
                               <span id="email-of-user"> { email } </span> , { branch + ", " + year + " " + classname + "-" + rollno }
                            </p>
                            {
                               ( Object.keys(this.props.user).length > 0 && Object.keys(this.props.currentUser.user).length > 0 ) &&
                                    ( this.props.user._id.toString() === this.props.currentUser.user._id.toString() ) &&
                                        <div className="setting-button-div">
                                            <Link to={ `/user/${this.props.currentUser.user._id}/edit/profile` } className="btn btn-md btn-primary settings-button">
                                                <i class="fas fa-cog"></i>
                                                <span>Settings</span>
                                            </Link>
                                        </div>
                            }
                            <div className="faculty-and-society-incharge-session members-and-event-session d-flex justify-content-center align-items-center">
                                <div className="all-members-div current-position-in-society">
                                    <a className="btn btn-lg society-page-see-all-members-button" onClick={this.handleClick}>
                                        <img className="event-and-members-images" src={ `/images/${societyimg}` } alt="user-profile-img"/>
                                        <p className="members-and-event-number">{ societyname.toUpperCase() + " VESIT" }</p>
                                        <p className="property-of-above"> { societyrole.toUpperCase() } </p>
                                    </a>
                                </div>
                                <div className="all-events-div">
                                    <a className="btn btn-lg society-page-see-all-members-button">
                                        <img className="event-and-members-images" src="/images/smalleventicon.png"  alt="members-icon" />
                                        <p className="members-and-event-number">{ this.props.totalreg }</p>
                                        <p className="property-of-above">  Registrations </p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
        )
    }
}


export default withRouter(UserpageHeader);