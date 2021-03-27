import React, { Component } from 'react';
import  { connect } from "react-redux"; 
import Navbar from "../navbar";
import { getFileData } from "../../stores/actions/events";
import { 
  createSpreadSheet, 
  dataSync, 
  loadSocietyData , 
  fetchSocietyMembersFullDetails,
  handleAddSocietyMemeber, 
  handleAddCouncilMemeber , 
  handleAddFacultyAndChairperson , 
  handleRemoveSocietyMember, 
  handleRemoveCouncilMember, 
  handleRemoveFacultyOrChairperson } from "../../stores/actions/society";

import "../../asserts/css/SocietyMembers.scss"; 
import { Link } from 'react-router-dom';
import { parse } from "query-string";




var SCOPE = 'https://www.googleapis.com/auth/spreadsheets';
var discoveryUrl = 'https://sheets.googleapis.com/$discovery/rest?version=v4';


class SocietySettingsManageMembers extends Component {
    constructor(props){
        super(props);
        this.state = {
            isNewAddSocietyMember : false,
            isNewAddCouncilMember : false,
            isNewAddFacultyOrChairperson : false,
            societyMembers : [],
            councilMembers : [],
            faculty : {
              name: "",
              email : ""
            },
            chairperson : {
              name: "",
              email : "" 
            },
            societyMemberData : {
              name : "",
              email : ""
            },
            councilMemberData : {
              name : "",
              email : "",
              specificRole :""
            },
            facultyAndChairpersonData : {
                name : "",
                email : "",
                personType :  "faculty"
            },
            authRelatedData : {
                name: '',
                email: '',
                accesstoken : "",
                googleAuth: '',
                sheeturl_of_society_members : "",
                sheeturl_of_council_members : "",
                sheeturl_of_faculty_and_chairperson : ""
            }
            
        }
    }



    componentDidUpdate = (prevProps, prevState) => {
        if(JSON.stringify(prevProps.society.data.normal_members) !== JSON.stringify(this.props.society.data.normal_members)){
            this.setState({
                ...this.state,
                societyMembers : this.props.society.data.normal_members
            });
        }

        if(JSON.stringify(prevProps.society.data.council_members) !== JSON.stringify(this.props.society.data.council_members)){
            this.setState({
                ...this.state,
                councilMembers : this.props.society.data.council_members
            });
        }
        
      
        if((JSON.stringify(prevProps.society.data.faculty) !== JSON.stringify(this.props.society.data.faculty) ) || 
        ( JSON.stringify(prevProps.society.data.chairperson) !== JSON.stringify(this.props.society.data.chairperson) ) ){            
            this.setState({
              ...this.state,
              faculty :{
                name : this.props.society.data.faculty ? this.props.society.data.faculty.name : "",
                email : this.props.society.data.faculty ? this.props.society.data.faculty.email : ""
              },
              chairperson : {
                 name : this.props.society.data.chairperson ? this.props.society.data.chairperson.name : "",
                email : this.props.society.data.chairperson ? this.props.society.data.chairperson.email : "" 
              }
            });
        }
    }

    componentDidMount = async () => {
      try{
        await this.props.loadSocietyData(this.props.match.params.societyname);
        await this.props.fetchSocietyMembersFullDetails(this.props.match.params.societyid);
        let sheeturl_of_society_members = "";
        let sheeturl_of_council_members = "";
        let sheeturl_of_faculty_and_chairperson = "";
        if(this.props.society.data.spreadsheets){
            sheeturl_of_society_members = "https://docs.google.com/spreadsheets/d/" + this.props.society.data.spreadsheets.sheetid + "/edit#gid=" + this.props.society.data.spreadsheets.normal_members.sheetid;
            sheeturl_of_council_members = "https://docs.google.com/spreadsheets/d/" + this.props.society.data.spreadsheets.sheetid + "/edit#gid=" + this.props.society.data.spreadsheets.council_member.sheetid;
            sheeturl_of_faculty_and_chairperson = "https://docs.google.com/spreadsheets/d/" + this.props.society.data.spreadsheets.sheetid + "/edit#gid=" + this.props.society.data.spreadsheets.facultyorchairperson.sheetid;
        }
  
        this.setState({
          ...this.state,
          societyMembers : this.props.society.data.normal_members,
          councilMembers : this.props.society.data.council_members,
          faculty :{
            name : this.props.society.data.faculty ? this.props.society.data.faculty.name : "",
            email : this.props.society.data.faculty ? this.props.society.data.faculty.email : ""
          },
          chairperson : {
             name : this.props.society.data.chairperson ? this.props.society.data.chairperson.name : "",
            email : this.props.society.data.chairperson ? this.props.society.data.chairperson.email : "" 
          },
          authRelatedData :  {
             ...this.state.authRelatedData,
             sheeturl_of_society_members,
             sheeturl_of_council_members,
             sheeturl_of_faculty_and_chairperson
          }
        });

        var script = document.createElement('script');
        script.onload=this.handleClientLoad;
        script.src="https://apis.google.com/js/api.js";
        document.body.appendChild(script);

      }catch(err){
        console.log(err);
      }
    }

