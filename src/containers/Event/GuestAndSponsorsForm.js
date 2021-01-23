import React, { Component } from 'react';
import "../../asserts/css/Forms.scss";
import { setGuestAndSponsorsDetails } from "../../stores/actions/userRegisterDetails";
import { connect } from 'react-redux';
import Navbar from "../navbar";
import AddGuestModal from "../model/AddGuestModal";
import AddEventTakerModal from "../model/AddEventTakerModal";
import { showAddGuestModal , 
    showAddEventtakerModal , 
    handleAddSelectedPerson ,
    handleRemoveSelectedPerson , 
    handleAddPerson ,
    handleRemovePerson,
    handleAddSponsor,
    handleRemoveSponsor } from "../../stores/actions/events";
import { fetchAllUsers } from "../../stores/actions/userRegisterDetails";

   
class GuestAndSponsorsForm extends Component {
     constructor(props){
         super(props);
         this.state = {
            guestdetails : {
                selectedguests : [],
                addedguests : [],
                isguest : "true",
                guesttype : "outsideperson",
                outsideperson : {
                    name : "",
                    profession : "",
                },
                faculty : {
                    name : "",
                    profession : ""
                },
                others : {
                    name : "",
                    department : "cmpn",
                    currentyear : "3",
                    class : "d12c"
                }
            },
            eventtakerdetails : {
                selectedeventtakers : [],
                addedeventtakers : [],
                iseventtaker : "true",
                eventtakertype : "outsideperson",
                outsideperson : {
                    name : "",
                    profession : ""
                },
                faculty : {
                    name : "",
                    profession : ""
                },
                others : {
                    name : "",
                    department : "cmpn",
                    currentyear : "3",
                    class : "d12c"
                }
            },
            sponsorsdetails : {
                addedsponsors : [],
                issponsored : "true",
                details : {
                    name : "",
                    image : {},
                    details : ""
                }
            },
            usersdata : {
                guests : [],
                users : [],
                eventtakers : []
            }
         }
     }
     
  
     componentDidMount = async () => {
        
        let  { guests , eventtakers , users } = await this.getAllUsers();

        eventtakers.forEach(eventtaker => {
            eventtaker.roletype = "eventtaker";
        });

        guests.forEach(guest => {
            guest.roletype = "guest";
        });

        this.setState({
            ...this.state,
            usersdata : {
                guests,
                users,
                eventtakers
            }
        });
     }

     componentDidUpdate = (prevProps, prevState) => {
          if(JSON.stringify(prevProps.createdEvent.selectedguests) !== JSON.stringify(this.props.createdEvent.selectedguests)){
                this.setState({
                   ...this.state,
                   guestdetails : {
                       ...this.state.guestdetails,
                       selectedguests : this.props.createdEvent.selectedguests
                   }
               });
          }
          if(JSON.stringify(prevProps.createdEvent.selectedeventtakers) !== JSON.stringify(this.props.createdEvent.selectedeventtakers)){
                this.setState({
                    ...this.state,
                    eventtakerdetails : {
                        ...this.state.eventtakerdetails,
                        selectedeventtakers : this.props.createdEvent.selectedeventtakers
                    }
                });
          }
          if(JSON.stringify(prevProps.createdEvent.addedguests) !== JSON.stringify(this.props.createdEvent.addedguests)){
            this.setState({
                ...this.state,
                guestdetails : {
                    ...this.state.guestdetails,
                    addedguests : this.props.createdEvent.addedguests
                }
            });
          }
          if(JSON.stringify(prevProps.createdEvent.addedeventtakers) !== JSON.stringify(this.props.createdEvent.addedeventtakers)){
            this.setState({
                ...this.state,
                eventtakerdetails : {
                    ...this.state.eventtakerdetails,
                    addedeventtakers : this.props.createdEvent.addedeventtakers
                }
            });
          }
          if(JSON.stringify(prevProps.createdEvent.addedsponsors) !== JSON.stringify(this.props.createdEvent.addedsponsors)){
            this.setState({
                ...this.state,
                sponsorsdetails : {
                    ...this.state.sponsorsdetails,
                    addedsponsors : this.props.createdEvent.addedsponsors
                }
            });
          }
            
     }

