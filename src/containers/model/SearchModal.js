import React, { Component } from 'react';
import Modal from "./Modal";
import "../../asserts/css/SearchModal.scss";
import { Link } from "react-router-dom";
import { serchedData , getSocietyMembers } from "../../functions";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { hideSearchModal } from "../../stores/actions/society";
 
class SearchModal extends Component{

    constructor(props){
        super(props);
        console.log("I am from Construtor");
        this.state = {
            searchtext : "",
            filters : [],
            data : []
        }
    }
    
    componentDidMount = () => {
        let allMembers = this.getAllMembers();
        this.setState({
            ...this.state,
            data : allMembers
        });
    }


    getAllMembers = () => {
        let members_data = [];
        
        if(Object.keys(this.props.society.data).length > 0){
            const { normal_member , council_members , council_head  } = this.props.society.data;
            members_data = members_data.concat(normal_member);
            members_data = members_data.concat(council_head);
            members_data = members_data.concat(council_members);
            if(this.props.society.data.faculty){
                members_data.push(this.props.society.data.faculty);
            }
        }

        return members_data;
    }

   


    handleInputClick = (e) => {
        console.log(e.target.value);
        let inData = false;
        for(let i = 0 ; i < this.state.filters.length ; i++){
            if(e.target.value === this.state.filters[i]){
                inData = true;
                break;
            }
        }

        if(!inData){
            this.setState({
                ...this.state,
                filters : [...this.state.filters , e.target.value]
            });
        }
    }
 
    handleRemoveClick = (e) => {
        console.log(e.target.value);
        this.setState({
            ...this.state,
            filters : this.state.filters.filter(filter => filter !== e.target.value)
        });
    }

    handleChange = (e) => {
        this.setState({
            searchtext : e.target.value
        });
    }


    handleSearchModalClose = () => {
        this.props.hideSearchModal();
    }
   

    render(){
         let rowdata = this.state.data;
         let filtereData = [];
         if(this.state.filters.length > 0){
             this.state.filters.map(filter => (
                 this.state.data.map(data => {
                     if(data.societydetails.role === filter){
                         filtereData.push(data);
                     }
                 })
             ));
         }else{
             filtereData = rowdata;
         }

         if(this.state.searchtext !== ""){
            let matches = filtereData.filter(state => {
                const regex = new RegExp(this.state.searchtext.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'gi');
                console.log(regex);
                return state.username.match(regex) || state.email.match(regex);
            });
            filtereData = matches;
         }


        return(
            
            <Modal className="book-a-call-modal" hideSearchModal={this.handleSearchModalClose}>
                <h5 className="text-center search-modal-heading">Search Members</h5>
                <div className="row">
                    <div className="col-12">
                        <form className="search-members-form">
                            <div className="form-group">
                            <i className="fas fa-search"></i>
                                <input type="email" onChange={this.handleChange}  
                                   className="form-control" value={this.state.searchtext} id="exampleFormControlInput1" placeholder="Search members by username or email." />
                            </div>
                        </form>
                    </div>
                    <div className="modal-filter col-12">
                        <div className="filter-selector">
                            <button className="btn btn-md btn-primary" value="normal-member" onClick={this.handleInputClick}>
                                Normal Members
                            </button>
                            <button className="btn btn-md btn-primary" value="faculty" onClick={this.handleInputClick}>
                               faculty      
                            </button>
                            <button className="btn btn-md btn-primary" value="coucil-member" onClick={this.handleInputClick}>
                                Council Members
                            </button>
                            <button className="btn btn-md btn-primary" value="council-head" onClick={this.handleInputClick}>
                                Council Heads
                            </button>
                        </div>
                        <hr />
                        <div className="filter-selector">
                            {
                                this.state.filters.map(filter => (
                                    <button className="btn btn-md btn-primary selected-filter-buttons" value={filter} onClick={this.handleRemoveClick}>
                                      { filter } <i className="fas fa-times"></i>
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="searched-content">
                            <div className="row">
                                {
                                    filtereData.map(member => (
                                            <div className="col-12">
                                                <div className="each-search-content row">
                                                    <div className="serached-profile-content col-12 col-md-8 d-flex justify-content-center justify-content-md-start  align-items-center">
                                                        <div className="searched-content-img-session">
                                                            <img src={ member.imgurl.dataurl ? member.imgurl.dataurl : "/images/profile_image.png" } alt="user-image" />
                                                        </div>
                                                        <div className="searched-content-user-details">
                                                            <p className="Searched-content-username">{ member.username }</p>
                                                            <p> { member.societydetails.name.toUpperCase() }, { member.societydetails.role }</p>
                                                            <p><span>{ member.classdetails.department.toUpperCase() }</span> - <span>{member.classdetails.class.toUpperCase()},</span> { member.classdetails.rollno } <span>21</span></p>
                                                        </div>
                                                    </div>
                                                    <div className="view-profile-button col-12 col-md-4 d-flex justify-content-center align-items-center">
                                                        <button className="btn btn-md btn-primary">    
                                                            <Link to={ `/user/${member._id}/profile` }>
                                                                View Profile
                                                            </Link>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                         ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}


const mapStateToProps = ( state ) => ({
    society : state.society
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    hideSearchModal
} , dispatch)

export default connect(mapStateToProps , mapDispatchToProps)(SearchModal); 