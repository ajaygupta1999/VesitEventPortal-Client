import React, { Component } from 'react';
import Modal from "./Modal";
import "../../asserts/css/SearchModal.scss";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { hideAddEventtakerModal } from "../../stores/actions/events";
import Spinner from "react-bootstrap/Spinner";
import 'bootstrap/dist/css/bootstrap.min.css';



class AddEventtakerModal extends Component{

    constructor(props){
        super(props);
        this.state = {
            searchtext : "",
            filters : [],
            users : [],
            guests : [],
            eventtakers : [],
            selectedeventtakers : []
        }
    }

    componentDidMount = () => {
        this.setState({
            ...this.state,
            users : this.props.users,
            guests  : this.props.guests,
            eventtakers : this.props.eventtakers,
            selectedeventtakers : this.props.selectedeventtakers
        });
    }

    componentDidUpdate = (prevProps , prevState) => {
        if(JSON.stringify(prevProps.selectedeventtakers) !== JSON.stringify(this.props.selectedeventtakers)){
            this.setState({
               ...this.state,
               selectedeventtakers : this.props.selectedeventtakers
               
           });
        }

        if((JSON.stringify(prevProps.users) !== JSON.stringify(this.props.users)) 
            || (JSON.stringify(prevProps.guests) !== JSON.stringify(this.props.guests)) 
            || (JSON.stringify(prevProps.eventtakers) !== JSON.stringify(this.props.eventtakers))
        ){
            this.setState({
                ...this.state,
                users : this.props.users,
                guests  : this.props.guests,
                eventtakers : this.props.eventtakers,
                selectedguests : this.props.selectedguests
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

    handleAddEventtakerModalClose = () => {
        this.props.hideAddEventtakerModal();
    }


    handleAddEventtaker = (obj) => {
       let dataArr = [];
        dataArr = dataArr.concat(this.state.users);
        dataArr = dataArr.concat(this.state.guests);
        dataArr = dataArr.concat(this.state.eventtakers);
        let isEventtakerAlreadyAdded = false;
        this.state.selectedeventtakers.forEach(member => {
            if(member._id.toString() === obj.key.toString()){
                isEventtakerAlreadyAdded = true;
            }
        });
        
        if(!isEventtakerAlreadyAdded){
           this.props.handleSelectedPerson(obj);
        }
    }

    handleRemoveEventtaker = (obj) => {
        this.props.handleRemoveSelectedPerson(obj);
     }
   

    render(){
         
         let isFetching = this.props.isFetching;
         let rowdata = [];
         rowdata = rowdata.concat(this.state.users);
         rowdata = rowdata.concat(this.state.guests);
         rowdata = rowdata.concat(this.state.eventtakers);
         
         let filtereData = [];
         if(this.state.filters.length > 0){
             for(let i = 0 ; i < this.state.filters.length ; i++){
                 for(let j = 0 ; j < this.state.users.length ; j++){
                    if(this.state.users[j].societydetails.role ===  this.state.filters[i]){
                        filtereData.push(this.state.users[j]);
                    }
                 }

                 for(let k = 0 ; k < this.state.guests.length ; k++){
                    if(this.state.guests[k].roletype ===  this.state.filters[i]){
                        filtereData.push(this.state.guests[k]);
                    }
                 } 

                 for(let p = 0 ; p < this.state.eventtakers.length ; p++){
                    if(this.state.eventtakers[p].roletype ===  this.state.filters[i]){
                        filtereData.push(this.state.eventtakers[p]);
                    }
                 } 
             }
         }else{
             filtereData = rowdata;
         }

         if(this.state.searchtext !== ""){
            let matches = filtereData.filter(state => {
                const regex = new RegExp(this.state.searchtext.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'gi');
                console.log(regex);
                if(!state.username){
                    if(state.roletype === "eventtaker"){
                        if(state.role === "outsideperson"){
                            return state.details.outsideperson.name.match(regex);
                        }

                        if(state.role === "faculty"){
                            return state.details.faculty.name.match(regex);
                        }

                        if(state.role === "others"){
                            return state.details.others.name.match(regex);
                        }
                    }

                    if(state.roletype === "guest"){
                        if(state.role === "outsideperson"){
                            return state.details.outsideperson.name.match(regex);
                        }

                        if(state.role === "faculty"){
                            return state.details.faculty.name.match(regex);
                        }

                        if(state.role === "others"){
                            return state.details.others.name.match(regex);
                        }
                    }
                }
                return state.username.match(regex);
            });
            filtereData = matches;
         }


        return(
            
            <Modal className="book-a-call-modal" hideModal={this.handleAddEventtakerModalClose}>
                <h5 className="text-center search-modal-heading">Add Eventtaker</h5>
                <div className="row">
                    <div className="col-12">
                        <form className="search-members-form">
                            <div className="form-group">
                            <i className="fas fa-search"></i>
                                <input type="text" onChange={this.handleChange}  
                                   className="form-control" value={this.state.searchtext} id="exampleFormControlInput1" placeholder="Search peoples by username" />
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
                            <button className="btn btn-md btn-primary" value="guest" onClick={this.handleInputClick}>
                                previous guests
                            </button>
                            <button className="btn btn-md btn-primary" value="eventtaker" onClick={this.handleInputClick}>
                                Event-Takers
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
                        isFetching &&
                            <div className="spinner-div text-center">
                                <Spinner className="custom-modal-spinner" animation="border"/>
                            </div>

                    }
                
                    {
                        this.state.selectedeventtakers.length > 0 && 
                        <div className="added-guest-details">  
                        {
                            this.state.selectedeventtakers.map(member => {
                               if(member.email){
                                   return (
                                      <div className="each-div-of-each-guest">
                                        <div className="each-guest d-flex justify-content-start align-items-center">
                                            <div className="guest-img-session">
                                                <img src={ member.imgurl ? member.imgurl.dataurl : "/images/profile_image.png" } />
                                            </div>
                                            <div className="guest-details d-flex flex-column">
                                                <h5>{ member.username }</h5>
                                                <p>{ member.email } </p>
                                            </div>
                                            <span onClick={() => {
                                                    this.handleRemoveEventtaker({
                                                        target :  "eventtaker",
                                                        roletype : "user",
                                                        role : "user",
                                                        key : member._id
                                                    })
                                                }}>
                                              <i class="far fa-times-circle"></i>
                                            </span>
                                        </div>
                                        </div>
                                   )
                               }else {
                                    return (
                                      <div className="each-div-of-each-guest">
                                            <div className="each-guest d-flex justify-content-start align-items-center">
                                                <div className="guest-img-session">
                                                    <img src="/images/profile_image.png" />
                                                </div>
                                                <div className="guest-details d-flex flex-column">
                                                    <h5>
                                                        {
                                                           member.role === "outsideperson" ? member.details.outsideperson.name : 
                                                            (
                                                                member.role === "faculty" ? member.details.faculty.name : member.details.others.name
                                                            )
                                                        }
                                                    </h5>
                                                </div>
                                                <span onClick={() => {
                                                    this.handleRemoveEventtaker({
                                                        target :  "eventtaker",
                                                        roletype : member.roletype,
                                                        role : member.role,
                                                        key : member._id
                                                    })
                                                }}>
                                                   <i class="far fa-times-circle"></i>
                                                </span>
                                            </div>
                                        </div>
                                    )
                               }
                           })
                        }   
                      </div>
                    }
                    <div className="col-12">
                        <div className="searched-content">
                            <div className="row">
                                {
                                    filtereData.map(member => (
                                            <div className="col-12">
                                                {
                                                     member.email && 
                                                     <div className="each-search-content row">
                                                        <div className="serached-profile-content col-12 col-md-8 d-flex justify-content-center justify-content-md-start  align-items-center">
                                                            <div className="searched-content-img-session">
                                                                <img src={ member.imgurl ? member.imgurl.dataurl : "/images/profile_image.png" } alt="user-image" />
                                                            </div>
                                                            <div className="searched-content-user-details">
                                                                <p className="Searched-content-username">{ member.username }</p>
                                                                {
                                                                   member.societydetails ? 
                                                                   <p> { member.societydetails.name.toUpperCase() }, { member.societydetails.role.toUpperCase() }</p> : null
                                                                }
                                                                {
                                                                    member.classdetails ? 
                                                                    <p><span>{ member.classdetails.department.toUpperCase() }</span> - <span>{member.classdetails.class.toUpperCase()},</span> { member.classdetails.rollno }</p> : null
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="view-profile-button col-12 col-md-4 d-flex justify-content-center align-items-center">
                                                            <button className="btn btn-md btn-primary" onClick={() => {
                                                                 this.handleAddEventtaker({
                                                                    target :  "eventtaker",
                                                                    roletype : "user",
                                                                    role : "user",
                                                                    key : member._id
                                                                 })
                                                                }} >    
                                                               Add
                                                            </button>
                                                        </div>
                                                     </div>
                                                }
                                                {
                                                    ( member.roletype && member.details.others) && ( 
                                                        <div className="each-search-content row">
                                                            <div className="serached-profile-content col-12 col-md-8 d-flex justify-content-center justify-content-md-start  align-items-center">
                                                                <div className="searched-content-img-session">
                                                                    <img src="/images/profile_image.png" alt="user-image" />
                                                                </div>
                                                                <div className="searched-content-user-details">
                                                                <p className="Searched-content-username">{ member.details.others.name }</p>
                                                                        <p> { member.details.others.currentyear === 1 ? "FE" : (
                                                                                member.details.others.currentyear === 2 ? "SE" : (
                                                                                member.details.others.currentyear === 3 ? "TE" : "BE"
                                                                                )
                                                                        ) }, 
                                                                        { member.details.others.branch.toUpperCase() } - 
                                                                        { member.details.others.class.toUpperCase() }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="view-profile-button col-12 col-md-4 d-flex justify-content-center align-items-center">
                                                                <button className="btn btn-md btn-primary" onClick={() => {
                                                                 this.handleAddEventtaker({
                                                                    target :  "eventtaker",
                                                                    roletype : member.roletype,
                                                                    role : "others",
                                                                    key : member._id
                                                                 })
                                                                }}>    
                                                                    Add 
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )
                                                } 
                                                {   
                                                    ( member.roletype && ( member.details.outsideperson || member.details.faculty )) &&
                                                      (
                                                        <div className="each-search-content row">
                                                            <div className="serached-profile-content col-12 col-md-8 d-flex justify-content-center justify-content-md-start  align-items-center">
                                                                <div className="searched-content-img-session">
                                                                    <img src="/images/profile_image.png" alt="user-image" />
                                                                </div>
                                                                <div className="searched-content-user-details"> 
                                                                    <p className="Searched-content-username">
                                                                        { 
                                                                            member.roletype === "guest" ? (
                                                                                // Guest type
                                                                                member.role === "outsideperson" ? member.details.outsideperson.name : member.details.faculty.name
                                                                            ) : (
                                                                                // Event taker type
                                                                                member.role === "faculty" ? member.details.faculty.name : member.details.outsideperson.name
                                                                            )
                                                                        }
                                                                    </p>
                                                                    <p> 
                                                                        {
                                                                            member.roletype === "guest" ? (
                                                                                // Guest Type
                                                                                member.role === "outsideperson" ? member.details.outsideperson.profession : member.details.faculty.profession
                                                                            ) : ( 
                                                                                // Eventtaker Type
                                                                                member.role === "outsideperson" ? member.details.outsideperson.profession : member.details.faculty.profession 
                                                                            ) 
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="view-profile-button col-12 col-md-4 d-flex justify-content-center align-items-center">
                                                                <button className="btn btn-md btn-primary" onClick={() => {
                                                                   this.handleAddEventtaker({
                                                                    target :  "eventtaker",
                                                                    roletype : member.roletype, 
                                                                    role : member.role,
                                                                    key : member._id
                                                                   })
                                                                }}>    
                                                                     Add
                                                                </button>
                                                            </div>
                                                        </div>
                                                     )
                                                }
                                                
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
    createdEvent : state.createdEvent
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    hideAddEventtakerModal,
} , dispatch)

export default connect(mapStateToProps , mapDispatchToProps)(AddEventtakerModal); 