     getAllUsers = async () => {
        let { allusers }  = await this.props.fetchAllUsers(this.props.currentUser.user.id);
        return allusers;
     }

    
    // Handling the guest which is their on our portal.
    handleSelectedPerson = async (obj) => {
        let dataArr = [];
        dataArr = dataArr.concat(this.state.usersdata.users);
        dataArr = dataArr.concat(this.state.usersdata.guests);
        dataArr = dataArr.concat(this.state.usersdata.eventtakers);
        let isPersonAlreadyPresent = false;
        if(obj.target === "guest"){
            this.state.guestdetails.selectedguests.forEach(member => {
                if(member._id.toString() === obj.key.toString()){
                    isPersonAlreadyPresent = true;
                }
            });
        }else{
            this.state.eventtakerdetails.selectedeventtakers.forEach(member => {
                if(member._id.toString() === obj.key.toString()){
                    isPersonAlreadyPresent = true;
                }
            });
        }
        
        if(!isPersonAlreadyPresent){
            dataArr.forEach(async (member) => {
                if(member._id.toString() === obj.key.toString()){
                    console.log("from function Guest selected clicked ===> " , obj);
                    await this.props.handleAddSelectedPerson(obj , this.props.currentUser.user.id , this.props.createdEvent.data.id);
                }
            });
        }
     }

     
     handleRemoveSelectedPerson = async (obj) => {
         console.log(obj);
         await this.props.handleRemoveSelectedPerson(obj , this.props.currentUser.user.id , this.props.createdEvent.data.id ); 
     }
     
   
     // Handle add guest (Data which is coming from guests form)
     handleSubmitAddGuest = async (e) => {
         e.preventDefault();
         console.log("form is submitted");
         let guesttype = this.state.guestdetails.guesttype;
         let dataobj = {};
         dataobj.target = "guest";
         dataobj.roletype = "guest";
         let resetobj = {};
         if(guesttype === "outsideperson"){
            dataobj.role = "outsideperson";
            dataobj.name = this.state.guestdetails.outsideperson.name;
            dataobj.profession = this.state.guestdetails.outsideperson.profession;
            resetobj.name = "";
            resetobj.profession = ""; 
         }
         if(guesttype === "faculty"){
            dataobj.role = "faculty";
            dataobj.name = this.state.guestdetails.faculty.name;
            dataobj.profession = this.state.guestdetails.faculty.profession;
            resetobj.name = "";
            resetobj.profession = ""; 
         }
         if(guesttype === "others"){
            dataobj.role = "others";
            dataobj.name = this.state.guestdetails.others.name;
            dataobj.class = this.state.guestdetails.others.class;
            dataobj.branch = this.state.guestdetails.others.department;
            dataobj.currentyear = this.state.guestdetails.others.currentyear;
            resetobj.name = "";
            resetobj.class = "";
            resetobj.department = "";
            resetobj.currentyear = ""; 
         }
         
         await this.props.handleAddPerson(dataobj , this.props.currentUser.user.id , this.props.createdEvent.data.id);
         
     }

     handleRemoveAddedGuests = async (obj) => {
        await this.props.handleRemovePerson(obj , this.props.currentUser.user.id , this.props.createdEvent.data.id );
        
     }

     // ========================================

    // Handle add Eventtakers (Data which is coming from eventtakers form)
    handleSubmitAddEventtaker = async (e) => {
        e.preventDefault();
        let eventtakertype = this.state.eventtakerdetails.eventtakertype;
        let dataobj = {};
        dataobj.target = "eventtaker";
        dataobj.roletype = "eventtaker";
        let resetobj = {};
        if(eventtakertype === "outsideperson"){
           dataobj.role = "outsideperson";
           dataobj.name = this.state.eventtakerdetails.outsideperson.name;
           dataobj.profession = this.state.eventtakerdetails.outsideperson.profession;
           resetobj.name = "";
           resetobj.profession = ""; 
        }
        if(eventtakertype === "faculty"){
           dataobj.role = "faculty";
           dataobj.name = this.state.eventtakerdetails.faculty.name;
           dataobj.profession = this.state.eventtakerdetails.faculty.profession;
           resetobj.name = "";
           resetobj.profession = ""; 
        }
        if(eventtakertype === "others"){
           dataobj.role = "others";
           dataobj.name = this.state.eventtakerdetails.others.name;
           dataobj.class = this.state.eventtakerdetails.others.class;
           dataobj.branch = this.state.eventtakerdetails.others.department;
           dataobj.currentyear = this.state.eventtakerdetails.others.currentyear;
           resetobj.name = "";
           resetobj.class = "";
           resetobj.department = "";
           resetobj.currentyear = ""; 
        }

        await this.props.handleAddPerson(dataobj , this.props.currentUser.user.id , this.props.createdEvent.data.id);
        
    }

    handleRemoveAddedEventtakers = async (obj) => {
        console.log(obj);
        await this.props.handleRemovePerson(obj , this.props.currentUser.user.id , this.props.createdEvent.data.id );
    }
    // ===========================================