    handleClientLoad = () => {
        window.gapi.load('client:auth2', this.initClient);
    }
 
    initClient = () => {
        try{
            window.gapi.client.init({
              'apiKey': "AIzaSyCP6sQLJxUYuZhFwMctY1bug0-CkgRBcTo",
              'clientId': "755925335295-qmcfaigpmp9ch2hno1g5qpb3n5ifm6jh.apps.googleusercontent.com",
              'scope': SCOPE,
              'discoveryDocs': [discoveryUrl]
            }).then(() => {
              this.setState({
                ...this.state,
                authRelatedData : {
                  ...this.state.authRelatedData,
                  googleAuth: window.gapi.auth2.getAuthInstance()
                }
              });

              this.state.authRelatedData.googleAuth.isSignedIn.listen(this.updateSigninStatus);
              if(!this.state.authRelatedData.googleAuth.isSignedIn.get()) {
                  console.log("Please login first");
                  document.getElementById('sign').addEventListener('click', this.signInFunction);
              }else{
                  var user = this.state.authRelatedData.googleAuth.currentUser.get();
                  var accesstoken = this.state.authRelatedData.googleAuth.currentUser.get().getAuthResponse().access_token;
                  let username = user.getBasicProfile().getName();
                  let email = user.getBasicProfile().getEmail();
                  let imgurl = user.getBasicProfile().getImageUrl();
                  this.setState({
                      ...this.state,
                      authRelatedData : {
                        ...this.state.authRelatedData,
                        name: username,
                        accesstoken : accesstoken,
                        email : email,
                        imgurl
                      }
                  });
              }
              // document.getElementById('sign').addEventListener('click', this.signInFunction);
              // document.getElementById('signout-btn').addEventListener('click', this.signOutFunction);
          });
        }catch(e){
          console.log(e);
        }
    }


    signInFunction = () => {
        this.state.authRelatedData.googleAuth.signIn();
        this.updateSigninStatus();
    }

    signOutFunction = () => {
        this.state.authRelatedData.googleAuth.signOut();
        this.updateSigninStatus();
    }

    updateSigninStatus = async () => {
        if(!this.state.authRelatedData.googleAuth.isSignedIn.get()) {
            console.log("Please login first");
            this.setState({
              ...this.state,
              authRelatedData : {}
            })
            return; 
        }
        var user = this.state.authRelatedData.googleAuth.currentUser.get();
        var accesstoken = this.state.authRelatedData.googleAuth.currentUser.get().getAuthResponse().access_token;
        let username = user.getBasicProfile().getName();
        let email = user.getBasicProfile().getEmail();
        let imgurl = user.getBasicProfile().getImageUrl();
        
        
        this.setState({
          ...this.state,
          authRelatedData : {
            ...this.state.authRelatedData,
            name: username,
            accesstoken : accesstoken,
            email : email,
            imgurl
          }
        });
    }

    
    handleCreateSpreadSheet = async () => {
        let spreadsheetdata;
        if(this.state.authRelatedData.accesstoken.length === 0){
            await this.signInFunction();
        }   
        let data = {
            useremail : this.state.authRelatedData.email,
            accesstoken : this.state.authRelatedData.accesstoken
        }
        await this.props.createSpreadSheet(this.props.society.data.name , this.props.society.data._id , data);
        this.setState({
          ...this.state,
          authRelatedData : {
            ...this.state.authRelatedData,
            sheeturl : spreadsheetdata.spreadsheetUrl
          }
        });
        
    }

    addNewSocietyMember = () => {
      this.setState({
         ...this.state,
         isNewAddSocietyMember : !this.state.isNewAddSocietyMember
      });
    }

    addNewCouncilMember = () => {
        this.setState({
            ...this.state,
            isNewAddCouncilMember : !this.state.isNewAddCouncilMember
        });
    }

    addNewFacultyOrChairperson = () => {
      this.setState({
        ...this.state,
        isNewAddFacultyOrChairperson : !this.state.isNewAddFacultyOrChairperson
       });
    }

