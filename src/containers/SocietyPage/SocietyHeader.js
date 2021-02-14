import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { showSearchModal } from "../../stores/actions/society";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class SocietyHeader extends Component{
   
    handleClick = () => {
        this.props.showSearchModal();
    }

    getMembersLength = (data) => {
        let totalLength = 0;
        if(Object.keys(data).length > 0){
            totalLength = data.normal_members.length + data.council_members.length + data.council_heads.length;
            if(data.faculty){
                if(Object.keys(data.faculty) > 0){
                    totalLength++;
                }
            }
        }
        
        return totalLength;
    }

    render(){
        let totalMembers = this.getMembersLength(this.props.data);
        let imgurl = "";
        if(Object.keys(this.props.data).length > 0){
            if(this.props.data.name === "ieee"){
                imgurl = "ieee_logo.jpg";
            }
            if(this.props.data.name === "iste"){
                imgurl = "iste_logo.jpg";
            }
            if(this.props.data.name === "isa"){
                imgurl = "isa_logo.gif";
            }
            if(this.props.data.name === "csi"){
                imgurl = "csi_logo.jpg";
            }
        }

        return(
            <div className="society-header-session d-flex justify-content-center">
                <div className="d-flex flex-column">
                    <img className="cover-img-of-society" src="/images/cover_image.jpg" alt="coverimage" />
                    <div className="d-flex justify-content-center">
                       <img className="society-page-society-icon" src={ `/images/${imgurl}` } alt="society-image" />
                    </div>
                    <div className="society-contents-div">
                        <p className="society-page-society-name"> { Object.keys(this.props.data).length > 0 ? this.props.data.name.toUpperCase() : null } VESIT</p>
                        <p className="society-description">Student chapter of Indian Society for Technical Education,
                            ISTE aims at developing not only technical temperament of budding engineers but also overall personality, reasoning and presentation skills.</p>
                        <div className="faculty-and-society-incharge-session d-flex justify-content-center align-items-center">
                            <div className="d-flex flex-column">
                                <Link to="/user/profile/:id">
                                    <div className="d-flex flex-row">
                                        <div>
                                            <img className="society-incharge-and-chairperson-image" src="/images/user-img1.jpg" alt="user-profile-img"/>
                                        </div>
                                        <div className="d-flex flex-column">
                                            <p className="incharge-name">Ajay Gupta</p>
                                            <p className="role-of-person">Faculty Incharge</p>
                                        </div>
                                    </div> 
                                </Link>
                            </div>
                            <div className="d-flex flex-column">
                                <Link to="/user/profile/:id">
                                    <div className="d-flex flex-row">
                                        <div>
                                            <img className="society-incharge-and-chairperson-image" src="/images/user-img1.jpg" alt="user-profile-img"/>
                                        </div>
                                        <div className="d-flex flex-column">
                                            <p className="incharge-name">Hritwik Ekade</p>
                                            <p className="role-of-person">Society Chairperson</p>
                                        </div>
                                    </div> 
                                </Link>
                            </div>
                        </div>
                        <div className="setting-button-div">
                            <Link to={ `/society/${this.props.data.name}/edit/society/${this.props.data._id}` } className="btn btn-md btn-primary settings-button">
                                <i class="fas fa-cog"></i>
                                <span>Settings</span>
                            </Link>
                        </div>
                        <div className="faculty-and-society-incharge-session members-and-event-session d-flex justify-content-center align-items-center">
                            <div className="all-members-div">
                                <a className="btn btn-lg society-page-see-all-members-button" onClick={this.handleClick}>
                                    <img className="event-and-members-images" src="/images/membersicon.png"  alt="members-icon" />
                                    <p className="members-and-event-number">{ totalMembers }</p>
                                    <p className="property-of-above"> Members</p>
                                </a>
                            </div>
                            <div className="all-events-div">
                                <a className="btn btn-lg society-page-see-all-members-button">
                                    <img className="event-and-members-images" src="/images/smalleventicon.png"  alt="members-icon" />
                                    <p className="members-and-event-number">{ Object.keys(this.props.data).length > 0 ? this.props.data.events.length : 0 }</p>
                                    <p className="property-of-above"> Events </p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        )
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    showSearchModal
} , dispatch);


export default connect( null , mapDispatchToProps )(SocietyHeader);