import React, { Component } from 'react';
import { Link } from "react-router-dom";

class UserpageHeader extends Component{


    render(){
        let username , img , societyname , societyimg , societyrole , classname , rollno , branch, email ,year , registeredevents;
        if(this.props.data.isAuthenticated && Object.keys(this.props.data.user).length > 0){
            let  { user } = this.props.data;
            username = user.username;
            img = user.imgurl.dataurl;
            email = user.email
            branch = user.classdetails.department.toUpperCase();
            classname = user.classdetails.class.toUpperCase();
            rollno = user.classdetails.rollno;
            if(user.classdetails.currentyearofstudy === 1){
                year = "F.E.";
            }else if(user.classdetails.currentyearofstudy === 2){
                year = "S.E.";
            }else if(user.classdetails.currentyearofstudy === 3){
                year = "T.E.";
            }else{
                year = "B.E.";
            }
            if(Object.keys(user.societydetails).length > 0){
                societyname = user.societydetails.name;
                societyrole = user.societydetails.role;
            }

            if(Object.keys(user.societydetails).length > 0){
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

            // registeredevents = user.registeredevents.length;
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
                                { email } , { branch + ", " + year + " " + classname + "-" + rollno }
                            </p>
                            <div className="faculty-and-society-incharge-session d-flex justify-content-center align-items-center">
                                <div className="d-flex flex-row">
                                    <Link className="profile-to-society-link" to={ `/society/${societyname}` }>
                                        <div className="total-members-and-total-events-session d-flex align-items-center">
                                            <div>
                                                <img src={ `/images/${societyimg}` } alt="user-profile-img"/>
                                            </div>
                                            <p className="incharge-name"> { societyname.toUpperCase() + ", " +  societyrole.toUpperCase()  } </p>
                                        </div>
                                    </Link>

                                    <div className="total-members-and-total-events-session d-flex align-items-center">
                                        <button className="btn btn-lg society-page-see-all-members-button">
                                            <i class="far fa-calendar-check"></i>
                                            <span>{ 5 } registrations </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
        )
    }
}


export default UserpageHeader;