    handleChange = (e) => {
        let fieldarr = e.target.name.split("_");
        if(fieldarr[0] === "societymember"){
            this.setState({
              ...this.state,
              societyMemberData : {
                ...this.state.societyMemberData,
                [fieldarr[1]] : e.target.value  
              }
            });
        }

        if(fieldarr[0] === "councilmember"){
            this.setState({
              ...this.state,
              councilMemberData : {
                ...this.state.councilMemberData,
                [fieldarr[1]] : e.target.value  
              }
            });
        }

        if(fieldarr[0] === "facultyAndChairpersonData"){
            this.setState({
                ...this.state,
                facultyAndChairpersonData : {
                  ...this.state.facultyAndChairpersonData,
                  [fieldarr[1]] : e.target.value
                }
            });
        }
    }


    handleAddMember = async (e , data) => {
       //  Handle submit
       e.preventDefault();
       let dataobj = {};
       if(data.from === "society_member"){
            dataobj.name = this.state.societyMemberData.name;
            dataobj.email = this.state.societyMemberData.email;
            if(this.state.authRelatedData.sheeturl_of_society_members.length > 0){
                dataobj.accesstoken = this.state.authRelatedData.accesstoken;
            }
            await this.props.handleAddSocietyMemeber(this.props.society.data.name , this.props.society.data._id , dataobj);
            this.setState({
              ...this.state,
              isNewAddSocietyMember : false,
              societyMemberData : {
                name : "",
                email : ""
              }
            });
       }

       if(data.from === "council_member"){
            dataobj.name = this.state.councilMemberData.name;
            dataobj.email = this.state.councilMemberData.email;
            dataobj.role = "council_member";
            dataobj.specificrole = this.state.councilMemberData.specificRole;
            if(this.state.authRelatedData.sheeturl_of_council_members.length > 0){
              dataobj.accesstoken = this.state.authRelatedData.accesstoken;
            } 
            await this.props.handleAddCouncilMemeber(this.props.society.data.name , this.props.society.data._id , dataobj);
            this.setState({
              ...this.state,
              isNewAddCouncilMember : false,
              councilMemberData : {
                name : "",
                email : "",
                specificRole : ""
              }
            });
       }

       if(data.from === "faculty_and_chairperson"){
          if(this.state.faculty.email.length === 0 || this.state.chairperson.email.length === 0 ){
              dataobj.name = this.state.facultyAndChairpersonData.name;
              dataobj.email = this.state.facultyAndChairpersonData.email;
              dataobj.role = this.state.facultyAndChairpersonData.personType;
              if(this.state.authRelatedData.sheeturl_of_faculty_and_chairperson.length > 0){
                dataobj.accesstoken = this.state.authRelatedData.accesstoken;
              }
              await this.props.handleAddFacultyAndChairperson(this.props.society.data.name , this.props.society.data._id , dataobj);
              this.setState({
                ...this.state,
                isNewAddFacultyOrChairperson : false,
                facultyAndChairpersonData : {
                  name : "",
                  email : "",
                  personType : "faculty"
                }
              });
          }else{
            console.log("Already one faculty and one chairperson exist.");
          }
       }
    }


    handleDataSync = async (dataobj) => {
        try{
          let data = {
            useremail : this.state.authRelatedData.email,
            accesstoken : this.state.authRelatedData.accesstoken,
            requestFrom : dataobj.from
          }
          let dataFromServer = await this.props.dataSync(this.props.society.data.name , this.props.society.data._id ,  data);
          

        }catch(err){
          console.log(err.message);
        }
    }

