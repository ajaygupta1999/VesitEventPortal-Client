import React, { Component } from 'react';
import Modal from "./Modal";
import "../../asserts/css/SearchModal.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { hideSearchModal } from "../../stores/actions/society";
import Spinner from "react-bootstrap/Spinner";
import 'bootstrap/dist/css/bootstrap.min.css'; 





class SearchModal extends Component{

    constructor(props){
        super(props);
        this.state = {
            searchtext : "",
            filters : [],
            council_heads : [],
            council_members : [],
            normal_members : [],
            faculty : []
        }
    }

    componentDidMount = async () => {
        if(Object.keys(this.props.society.data).length > 0){
            const normal_members = this.props.society.normal_members.map(member => {
                return { societyrole : "normal-member" , ...member }
            });
            
            const council_members = this.props.society.council_members.map(member => {
                return {  societyrole : "council-member" , ...member }
            });

            const council_heads = this.props.society.council_heads.map(member => {
                return { societyrole : "council-head" , ...member }
            });

            const faculty = {
                ...this.props.society.faculty,
                societyrole : "faculty"
            }

            this.setState({
                ...this.state,
                normal_members,
                council_heads,
                council_members,
                faculty
            });
        }
    }


    componentDidUpdate =  (prevProps , prevState) => {
        if(JSON.stringify(this.props.society) !== JSON.stringify(prevProps.society)){
            const normal_members = this.props.society.normal_members.map(member => {
                return { societyrole : "normal-member" , ...member }
            });
            
            const council_members = this.props.society.council_members.map(member => {
                return {  societyrole : "council-member" , ...member }
            });

            const council_heads = this.props.society.council_heads.map(member => {
                return { societyrole : "council-head" , ...member }
            });

            const faculty = {
                ...this.props.society.faculty,
                societyrole : "faculty"
            }

            this.setState({
                ...this.state,
                normal_members,
                council_heads,
                council_members,
                faculty
            });
        } 
    }

   
    handleInputClick = (e) => {
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

        console.log("IsFetching ==> " , this.props.isFetching);
        let filtereData = [];
        if(this.state.filters.length > 0){
            for(let p = 0 ; p < this.state.filters.length ; p++){
                if(this.state.filters[p] === "council-head"){
                    for(let t = 0 ; t < this.state.council_heads.length ; t++){
                        filtereData.push(this.state.council_heads[t]);
                    }
                }
                if(this.state.filters[p] === "normal-member"){
                    for(let q = 0 ; q < this.state.normal_members.length ; q++){
                        filtereData.push(this.state.normal_members[q]);
                    }
                }
                if(this.state.filters[p] === "council-member"){
                    for(let r = 0 ; r < this.state.council_members.length ; r++){
                        filtereData.push(this.state.council_members[r]);
                    }
                }
                if(this.state.filters[p] === "faculty"){
                     filtereData.push(this.state.faculty);
                }
            }
        }else{
            for(let t = 0 ; t < this.state.council_heads.length ; t++){
                filtereData.push(this.state.council_heads[t]);
            }

            for(let q = 0 ; q < this.state.normal_members.length ; q++){
                filtereData.push(this.state.normal_members[q]);
            }

            for(let r = 0 ; r < this.state.council_members.length ; r++){
                filtereData.push(this.state.council_members[r]);
            }

            for(let d = 0; d < this.state.faculty.length; d++){
                filtereData.push(this.state.faculty);
            }
        }

        if(this.state.searchtext !== ""){
            let matches = filtereData.filter(state => {
                const regex = new RegExp(this.state.searchtext.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'gi');
                return state.email.match(regex);
            });
            filtereData = matches;
        }

        return(
            
            <Modal className="book-a-call-modal" hideModal={this.handleSearchModalClose}>
                <h5 className="text-center search-modal-heading">Search Members</h5>
                <div className="row">
                    <div className="col-12">
                        <form className="search-members-form">
                            <div className="form-group">
                            <i className="fas fa-search"></i>
                                <input type="email" onChange={this.handleChange}  
                                   className="form-control" value={this.state.searchtext} id="exampleFormControlInput1" placeholder="Search members by email address." />
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
                            <button className="btn btn-md btn-primary" value="council-member" onClick={this.handleInputClick}>
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

                    {
                        this.props.isFetching &&
                            <div className="spinner-div text-center">
                                <Spinner className="custom-modal-spinner" animation="border"/>
                            </div>
                    }

                    <div className="col-12">
                        <div className="searched-content">
                            <div className="row">
                            {
                                filtereData.map(member => (
                                    member.username ? (
                                           <div className="col-12">
                                                <div className="each-search-content row">
                                                    <div className="serached-profile-content col-12 col-md-8 d-flex justify-content-start  align-items-center">
                                                        <div className="searched-content-img-session">
                                                            <img src={ member.imgurl ? member.imgurl.dataurl : "/images/profile_image.png" } alt="user-image" />
                                                        </div>
                                                        <div className="searched-content-user-details">
                                                            <p className="Searched-content-username">{ member.username }</p>
                                                            {
                                                                member.societydetails && 
                                                                  <p> { member.societydetails.name.toUpperCase() }, { member.societydetails.role }</p>
                                                            }
                                                            {
                                                                member.classdetails && 
                                                                 <p><span>{ member.classdetails.department.toUpperCase() }</span> - <span>{member.classdetails.class.toUpperCase()},</span> { member.classdetails.rollno }</p>
                                                            }
                                                            <Link to={ `/user/${ member._id }/profile` } className="show-only-before-md">
                                                                View Profile
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="view-profile-button show-only-after-md col-12 col-md-4 d-flex justify-content-center align-items-center">
                                                        <button className="btn btn-md btn-primary">    
                                                            <Link to={ `/user/${ member._id }/profile` }>
                                                                View Profile
                                                            </Link>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                    ) : (
                                           <div className="col-12">
                                                <div className="each-search-content row">
                                                    <div className="serached-profile-content col-12 col-md-8 d-flex justify-content-start  align-items-center">
                                                        <div className="searched-content-img-session">
                                                            <img src="/images/profile_image.png" alt="user-image" />
                                                        </div>
                                                        <div className="searched-content-user-details">
                                                            <p className="Searched-content-username">{ member.email }</p>
                                                            {
                                                                <p> { member.societyrole }</p>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                       ) 
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



const mapDispatchToProps = (dispatch) => bindActionCreators({
    hideSearchModal
} , dispatch)

export default connect(null , mapDispatchToProps)(SearchModal); 