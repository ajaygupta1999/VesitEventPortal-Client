import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { showSearchModal } from "../../stores/actions/society";
import { connect } from "react-redux";


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
            <div className="container society-header-session d-flex justify-content-center">
                <div className="d-flex flex-column">
                    <div className="d-flex justify-content-center">
                       <img className="society-page-society-icon" src={ `/images/${imgurl}` } alt="society-image" />
                    </div>
                    <p class="society-page-society-name"> { Object.keys(this.props.data).length > 0 ? this.props.data.name.toUpperCase() : null } VESIT</p>
                    <button className="btn btn-lg society-page-see-all-members-button" onClick={this.handleClick}>
                        <i class="fas fa-users"></i>
                        <span>{ totalMembers } Members (See All)</span>
                    </button>
                </div>
            </div>  
        )
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    showSearchModal
} , dispatch);


export default connect( null , mapDispatchToProps )(SocietyHeader);