    handleSubmitAddSponsor = async (e) => {
        e.preventDefault();
        console.log("sponsos form submitted");
        let dataobj = {
            target : "sponsor",
            roletype :  "sponsor",
            role : "sponsor",
            name : this.state.sponsorsdetails.details.name,
            image : this.state.sponsorsdetails.details.image,
            details : this.state.sponsorsdetails.details.details
        };
        console.log("sponsor form =>> " , dataobj);
        await this.props.handleAddSponsor(dataobj , this.props.currentUser.user.id , this.props.createdEvent.data.id);
    }

    handleRemoveSponsor = async (obj) => {
        console.log("Remove from component => ", obj);
        await this.props.handleRemoveSponsor(obj , this.props.currentUser.user.id , this.props.createdEvent.data.id );
    }
    // =======================================


    // ========================================
    handleChange = (e) => {
        // Handle all guest input change ====
        let splittedinput = e.target.name.split("_");
        if(splittedinput.length === 2 && splittedinput[0] === "eventtaker" && splittedinput[1] === "role"){
            this.setState({
                ...this.state,
                eventtakerdetails :  {
                    ...this.state.eventtakerdetails,
                    eventtakertype : e.target.value
                }
            })
            return;
        }

        if(splittedinput.length === 2 && splittedinput[0] === "guest" && splittedinput[1] === "role"){
            this.setState({
                ...this.state,
                guestdetails :  {
                    ...this.state.guestdetails,
                    guesttype : e.target.value
                }
            })
            return;
        }

        if(splittedinput.length === 2 && splittedinput[0] === "guest"){
            this.setState({
                ...this.state,
                guestdetails :  {
                    ...this.state.guestdetails,
                    isguest : e.target.value,
                    addedguests : e.target.value === "false" ? [] : [...this.state.guestdetails.addedguests]
                }
            })
            return;
        }

        if(splittedinput.length === 2 && splittedinput[0] === "eventtaker"){
            this.setState({
                ...this.state,
                eventtakerdetails :  {
                    ...this.state.eventtakerdetails,
                    iseventtaker : e.target.value,
                    addedeventtakers : e.target.value === "false" ? [] : [...this.state.eventtakerdetails.addedeventtakers]
                }
            })
            return;
        }

        if(splittedinput.length === 2 && splittedinput[0] === "sponsor"){
            this.setState({
                ...this.state,
                sponsorsdetails :  {
                    ...this.state.sponsorsdetails,
                    issponsored : e.target.value,
                    addedsponsors : e.target.value === "false" ? [] : [...this.state.sponsorsdetails.addedsponsors]
                }
            })
            return;
        }
       if(e.target.name === "guest_outsideperson_name" || e.target.name === "guest_outsideperson_profession" || 
          e.target.name === "guest_faculty_name" || e.target.name === "guest_faculty_profession" || 
          e.target.name ===  "guest_others_name" || e.target.name ===  "guest_others_class" || e.target.name ===  "guest_others_department" || e.target.name ===  "guest_others_currentyear")
          {
              if(splittedinput.length > 0 && splittedinput.length === 3){
                    if(splittedinput[1] === "outsideperson"){
                            this.setState({
                                ...this.state,
                                guestdetails : {
                                    ...this.state.guestdetails,
                                    outsideperson : {
                                        ...this.state.guestdetails.outsideperson,
                                        [splittedinput[2]] : e.target.value
                                    }
                                }
                            })
                            return;
                        }

                        if(splittedinput[1] === "faculty"){
                            this.setState({
                                ...this.state,
                                guestdetails : {
                                    ...this.state.guestdetails,
                                    faculty : {
                                        ...this.state.guestdetails.faculty,
                                        [splittedinput[2]] : e.target.value
                                    }
                                }
                            })
                            return;
                        }

                        if(splittedinput[1] === "others"){
                            this.setState({
                                ...this.state,
                                guestdetails : {
                                    ...this.state.guestdetails,
                                    others : {
                                        ...this.state.guestdetails.others,
                                        [splittedinput[2]] : e.target.value
                                    }
                                }
                            })
                            return;
                        }
                    }     
              }  
    
          // Handle all Eventtakers input change =============== 
        if(e.target.name === "eventtaker_outsideperson_name" || e.target.name === "eventtaker_outsideperson_profession" || 
          e.target.name === "eventtaker_faculty_name" || e.target.name === "eventtaker_faculty_profession" || 
          e.target.name ===  "eventtaker_others_name" || e.target.name ===  "eventtaker_others_class" || e.target.name ===  "eventtaker_others_department" || e.target.name ===  "eventtaker_others_currentyear")
          {
            if(splittedinput.length > 0 && splittedinput.length === 3){
                if(splittedinput[1] === this.state.eventtakerdetails.eventtakertype){
                    if(splittedinput[1] === "outsideperson"){
                        this.setState({
                            ...this.state,
                            eventtakerdetails : {
                                ...this.state.eventtakerdetails,
                                outsideperson : {
                                    ...this.state.eventtakerdetails.outsideperson,
                                    [splittedinput[2]] : e.target.value
                                }
                            }
                        })
                        return;
                    }

                    if(splittedinput[1] === "faculty"){
                        console.log("Event taker faculty ===>")
                        this.setState({
                            ...this.state,
                            eventtakerdetails : {
                                ...this.state.eventtakerdetails,
                                faculty : {
                                    ...this.state.eventtakerdetails.faculty,
                                    [splittedinput[2]] : e.target.value
                                }
                            }
                        })
                        return;
                    }

                    if(splittedinput[1] === "others"){
                        this.setState({
                            ...this.state,
                            eventtakerdetails : {
                                ...this.state.eventtakerdetails,
                                others : {
                                    ...this.state.eventtakerdetails.others,
                                    [splittedinput[2]] : e.target.value
                                }
                            }
                        })
                        return;
                    }
                }
            } 
          }

          // Handle all sponsors input change ===================
         if(e.target.name === "sponsor_details_name" || e.target.name === "sponsor_details_details")
         {
            if(splittedinput.length > 0 && splittedinput.length === 3 && splittedinput[1] === "details"){
               this.setState({
                        ...this.state,
                        sponsorsdetails : {
                            ...this.state.sponsorsdetails,
                            details : {
                                ...this.state.sponsorsdetails.details,
                                [splittedinput[2]] : e.target.value
                            }
                        }
                })
               return;
            } 
         }
    }

