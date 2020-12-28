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
            totalLength = data.normal_member.length + data.council_members.length + data.council_head.length;
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
                                            <img src="/images/user-img1.jpg" alt="user-profile-img"/>
                                        </div>
                                        <div className="d-flex flex-column">
                                            <p className="incharge-name">Ajay Gupta</p>
                                            <p className="role-of-person">Faculty Incharge</p>
                                        </div>
                                    </div> 
                                </Link>
                                <div className="total-members-and-total-events-session d-flex justify-content-end">
                                    <button className="btn btn-lg society-page-see-all-members-button" onClick={this.handleClick}>
                                        <i className="fas fa-users"></i>
                                        <span>{ totalMembers } Members (See All)</span>
                                    </button>
                                </div>
                            </div>
                            <div className="d-flex flex-column">
                                <Link to="/user/profile/:id">
                                    <div className="d-flex flex-row">
                                        <div>
                                            <img src="/images/user-img1.jpg" alt="user-profile-img"/>
                                        </div>
                                        <div className="d-flex flex-column">
                                            <p className="incharge-name">Hritwik Ekade</p>
                                            <p className="role-of-person">Society Chairperson</p>
                                        </div>
                                    </div> 
                                </Link>
                                <div className="total-members-and-total-events-session d-flex justify-content-start">
                                    <button className="btn btn-lg society-page-see-all-members-button" onClick={this.handleClick}>
                                        <i class="far fa-calendar-check"></i>
                                        <span>{ Object.keys(this.props.data).length > 0 ? this.props.data.events.length : 0 } Events</span>
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

const mapDispatchToProps = (dispatch) => bindActionCreators({
    showSearchModal
} , dispatch);


export default connect( null , mapDispatchToProps )(SocietyHeader);