    handleRemoveMember = async (dataobj) => {
        // generate object fro request
        // find which type of person it is
        // send request to back on server
        let obj = {};
        if(dataobj.personType === "society_member"){
           obj.name = dataobj.name;
           obj.email = dataobj.email;
           obj.role = "normal_member";
           if(this.state.authRelatedData.sheeturl_of_society_members.length > 0){
              obj.accesstoken = this.state.authRelatedData.accesstoken;
           }
           console.log("dataobj ==> " , obj);
           await this.props.handleRemoveSocietyMember(this.props.society.data.name , this.props.society.data._id , obj);
        }

        if(dataobj.personType === "council_member"){
            obj.name = dataobj.name;
            obj.email = dataobj.email;
            obj.role = dataobj.role;
            obj.specificrole = dataobj.specificrole;
            if(this.state.authRelatedData.sheeturl_of_society_members.length > 0){
              obj.accesstoken = this.state.authRelatedData.accesstoken;
            }
            await this.props.handleRemoveCouncilMember(this.props.society.data.name , this.props.society.data._id , obj);
        }
 
        if(dataobj.personType === "faculty_and_chairperson"){
            obj.name = dataobj.name;
            obj.email = dataobj.email;
            obj.role = dataobj.role;
            if(this.state.authRelatedData.sheeturl_of_faculty_and_chairperson.length > 0){
              obj.accesstoken = this.state.authRelatedData.accesstoken;
            }
            await this.props.handleRemoveFacultyOrChairperson(this.props.society.data.name , this.props.society.data._id , obj);
        }

    } 

    
    render(){

      const { location : { search } } = this.props;
      let queryObj = parse(search);  
 
      return(
            <div className="society-setting-manage-members-page">
                <Navbar />
                <h1 className="manage-members-heading">Manage Members</h1>
                <p className="description-of-page">Here you can mange details of your council members and society members. 
                     you can edit details of someone. and also able to add new person if he/she is joined recently
                </p>
                {
                  ( this.state.authRelatedData.email && this.state.authRelatedData.imgurl && this.state.authRelatedData.accesstoken && this.state.authRelatedData.name ) &&
                    <div className="user-details-after-login">
                        <div className="Username-and-image-section d-flex justify-content-center align-items-center">
                            <div className="Userimage-section mr-2">
                              <img style={{ width :  "44px" , height : "44px", borderRadius : "22px", objectFit : "cover" }} src={this.state.authRelatedData.imgurl} />
                            </div>
                            <div className="username-and-email-section">
                              <p style={{ margin : "0px", fontSize : "18px", fontWeight : "600" }}>{this.state.authRelatedData.name}</p>
                              <p style={{ margin : "0px", fontSize : "15px" }}>{this.state.authRelatedData.email}</p>
                              <p><button className="btn btn-sm btn-danger" id="signout-btn" onClick={this.signOutFunction}>signout</button></p>
                            </div>
                        </div>
                    </div>
                }
                <div className="connect-to-spreadsheet-using-signin container d-flex justify-content-center align-items-center my-4">
                    <p>To Connect with SpreadSheet for better data import and export. Please sign in with account other than our college account.</p>
                    <button className="btn btn-sm btn-primary blue-button-sm-whites ml-5" onClick={this.handleCreateSpreadSheet}>
                          <i class="fas fa-file-excel"></i> Create SpreadSheet
                    </button> 
                    {/* <button className="btn btn-md btn-primary blue-button" id="sign" onClick={this.signInFunction}><i class="fab fa-google"></i> SignIn With Google </button> */}
                </div>
                
                <div className="society-page-navigation-session manage-members-nav-links">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <Link to={ `/society/${ Object.keys(this.props.society.data).length > 0 ? this.props.society.data.name : null }/edit/society/${ Object.keys(this.props.society.data).length > 0 ? this.props.society.data._id : null }/managemembers/?show=society-members` } 
                               className={ `nav-link ${(queryObj.show === "society-members" || Object.keys(queryObj).length === 0) ? "active" : null}` } id="pills-profile-tab" data-toggle="pill" role="tab"  aria-selected="false">Society Members</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={ `/society/${ Object.keys(this.props.society.data).length > 0 ? this.props.society.data.name : null }/edit/society/${ Object.keys(this.props.society.data).length > 0 ? this.props.society.data._id : null }/managemembers/?show=council-members` } 
                                className={ `nav-link ${(queryObj.show === "council-members") ? "active" : null}` } id="pills-profile-tab" data-toggle="pill" role="tab"  aria-selected="false">Council Members</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={ `/society/${ Object.keys(this.props.society.data).length > 0 ? this.props.society.data.name : null }/edit/society/${ Object.keys(this.props.society.data).length > 0 ? this.props.society.data._id : null }/managemembers/?show=faculty-and-chairperson` } 
                                className={ `nav-link ${(queryObj.show === "faculty-and-chairperson") ? "active" : null}` } id="pills-contact-tab" data-toggle="pill" role="tab" aria-selected="false">Faculty & Chairperson</Link>
                        </li>
                    </ul>
                </div>

                {/* Society Member  */}

                <div className="society-page-navigation-session">
                      {
                          ( queryObj.show === "society-members" || Object.keys(queryObj).length === 0 ) && 
                            <div className="Manage-members-society-members-section row">
                                <div className="col-md-4 members-page-intro-section">
                                    <h1 className="Sub-Heading">Society Members</h1>
                                    <p>Here you can manage all <strong>council members</strong> of your society. <br/>
                                      1) You can add members by clicking on <strong>add member button.</strong> <br/> 
                                      2) You can also provoide all members details from <strong>spreadsheet.</strong> <br />
                                      3) To use feature of SpreadSheet, first click on <strong>create spreadsheet</strong> button and after that put your all members details in the spreadsheet
                                          then click on <strong>sync</strong> to store data of spreadsheet in database and also to get all data on our portal.
                                    </p>
                                </div>
                                <div className="col-md-8">
                                    <div className="sheet-link-button-section d-flex justify-content-between">
                                        <div className="add-new-member-div">
                                              <button className="btn btn-sm btn-primary blue-button-sm" onClick={this.addNewSocietyMember}>
                                                <i class="fas fa-plus"></i> Add New Member
                                              </button>
                                        </div>
                                        <div className="sheet-link-and-syn-section">
                                          {
                                             ( this.state.authRelatedData.email && this.state.authRelatedData.sheeturl_of_society_members ) && (
                                                  <div className="sync-and-spreadsheet-url-div d-flex justify-content-start">
                                                    <button className="btn btn-sm btn-secondary mr-2 blue-button-sm-whites" onClick={() => {
                                                        this.handleDataSync({
                                                           from : "normal_member"
                                                        })
                                                    }}>Sync</button>
                                                    <button className="btn btn-sm btn-primary blue-button-sm-whites">
                                                        <a href={this.state.authRelatedData.sheeturl_of_society_members} target="_blank"><i class="fas fa-file-excel"></i> Spraedsheet Link</a>
                                                    </button>
                                                  </div>
                                             ) 
                                          }
                                        </div>
                                    </div>
                                    {
                                      this.state.isNewAddSocietyMember && 
                                          <div className="new-member-add-div">
                                            <form onSubmit={(e) => {
                                              this.handleAddMember(e , {
                                                 from : "society_member"
                                              })
                                            }}>
                                              <div className="row">
                                                  <div className="form-group col-3">
                                                    <input type="text" name="societymember_name" className="form-control insert-member-input-feild" 
                                                       id="membername" aria-describedby="emailHelp" placeholder="Member's Name" onChange={this.handleChange} value={this.state.societyMemberData.name}/>
                                                  </div>
                                                  <div className="form-group col-3">
                                                    <input type="email" name="societymember_email" className="form-control insert-member-input-feild" 
                                                      id="memberemail" placeholder="Member's Email" onChange={this.handleChange} value={this.state.societyMemberData.email} />
                                                  </div>
                                                  <div className="form-group col-3">
                                                        <input type="text" className="form-control insert-member-input-feild" 
                                                            id="memberrole" aria-describedby="emailHelp" placeholder="Member's Role" value="Society Member" disabled/>
                                                    </div>
                                                  <div className="form-group col-3 d-flex align-items-center justify-content-start">
                                                      <button type="submit" className="btn btn-sm btn-primary blue-button-sm-whites mr-1">Add</button>
                                                      <button className="btn btn-sm btn-danger" onClick={this.addNewSocietyMember}><i class="fas fa-times"></i></button>
                                                  </div>
                                              </div>
                                            </form>
                                        </div>
                                    }
                                    <div className="all-society-members">
                                      <div class="form-group search-div"> 
                                         <i class="fas fa-search"></i> 
                                         <input type="text" name="societymembersearch" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search User by Email or Name" />
                                      </div>
                                      <div className="row">
                                        {
                                           this.state.societyMembers.map(eachmember => (
                                              <div className="col-12">
                                                  <div className="each-member-div d-flex justify-content-between align-items-center">
                                                      <div className="name-and-img-section d-flex justify-content-start">
                                                         <div className="user-image">
                                                            <img src="/images/user-img1.jpg" />
                                                         </div>
                                                         <div className="d-flex align-items-center">
                                                            <div className="user-name-and-email-section">
                                                                <h3>{ eachmember.name }</h3>
                                                                <p>{ eachmember.email }</p>
                                                            </div>
                                                         </div>
                                                      </div>
                                                      <div className="role-section">
                                                         <p>Society Member</p>
                                                      </div>
                                                      <div className="edit-and-delete-section">
                                                         <button className="btn btn-sm btn-warning edit-button" onClick={this.handleSocietyMemberEdit}><i class="fas fa-pen"></i></button>
                                                         <button className="btn btn-sm btn-danger" onClick={() => {
                                                             this.handleRemoveMember({
                                                                name : eachmember.name,
                                                                email : eachmember.email,
                                                                role : "society_member",
                                                                personType : "society_member"
                                                             })
                                                          }}><i class="fas fa-times"></i></button>
                                                      </div>
                                                  </div>
                                              </div>
                                           ))
                                        }  
                                      </div>
                                  </div>
                                </div>
                            </div>
                      }
                      

                      {/* For Council-Members */}
                      {
                          queryObj.show === "council-members" &&
                          <div className="Manage-members-society-members-section row">
                                <div className="col-md-4 members-page-intro-section">
                                    <h1 className="Sub-Heading">Council Members</h1>
                                    <p>Here you can manage all <strong>council members</strong> of your society. <br/>
                                      1) You can add members by clicking on <strong>add member button.</strong> <br/> 
                                      2) You can also provoide all members details from <strong>spreadsheet.</strong> <br />
                                      3) To use feature of SpreadSheet, first click on <strong>create spreadsheet</strong> button and after that put your all members details in the spreadsheet
                                          then click on <strong>sync</strong> to store data of spreadsheet in database and also to get all data on our portal.
                                    </p>
                                </div>
                                <div className="col-md-8">
                                    <div className="sheet-link-button-section d-flex justify-content-between">
                                        <div className="add-new-member-div">
                                              <button className="btn btn-sm btn-primary blue-button-sm" onClick={this.addNewCouncilMember}>
                                                <i class="fas fa-plus"></i> Add New Member
                                              </button>
                                        </div>
                                        <div className="sheet-link-and-syn-section">
                                          {
                                            (this.state.authRelatedData.email && this.state.authRelatedData.sheeturl_of_society_members) && (
                                                  <div className="sync-and-spreadsheet-url-div d-flex justify-content-start">
                                                    <button className="btn btn-sm btn-secondary mr-2 blue-button-sm-whites" onClick={() => {
                                                        this.handleDataSync({
                                                           from : "council_member"
                                                        })
                                                    }}>Sync</button>
                                                    <button className="btn btn-sm btn-primary blue-button-sm-whites">
                                                        <a href={this.state.authRelatedData.sheeturl_of_council_members} target="_blank"><i class="fas fa-file-excel"></i> Spraedsheet Link</a>
                                                    </button>
                                                  </div>
                                            )
                                          }
                                        </div>
                                    </div>
                                    {
                                      this.state.isNewAddCouncilMember && 
                                          <div className="new-member-add-div">
                                            <form onSubmit={(e) => {
                                              this.handleAddMember(e , {
                                                 from : "council_member"
                                              })
                                            }}>
                                              <div className="d-flex flex-row">
                                                    <div className="form-group mr-3">
                                                        <input type="text" name="councilmember_name" className="form-control insert-member-input-feild" 
                                                          id="membername" aria-describedby="emailHelp" placeholder="Member's Name" onChange={this.handleChange} value={this.state.councilMemberData.name}/>
                                                    </div>
                                                    <div className="form-group mr-3">
                                                        <input type="email" name="councilmember_email" className="form-control insert-member-input-feild" 
                                                        id="memberemail" placeholder="Member's Email" onChange={this.handleChange} value={this.state.councilMemberData.email}/>
                                                    </div>
                                                    <div className="form-group mr-3">
                                                        <input type="text" className="form-control insert-member-input-feild" 
                                                            id="memberrole" aria-describedby="emailHelp" placeholder="Member's Role" value="Council Member" disabled/>
                                                    </div>
                                                    <div className="form-group mr-3">
                                                        <input type="text" name="councilmember_specificRole" className="form-control insert-member-input-feild" 
                                                          id="memberspecificrole" placeholder="Specific Role" onChange={this.handleChange} value={this.state.councilMemberData.specificRole} />
                                                    </div>
                                                  <div className="form-group d-flex align-items-center justify-content-start">
                                                      <button type="submit" className="btn btn-sm btn-primary blue-button-sm-whites mr-1">Add</button>
                                                      <button className="btn btn-sm btn-danger" onClick={this.addNewCouncilMember}><i class="fas fa-times"></i></button>
                                                  </div>
                                              </div>
                                            </form>
                                        </div>
                                    }
                                    <div className="all-society-members">
                                      <div class="form-group search-div"> 
                                        <i class="fas fa-search"></i> 
                                        <input type="text" name="societymembersearch" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search User by Email or Name" />
                                      </div>
                                      <div className="row">
                                        {
                                          this.state.councilMembers.map(eachmember => (
                                              <div className="col-12">
                                                  <div className="each-member-div d-flex justify-content-between align-items-center">
                                                      <div className="name-and-img-section d-flex justify-content-start">
                                                        <div className="user-image">
                                                            <img src="/images/user-img1.jpg" />
                                                        </div>
                                                        <div className="d-flex align-items-center">
                                                            <div className="user-name-and-email-section">
                                                                <h3>{ eachmember.name }</h3>
                                                                <p>{ eachmember.email }</p>
                                                            </div>
                                                        </div>
                                                      </div>
                                                      <div className="role-section">
                                                          <p>{eachmember.role}</p>
                                                      </div>
                                                      <div className="role-section">
                                                          <p>{eachmember.specificrole}</p>
                                                      </div>
                                                      
                                                      <div className="edit-and-delete-section">
                                                        <button className="btn btn-sm btn-warning edit-button" onClick={this.handleSocietyMemberEdit}><i class="fas fa-pen"></i></button>
                                                        <button className="btn btn-sm btn-danger" onClick={() => {
                                                            this.handleRemoveMember({
                                                              name : eachmember.name,
                                                              email : eachmember.email,
                                                              role : eachmember.role,
                                                              specificrole  : eachmember.specificrole,
                                                              personType : "council_member"
                                                          })
                                                        }}><i class="fas fa-times"></i></button>
                                                      </div>
                                                  </div>
                                              </div>
                                          ))
                                        }  
                                      </div>
                                  </div>
                                </div>
                            </div>
                      }

                      {/* For Faculty and Chairperson */}
                      {
                          queryObj.show === "faculty-and-chairperson" &&
                          <div className="Manage-members-society-members-section row">
                                <div className="col-md-4 members-page-intro-section">
                                    <h1 className="Sub-Heading">Faculty And Chairperson</h1>
                                    <p>Here you can manage all <strong>faculty and chairperson</strong> of your society. <br/>
                                      1) You can add members by clicking on <strong>add member button.</strong> <br/> 
                                      2) You can also provoide all members details from <strong>spreadsheet.</strong> <br />
                                      3) To use feature of SpreadSheet, first click on <strong>create spreadsheet</strong> button and after that put your all members details in the spreadsheet
                                          then click on <strong>sync</strong> to store data of spreadsheet in database and also to get all data on our portal.
                                    </p>
                                </div>
                                <div className="col-md-8">
                                    <div className="sheet-link-button-section d-flex justify-content-between">
                                        {
                                          ( this.state.faculty.email.length === 0 || this.state.chairperson.email.length === 0 ) &&
                                              <div className="add-new-member-div">
                                                  <button className="btn btn-sm btn-primary blue-button-sm" onClick={this.addNewFacultyOrChairperson}>
                                                    <i class="fas fa-plus"></i> Add New Member
                                                  </button>
                                              </div>
                                        }
                                        
                                          
                                        
                                        <div className="sheet-link-and-syn-section">
                                          {
                                           ( this.state.authRelatedData.email && this.state.authRelatedData.sheeturl_of_society_members ) && (
                                                  <div className="sync-and-spreadsheet-url-div d-flex justify-content-start">
                                                    <button className="btn btn-sm btn-secondary mr-2 blue-button-sm-whites" onClick={() => {
                                                        this.handleDataSync({
                                                           from : "faculty_and_chairperson"
                                                        })
                                                    }}>Sync</button>
                                                    <button className="btn btn-sm btn-primary blue-button-sm-whites">
                                                        <a href={this.state.authRelatedData.sheeturl_of_faculty_and_chairperson} target="_blank"><i class="fas fa-file-excel"></i> Spraedsheet Link</a>
                                                    </button>
                                                  </div>
                                           )
                                          }
                                        </div>
                                    </div>
                                    {
                                      this.state.isNewAddFacultyOrChairperson && 
                                        <div className="new-member-add-div">
                                            <form onSubmit={(e) => {
                                              this.handleAddMember(e , {
                                                 from : "faculty_and_chairperson"
                                              })
                                            }}>
                                              <div className="row">
                                                  <div className="form-group col-3">
                                                    <input type="text" name="facultyAndChairpersonData_name" className="form-control insert-member-input-feild" 
                                                       id="membername" aria-describedby="emailHelp" placeholder="Member's Name" onChange={this.handleChange} value={this.state.facultyAndChairpersonData.name} />
                                                  </div>
                                                  <div className="form-group col-3">
                                                    <input type="email" name="facultyAndChairpersonData_email" className="form-control insert-member-input-feild" 
                                                       id="memberemail" placeholder="Member's Email" onChange={this.handleChange} value={this.state.facultyAndChairpersonData.email} />
                                                  </div>
                                                  <div className="form-group col-3">
                                                      <select className="form-control insert-member-input-feild" id="exampleFormControlSelect1" name="facultyAndChairpersonData_personType" 
                                                          onChange={this.handleChange} value={this.state.facultyAndChairpersonData.personType}>
                                                          <option value="faculty">Faculty</option>
                                                          <option value="chairperson">Chairperson</option>
                                                      </select>
                                                  </div>
                                                  <div className="form-group d-flex align-items-center justify-content-start">
                                                       <button type="submit" className="btn btn-sm btn-primary blue-button-sm-whites mr-1">Add</button>
                                                       <button className="btn btn-sm btn-danger" onClick={this.addNewFacultyOrChairperson}><i class="fas fa-times"></i></button>
                                                  </div>
                                              </div>
                                            </form>
                                       </div>
                                    }
                                    <div className="all-society-members">
                                      <div class="form-group search-div"> 
                                        <i class="fas fa-search"></i> 
                                        <input type="text" name="societymembersearch" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search User by Email or Name" />
                                      </div>
                                      <div className="row">
                                        {
                                          this.state.faculty.email.length > 0 && 
                                              <div className="col-12">
                                                  <div className="each-member-div d-flex justify-content-between align-items-center">
                                                      <div className="name-and-img-section d-flex justify-content-start">
                                                        <div className="user-image">
                                                            <img src="/images/user-img1.jpg" />
                                                        </div>
                                                        <div className="d-flex align-items-center">
                                                            <div className="user-name-and-email-section">
                                                                <h3>{ this.state.faculty.name }</h3>
                                                                <p>{ this.state.faculty.email }</p>
                                                            </div>
                                                        </div>
                                                      </div>
                                                      <div className="role-section">
                                                          <p>Faculty</p>
                                                      </div>
                                                      <div className="edit-and-delete-section">
                                                        <button className="btn btn-sm btn-warning edit-button" onClick={this.handleSocietyMemberEdit}><i class="fas fa-pen"></i></button>
                                                        <button className="btn btn-sm btn-danger" onClick={()  => { 
                                                          this.handleRemoveMember({
                                                              name :  this.state.faculty.name,
                                                              email :  this.state.faculty.email,
                                                              role : "faculty",
                                                              personType : "faculty_and_chairperson"
                                                          })
                                                        }}><i class="fas fa-times"></i></button>
                                                      </div>
                                                  </div>
                                              </div>
                                          
                                        }  
                                        {
                                          this.state.chairperson.email.length > 0 &&  
                                              <div className="col-12">
                                                  <div className="each-member-div d-flex justify-content-between align-items-center">
                                                      <div className="name-and-img-section d-flex justify-content-start">
                                                        <div className="user-image">
                                                            <img src="/images/user-img1.jpg" />
                                                        </div>
                                                        <div className="d-flex align-items-center">
                                                            <div className="user-name-and-email-section">
                                                                <h3>{ this.state.chairperson.name }</h3>
                                                                <p>{ this.state.chairperson.email }</p>
                                                            </div>
                                                        </div>
                                                      </div>
                                                      <div className="role-section">
                                                          <p>Chairperson</p>
                                                      </div>
                                                      <div className="edit-and-delete-section">
                                                        <button className="btn btn-sm btn-warning edit-button" onClick={this.handleSocietyMemberEdit}><i class="fas fa-pen"></i></button>
                                                        <button className="btn btn-sm btn-danger" onClick={()  => { 
                                                          this.handleRemoveMember({
                                                              name :  this.state.chairperson.name,
                                                              email :  this.state.chairperson.email,
                                                              role : "chairperson",
                                                              personType : "faculty_and_chairperson"
                                                          })
                                                        }}><i class="fas fa-times"></i></button>
                                                      </div>
                                                  </div>
                                              </div>
                                        }  
                                      </div>
                                  </div>
                                </div>
                            </div>
                      }
                
                      {/* <button className="btn btn-md btn-primary" onClick={this.handleCreateSpreadSheet}>Create SpreadSheet</button>
        
                      {
                          this.state.authRelatedData.accesstoken &&
                            <div className="spreadsheet-data-section">
                              <p>{ this.state.name }</p>
                              <p>{ this.state.email }</p>
                              <a href={this.state.sheeturl} target="_blank">SpreadSheet Link</a>
                              <button className="btn btn-sm btn-primary" onClick={this.handleDataSync}>Sync Data from Sheet</button>                      
                            </div>
                      }
                      
                      <div className="society-page-settings-contents row">
                        <div className="society-page-settings-left-session col-md-5">
                              <h3> Manage Society Members </h3>
                              <p>Here you can update society details , background image of society, Society logo.
                                  Society title is the main title of your society
                              </p>
                          </div>
                          <div className="col-md-7">
                              {
                                  !this.state.accesstoken &&
                                  <button className="btn btn-sm btn-primary" id="sign">Sign In</button>
                              }    
                          </div>
                      </div> */}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentUser : state.currentUser,
    society : state.society
}); 


export default connect(mapStateToProps , { 
  getFileData , 
  createSpreadSheet, 
  dataSync, 
  loadSocietyData , 
  fetchSocietyMembersFullDetails , 
  handleAddSocietyMemeber , 
  handleAddCouncilMemeber , 
  handleAddFacultyAndChairperson, 
  handleRemoveSocietyMember, 
  handleRemoveCouncilMember, 
  handleRemoveFacultyOrChairperson 
})(SocietySettingsManageMembers);