    // Handle file input change 

    handleFileChange = (e) => {
        this.setState({
            ...this.state,
            sponsorsdetails : {
                ...this.state.sponsorsdetails,
                details : { 
                    ...this.state.sponsorsdetails.details,
                   image :  e.target.files[0]
                }
            }
        });
     }

     // Hiding and showing modal.
     handleShowModal = () => {
         this.props.showAddGuestModal();
     }

     showAddEventtakerModal = () => {
         this.props.showAddEventtakerModal();
     }

    render(){
        return(
            <div>
                <Navbar />
                {
                     this.props.createdEvent.addGuestModalVisible && 
                     <AddGuestModal userid={this.props.currentUser.user.id} 
                        handleSelectedPerson={this.handleSelectedPerson} 
                        handleRemoveSelectedPerson = {this.handleRemoveSelectedPerson} 
                        guests={this.state.usersdata.guests} 
                        users={this.state.usersdata.users} 
                        eventtakers={this.state.usersdata.eventtakers}
                        selectedguests={this.state.guestdetails.selectedguests} 
                    />
                }
                {
                     this.props.createdEvent.addEventtakerModalVisible && 
                     <AddEventTakerModal userid={this.props.currentUser.user.id} 
                        handleSelectedPerson={this.handleSelectedPerson} 
                        handleRemoveSelectedPerson = {this.handleRemoveSelectedPerson} 
                        guests={this.state.usersdata.guests} 
                        users={this.state.usersdata.users} 
                        eventtakers={this.state.usersdata.eventtakers}
                        selectedeventtakers={this.state.eventtakerdetails.selectedeventtakers} 
                    />
                }
                <div className="our-login-page-content">
                    <div className="event-page-navigation">
                        <div className="society-page-navigation-session d-flex flex-row justify-content-center"> 
                            <div class="event-details-session">
                                <span>Event Details</span>
                            </div>
                            <div class="event-details-session current-event-details-filling">
                                <span>Guest and Sponsors</span>
                            </div>
                            <div class="event-details-session">
                                <span>Registration form</span>
                            </div>                        
                        </div>
                    </div>
                    <div id="login-container">
                        <div className="login-page-contant">
                            <div className="submit-forms">
                                <center><h1 className="new-h1">About Guest & Sponsors</h1></center>
                                <div className="Add-guest-session">
                                    <p>Add Guests</p>
                                    <div className="guest-img-div">
                                        <div onClick={this.handleShowModal}>
                                            <img src="/images/useradd2.png" alt="user-image" />
                                        </div>
                                    </div>
                                </div>
                                {
                                    this.state.guestdetails.selectedguests.length > 0 && 
                                    <div className="added-guest-details my-3"> 
                                    {
                                        this.state.guestdetails.selectedguests.map(member  => {
                                            if(member.email){
                                                return (
                                                    <div className="each-div-of-each-guest">
                                                        <div className="each-guest d-flex justify-content-start align-items-center">
                                                            <div className="guest-img-session">
                                                                <img src={ member.imgurl.dataurl ? member.imgurl.dataurl : "/images/profile_image.png" } />
                                                            </div>
                                                            <div className="guest-details d-flex flex-column">
                                                                <h5>{ member.username }</h5>
                                                                <p>{ member.email } </p>
                                                            </div>
                                                            <span onClick={() => {
                                                                    this.handleRemoveSelectedPerson({
                                                                        target : "guest",
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
                                                                    this.handleRemoveSelectedPerson({
                                                                        target : "guest",
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

                                <div className="about-sponsers-message d-flex justify-content-start align-items-center">
                                    <p className="alert-icon"><i className="fas fa-exclamation-circle"></i></p>
                                    <p className="alert-text">If the guest is not their on this portal then you can add their Details below.</p>
                                </div>

                                <p className="not-registered-guest-session">Guest that does not present on our portal?</p>
                                <div className="doeshavesponsor d-flex justify-content-start">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="guest_isguest" id="exampleRadios1" value="true" onChange={this.handleChange} checked={this.state.guestdetails.isguest === "true"} />
                                        <label className="form-check-label" htmlFor="exampleRadios1">
                                            Yes
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="guest_isguest" id="exampleRadios2" value="false" onChange={this.handleChange} checked={this.state.guestdetails.isguest === "false"} />
                                        <label className="form-check-label" htmlFor="exampleRadios2">
                                           No
                                        </label>
                                    </div>
                                </div>
                                {
                                    this.state.guestdetails.addedguests.length > 0 && 
                                    <div className="added-guest-details my-3"> 
                                    {
                                        this.state.guestdetails.addedguests.map(member  => {
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
                                                            <p style={{ "margin" : "0px" }}>
                                                                { member.role }
                                                            </p>
                                                        </div>
                                                        <span onClick={() => {
                                                            this.handleRemoveAddedGuests({
                                                                target : "guest",
                                                                roletype : "guest",
                                                                role : member.role,
                                                                key : member._id
                                                            })
                                                        }}>
                                                        <i class="far fa-times-circle"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                }
                                {
                                    this.state.guestdetails.isguest === "true" && (
                                        <form onSubmit={this.handleSubmitAddGuest}>
                                            <div class="guest-details-session row">
                                                <div className="col-md-5">
                                                    <h5>Guest Details</h5>
                                                    <p>Provide guest details here who does not exist on our portal.
                                                        also if you have multiple guests then add one by one.
                                                    </p>
                                                </div>
                                                <div className="col-md-7">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleFormControlSelect1" className="label">Guest Type</label>
                                                        <select className="form-control addguest-page-select" name="guest_role" onChange={this.handleChange} value={this.state.guestdetails.guesttype}>
                                                            <option value="outsideperson">Outside-person</option>
                                                            <option value="faculty">College Faculty</option>
                                                            <option value="others">Others (Normal Member/Council Member/Council Head)</option>
                                                        </select>
                                                    </div>
                                                    {
                                                        this.state.guestdetails.guesttype === "outsideperson" && 
                                                        (
                                                            <div>
                                                                <div className="form-group">
                                                                    <label htmlFor="username" className="label">Guest's Name</label>
                                                                    <input type="text" className="form-control" id="username" aria-describedby="emailHelp" placeholder="Guest's Name"
                                                                        name="guest_outsideperson_name" value={this.state.guestdetails.outsideperson.name} onChange={this.handleChange}/>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="guest-profession" className="label">Guest's Profession</label>
                                                                    <textarea className="form-control" id="guest-profession" rows="4" name="guest_outsideperson_profession" placeholder="Something about guest" value={this.state.guestdetails.outsideperson.profession}  onChange={this.handleChange}></textarea>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        this.state.guestdetails.guesttype === "faculty" && 
                                                        (
                                                            <div>
                                                                <div className="form-group">
                                                                    <label htmlFor="username" className="label">Name(Faculty Name)</label>
                                                                    <input type="text" className="form-control" id="username" aria-describedby="emailHelp" placeholder="Guest's Name"
                                                                        name="guest_faculty_name" value={this.state.guestdetails.faculty.name} onChange={this.handleChange}/>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="guest-profession" className="label">Description </label>
                                                                    <textarea className="form-control" id="guest-profession" rows="4" name="guest_faculty_profession" placeholder="Something about guest" 
                                                                    value={this.state.guestdetails.faculty.profession}  onChange={this.handleChange}></textarea>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                    this.state.guestdetails.guesttype === "others" && 
                                                        <div>
                                                            <div className="form-group">
                                                                <label htmlFor="username" className="label">Name</label>
                                                                <input type="text" className="form-control" id="username" aria-describedby="emailHelp" placeholder="Name of the Person"
                                                                    name="guest_others_name" value={this.state.guestdetails.others.name} onChange={this.handleChange}/>
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="exampleFormControlSelect1" className="label">Department</label>
                                                                <select className="form-control" id="exampleFormControlSelect1" name="guest_others_department" onChange={this.handleChange} value={this.state.guestdetails.others.department} placeholder="Select Branch">
                                                                    <option value="cmpn">CMPN</option>
                                                                    <option value="it">IT</option>
                                                                    <option value="extc">EXTC</option>
                                                                </select>
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="exampleFormControlSelect1" className="label">Current Year of Study</label>
                                                                <select className="form-control" id="exampleFormControlSelect1" name="guest_others_currentyear" onChange={this.handleChange} value={this.state.guestdetails.others.currentyear}>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                </select>
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="label" htmlFor="exampleFormControlSelect1">Class</label>
                                                                <select className="form-control" id="exampleFormControlSelect1" name="guest_others_class" onChange={this.handleChange} value={this.state.guestdetails.others.class}>
                                                                <option value="d12c">D12C</option>
                                                                <option value="d7c">D7C</option>
                                                                <option value="d2c">D2C</option>
                                                                <option value="d19c">D19C</option>
                                                                <option value="d15c">D15C</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                }
                                                    <button type="submit" className="btn btn-primary btn-md btn-block next-buttons">Add</button>
                                                </div>
                                            </div>
                                        </form>
                                    )
                                } 
                                <hr className="line-break-line" />
  
                                {/* Eventakers session ==================================== */}
                                <div className="Add-guest-session">
                                    <p>Add Event Taker</p>
                                    <div className="guest-img-div">
                                        <div onClick={this.showAddEventtakerModal}>
                                            <img src="/images/useradd2.png" alt="user-image" />
                                        </div>
                                    </div>
                                </div>
                                {
                                    this.state.eventtakerdetails.selectedeventtakers.length > 0 && 
                                    <div className="added-guest-details my-3"> 
                                    {
                                        this.state.eventtakerdetails.selectedeventtakers.map(member => {
                                            if(member.email){
                                                return (
                                                    <div className="each-div-of-each-guest">
                                                        <div className="each-guest d-flex justify-content-start align-items-center">
                                                            <div className="guest-img-session">
                                                                <img src={ member.imgurl.dataurl ? member.imgurl.dataurl : "/images/profile_image.png" } />
                                                            </div>
                                                            <div className="guest-details d-flex flex-column">
                                                                <h5>{ member.username }</h5>
                                                                <p>{ member.email } </p>
                                                            </div>
                                                            <span onClick={() => {
                                                                    this.handleRemoveSelectedPerson({
                                                                        target : "eventtaker",
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
                                                                    this.handleRemoveSelectedPerson({
                                                                        target : "eventtaker",
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
                                <div className="about-sponsers-message d-flex justify-content-start align-items-center">
                                    <p className="alert-icon"><i className="fas fa-exclamation-circle"></i></p>
                                    <p className="alert-text">If the Event-taker is not their on this portal then you can add their Details below.
                                    </p>
                                </div>
                                <p className="not-registered-guest-session">Event-taker is not their on our portal?</p>
                                <div className="doeshavesponsor d-flex justify-content-start">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="eventtaker_iseventtaker" id="exampleRadios1" value="true" onChange={this.handleChange} checked={this.state.eventtakerdetails.iseventtaker === "true"} />
                                        <label className="form-check-label" htmlFor="exampleRadios1">
                                            Yes
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="eventtaker_iseventtaker" id="exampleRadios2" value="false" onChange={this.handleChange} checked={this.state.eventtakerdetails.iseventtaker === "false"}/>
                                        <label className="form-check-label" htmlFor="exampleRadios2">
                                           No
                                        </label>
                                    </div>
                                </div>
                                {
                                    this.state.eventtakerdetails.addedeventtakers.length > 0 && 
                                    <div className="added-guest-details my-3"> 
                                    {
                                        this.state.eventtakerdetails.addedeventtakers.map(member  => {
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
                                                            <p style={{ "margin" : "0px" }}>{ member.role }</p>
                                                        </div>
                                                        <span onClick={() => {
                                                            this.handleRemoveAddedEventtakers({
                                                                target : "eventtaker",
                                                                roletype : "eventtaker",
                                                                role : member.role,
                                                                key : member._id
                                                            })
                                                        }}>
                                                        <i class="far fa-times-circle"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                }
                                {
                                    this.state.eventtakerdetails.iseventtaker === "true" && 
                                    <form onSubmit={this.handleSubmitAddEventtaker}>
                                        <div className="event-takers-details-session row">
                                            <div className="col-md-5">
                                                <h5>Add Event-taker</h5>
                                                <p>Provide Event-takers details. Here choose appropiate option eg: outside person , College faculty , College student. </p>
                                            </div>
                                            <div className="form-group col-md-7">
                                                <div className="form-group">
                                                    <label htmlFor="exampleFormControlSelect1" className="label">Event Taker Type</label>
                                                    <select className="form-control" id="exampleFormControlSelect1" name="eventtaker_role" onChange={this.handleChange} value={this.state.eventtakerdetails.eventtakertype}>
                                                        <option value="outsideperson">Outside-person</option>
                                                        <option value="faculty">College Faculty</option>
                                                        <option value="others">Others (Normal Member/Council Member/Council Head)</option>
                                                    </select>
                                                </div>
                                                
                                                {
                                                    this.state.eventtakerdetails.eventtakertype === "outsideperson" && 
                                                        <div>
                                                            <div className="form-group">
                                                                <label htmlFor="eventtakername" className="label">Name(Guest)</label>
                                                                <input type="text" className="form-control" id="eventtaker_outsideperson_name" aria-describedby="emailHelp" placeholder="Event Guest Name"
                                                                    name="eventtaker_outsideperson_name" value={this.state.eventtakerdetails.outsideperson.name} onChange={this.handleChange}/>
                                                            </div>
                                                            <div className="form-group our-add-sponsor-form">
                                                                <label htmlFor="exampleFormControlTextarea1" className="label">Profession</label>
                                                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="5"  name="eventtaker_outsideperson_profession" value={this.state.eventtakerdetails.outsideperson.profession} onChange={this.handleChange} placeholder="Something about the guest.."></textarea>
                                                            </div>

                                                    </div>
                                                }
                                                {
                                                    this.state.eventtakerdetails.eventtakertype === "faculty" && 
                                                        <div>
                                                            <div className="form-group">
                                                                <label htmlFor="username" className="label">Name(Faculty Name)</label>
                                                                <input type="text" required className="form-control" id="username" aria-describedby="emailHelp" placeholder="Name of the Faculty"
                                                                    name="eventtaker_faculty_name" value={this.state.eventtakerdetails.faculty.name} onChange={this.handleChange}/>
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="username" className="label">Description</label>
                                                                <textarea className="form-control" id="username" rows="5" name="eventtaker_faculty_profession" required value={this.state.eventtakerdetails.faculty.profession} onChange={this.handleChange} placeholder="Something about the faculty. like branch and subject expert."></textarea>
                                                            </div>

                                                    </div>
                                                }
                                                {
                                                    this.state.eventtakerdetails.eventtakertype === "others" && 
                                                        <div>
                                                            <div className="form-group">
                                                                <label htmlFor="username" className="label">Name</label>
                                                                <input type="text" className="form-control" id="username" aria-describedby="emailHelp" placeholder="Name of the Person"
                                                                    name="eventtaker_others_name" value={this.state.eventtakerdetails.others.name} required onChange={this.handleChange}/>
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="exampleFormControlSelect1" className="label">Department</label>
                                                                <select className="form-control" id="exampleFormControlSelect1" name="eventtaker_others_department" required onChange={this.handleChange} value={this.state.eventtakerdetails.others.department} placeholder="Select Branch">
                                                                    <option value="cmpn">CMPN</option>
                                                                    <option value="it">IT</option>
                                                                    <option value="extc">EXTC</option>
                                                                </select>
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="exampleFormControlSelect1" className="label">Current Year of Study</label>
                                                                <select className="form-control" id="exampleFormControlSelect1" name="eventtaker_others_currentyear" required onChange={this.handleChange} value={this.state.eventtakerdetails.others.currentyear}>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                </select>
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="label" htmlFor="exampleFormControlSelect1">Class</label>
                                                                <select className="form-control" id="exampleFormControlSelect1" name="eventtaker_others_class" required onChange={this.handleChange} value={this.state.eventtakerdetails.others.class}>
                                                                <option value="d12c">D12C</option>
                                                                <option value="d7c">D7C</option>
                                                                <option value="d2c">D2C</option>
                                                                <option value="d19c">D19C</option>
                                                                <option value="d15c">D15C</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                }
                                                <button type="submit" className="btn btn-primary btn-md btn-block next-buttons">Add</button>
                                            </div>
                                        </div>
                                    </form>
                                }
                               <hr className="line-break-line" />


                                {/* Sponsors session  ===========================*/}
                                <div className="Add-guest-session">
                                    <p>Add Sponsor</p>
                                </div>
                                <p className="not-registered-guest-session">Is this event is sponsored?</p>
                                <div className="doeshavesponsor d-flex justify-content-start">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="sponsor_issponsored" id="exampleRadios1" value="true" onChange={this.handleChange} checked={this.state.sponsorsdetails.issponsored === "true"} />
                                        <label className="form-check-label" htmlFor="exampleRadios1">
                                            Yes
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="sponsor_issponsored" id="exampleRadios2" value="false" onChange={this.handleChange} checked={this.state.sponsorsdetails.issponsored === "false"}/>
                                        <label className="form-check-label" htmlFor="exampleRadios2">
                                           No
                                        </label>
                                    </div>
                                </div>
                                {
                                    this.state.sponsorsdetails.addedsponsors.length > 0 && 
                                    <div className="added-guest-details my-3"> 
                                    {
                                        this.state.sponsorsdetails.addedsponsors.map(member  => {
                                            return (
                                                <div className="each-div-of-each-guest">
                                                    <div className="each-guest d-flex justify-content-start align-items-center">
                                                        <div className="guest-img-session">
                                                            <img src={ member.imgurl ? member.imgurl.dataurl : "/images/profile_image.png" } />
                                                        </div>
                                                        <div className="guest-details d-flex flex-column">
                                                            <h5>{ member.name } </h5>
                                                        </div>
                                                        <span onClick={() => {
                                                            this.handleRemoveSponsor({
                                                                target : "sponsor",
                                                                roletype : "sponsor",
                                                                role : "sponsor",
                                                                key : member._id
                                                            })
                                                        }}>
                                                        <i class="far fa-times-circle"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                }

                                {
                                    this.state.sponsorsdetails.issponsored === "true" && (
                                        <form onSubmit={this.handleSubmitAddSponsor}>
                                            <div className="sponsors-details-session row">
                                                <div className="col-md-5">
                                                    <h5>Add Sponsors Details</h5>
                                                    <p>Provide sponsors details if any. like github sponsored.</p>
                                                </div>
                                                <div className="col-md-7">
                                                    <div className="form-group">
                                                        <label htmlFor="sponsorname" className="label">Sponsor's Name</label>
                                                        <input type="text" className="form-control" id="sponsorname" aria-describedby="emailHelp" placeholder="Name of the Faculty"
                                                                name="sponsor_details_name" value={this.state.sponsorsdetails.details.name} onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="sponsors-image" className="label">Sponsor Image</label>
                                                        <input type="file" className="form-control" id="sponsors-image" aria-describedby="emailHelp" accept="image/*" name="image" onChange={this.handleFileChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="sponsors-description" className="label">Sponsors Details</label>
                                                        <textarea className="form-control" id="sponsors-description" rows="5" name="sponsor_details_details" value={this.state.sponsorsdetails.details.details}  onChange={this.handleChange} placeholder="Something about the sponsorship.."></textarea>
                                                    </div>
                                                    <button type="submit" className="btn btn-primary btn-md btn-block next-buttons">Add</button>
                                                </div>
                                            </div>
                                        </form>
                                    )
                                }
                               <hr className="line-break-line" />
                                <div className="d-flex justify-content-between" id="forgotpassword">
                                    <div>
                                        <a id="our-back-button" className="btn btn-md btn-light back-buttons" href="addevent/aboutevent">Back</a>
                                    </div>
                                    <div>
                                        <a type="button" className="btn btn-primary btn-md btn-block next-buttons">Next</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               </div>
        )
    }
}

function mapStateToProps(state){
    return {
        currentUser : state.currentUser,
        createdEvent : state.createdEvent
    }
} 

export default connect(mapStateToProps , {  
    setGuestAndSponsorsDetails , 
    showAddGuestModal , 
    fetchAllUsers , 
    showAddEventtakerModal,
    handleAddSelectedPerson , 
    handleRemoveSelectedPerson ,
    handleAddPerson , 
    handleRemovePerson,
    handleAddSponsor,
    handleRemoveSponsor
 })(GuestAndSponsorsForm);
